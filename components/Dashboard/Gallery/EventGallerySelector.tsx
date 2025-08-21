"use client";

import { updateEvent } from "@/app/actions/events.actions";
import { createSignedUploadUrl } from "@/app/actions/r2.actions";
import { useGetEvents } from "@/swr/useEvents";
import { useEffect, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

interface GalleryEvent {
  id: string;
  title: string;
  date: string; // ISO
  images: string[];
}

const EventGallerySelector = () => {
  const { events: rawEvents, isLoading, error, mutate } = useGetEvents();

  const pastEvents: GalleryEvent[] = useMemo(() => {
    const now = new Date();
    return (rawEvents || [])
      .filter((d) => new Date(d.date) < now)
      .map((d) => ({
        id: d.$id,
        title: d.title,
        date: d.date,
        images: d.imgPerEvent || [],
      }));
  }, [rawEvents]);

  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setEvents(pastEvents);
    if (pastEvents.length && selectedIdx === null) setSelectedIdx(0);
  }, [pastEvents.length]);

  const handleSelect = (idx: number) => setSelectedIdx(idx);

  const handleAddImagesToEvent = (files: FileList | File[]) => {
    if (selectedIdx === null) return;
    const filesArr = Array.from(files);
    if (!filesArr.length) return;
    const current = events[selectedIdx];
    startTransition(async () => {
      try {
        const uploadedUrls: string[] = [];
        for (const file of filesArr) {
          const rawExt = file.name.split(".").pop() || "";
          const ext = rawExt.replace(/[^a-zA-Z0-9]/g, "");
          const contentType = file.type || "application/octet-stream";
          const { url, publicUrl } = await createSignedUploadUrl({
            prefix: `events/${current.id}`,
            contentType,
            extension: ext,
          });
          const res = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": contentType },
            body: file,
          });
          if (!res.ok) throw new Error("R2 upload failed");
          uploadedUrls.push(publicUrl);
        }
        const newImgs = [...current.images, ...uploadedUrls];
        await updateEvent(current.id, { imgPerEvent: newImgs });
        setEvents((prev) =>
          prev.map((ev, i) =>
            i === selectedIdx ? { ...ev, images: newImgs } : ev
          )
        );
        toast.success("Imágenes agregadas");
        mutate();
      } catch (e) {
        console.error(e);
        toast.error("No se pudieron subir las imágenes");
      }
    });
  };

  const handleRemoveImageFromEvent = (imgIdx: number) => {
    if (selectedIdx === null) return;
    const current = events[selectedIdx];
    const next = current.images.filter((_, i) => i !== imgIdx);
    startTransition(async () => {
      try {
        await updateEvent(current.id, { imgPerEvent: next });
        setEvents((prev) =>
          prev.map((ev, i) =>
            i === selectedIdx ? { ...ev, images: next } : ev
          )
        );
        toast.success("Imagen eliminada");
        mutate();
      } catch (e) {
        console.error(e);
        toast.error("No se pudo eliminar la imagen");
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Selecciona un evento pasado</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {isLoading && (
          <div className="col-span-full text-sm text-gray-500">
            Cargando eventos…
          </div>
        )}
        {error && (
          <div className="col-span-full text-sm text-red-600">
            Error cargando eventos
          </div>
        )}
        {!isLoading &&
          !error &&
          events.map((ev, idx) => (
            <div
              key={ev.id}
              className={`border rounded-lg p-4 cursor-pointer ${
                selectedIdx === idx ? "border-blue-600" : "border-gray-300"
              }`}
              onClick={() => handleSelect(idx)}
            >
              <h3 className="font-semibold mb-2">{ev.title}</h3>
              <div className="flex flex-wrap gap-1">
                {ev.images.slice(0, 3).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="img"
                    className="w-12 h-12 object-cover rounded"
                  />
                ))}
                {ev.images.length > 3 && (
                  <span className="ml-2 text-xs">
                    +{ev.images.length - 3} más
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>

      {selectedIdx !== null && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">
            Evento seleccionado: {events[selectedIdx].title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {events[selectedIdx].images.map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={img}
                  alt="img"
                  className="w-24 h-24 object-cover rounded border"
                />
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 text-xs opacity-80 group-hover:opacity-100"
                  onClick={() => handleRemoveImageFromEvent(idx)}
                  title="Eliminar imagen"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div
            className="border-2 border-dashed border-blue-400 rounded-lg p-4 text-center cursor-pointer mb-2"
            onDrop={(e) => {
              e.preventDefault();
              handleAddImagesToEvent(e.dataTransfer.files);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <p className="mb-2">
              Arrastra imágenes aquí o haz click para agregar al evento
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id="add-images-to-event"
              onChange={(e) =>
                e.target.files && handleAddImagesToEvent(e.target.files)
              }
            />
            <label
              htmlFor="add-images-to-event"
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              {isPending ? "Subiendo..." : "Agregar Imágenes"}
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGallerySelector;
