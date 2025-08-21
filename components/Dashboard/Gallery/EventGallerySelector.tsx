import { modifiedEvents } from "@/lib/events";
import React, { useState } from "react";

interface GalleryEvent {
  eventName: string;
  images: string[];
}

const initialEvents: GalleryEvent[] = modifiedEvents.map((e) => ({
  eventName: e.eventName,
  images: e.imgPerEvent,
}));

const EventGallerySelector = () => {
  const [events, setEvents] = useState<GalleryEvent[]>(initialEvents);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [newEventName, setNewEventName] = useState("");
  const [newImages, setNewImages] = useState<File[]>([]);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    setNewEventName("");
    setNewImages([]);
  };

  const handleCreateEvent = () => {
    if (!newEventName || newImages.length === 0) return;
    const newEvent: GalleryEvent = {
      eventName: newEventName,
      images: newImages.map((f) => URL.createObjectURL(f)),
    };
    setEvents((prev) => [...prev, newEvent]);
    setSelectedIdx(events.length);
    setNewEventName("");
    setNewImages([]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setNewImages((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setNewImages((prev) => [...prev, ...Array.from(files)]);
    }
  };

  // Agregar imágenes al evento seleccionado
  const handleAddImagesToEvent = (files: FileList | File[]) => {
    if (selectedIdx === null) return;
    const newImgs = Array.from(files).map((f) => URL.createObjectURL(f));
    setEvents((prev) =>
      prev.map((ev, idx) =>
        idx === selectedIdx
          ? {
              ...ev,
              images: [...ev.images, ...newImgs],
            }
          : ev
      )
    );
  };

  // Borrar imagen individual del evento seleccionado
  const handleRemoveImageFromEvent = (imgIdx: number) => {
    if (selectedIdx === null) return;
    setEvents((prev) =>
      prev.map((ev, idx) =>
        idx === selectedIdx
          ? {
              ...ev,
              images: ev.images.filter((_, i) => i !== imgIdx),
            }
          : ev
      )
    );
  };

  // Drag & drop y file input para agregar imágenes al evento seleccionado
  const handleEventDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleAddImagesToEvent(e.dataTransfer.files);
  };
  const handleEventFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleAddImagesToEvent(files);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Selecciona o crea un evento</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {events.map((ev, idx) => (
          <div
            key={idx}
            className={`border rounded-lg p-4 cursor-pointer ${
              selectedIdx === idx ? "border-blue-600" : "border-gray-300"
            }`}
            onClick={() => handleSelect(idx)}
          >
            <h3 className="font-semibold mb-2">{ev.eventName}</h3>
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

      <div className="mb-8">
        <h3 className="font-semibold mb-2">Crear nuevo evento</h3>
        <input
          type="text"
          placeholder="Nombre del evento"
          className="border p-2 rounded w-full mb-2"
          value={newEventName}
          onChange={(e) => setNewEventName(e.target.value)}
        />
        <div
          className="border-2 border-dashed border-blue-400 rounded-lg p-4 text-center cursor-pointer mb-2"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <p className="mb-2">
            Arrastra imágenes aquí o haz click para seleccionar
          </p>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            id="new-event-upload"
            onChange={handleFileChange}
          />
          <label
            htmlFor="new-event-upload"
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Seleccionar Imágenes
          </label>
        </div>
        {newImages.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {newImages.map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-16 h-16 object-cover rounded"
              />
            ))}
          </div>
        )}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleCreateEvent}
          disabled={!newEventName || newImages.length === 0}
        >
          Crear Evento
        </button>
      </div>

      {selectedIdx !== null && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">
            Evento seleccionado: {events[selectedIdx].eventName}
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
            onDrop={handleEventDrop}
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
              onChange={handleEventFileChange}
            />
            <label
              htmlFor="add-images-to-event"
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Agregar Imágenes
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGallerySelector;
