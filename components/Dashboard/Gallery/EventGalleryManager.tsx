"use client";
import { modifiedEvents } from "@/lib/events";
import React, { useState } from "react";

const EventGalleryManager = () => {
  const [selectedEventSlug, setSelectedEventSlug] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);

  const selectedEvent = modifiedEvents.find(
    (e) => e.slug === selectedEventSlug
  );

  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEventSlug(e.target.value);
    setImages([]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImages((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Gestión de Galería por Evento</h2>
      <label className="block mb-2 font-medium">Selecciona un evento:</label>
      <select
        className="mb-4 p-2 border rounded w-full"
        value={selectedEventSlug}
        onChange={handleEventChange}
      >
        <option value="">-- Selecciona --</option>
        {modifiedEvents.map((event) => (
          <option key={event.slug} value={event.slug}>
            {event.eventName}
          </option>
        ))}
      </select>

      {selectedEvent && (
        <div>
          <div className="mb-4">
            <h3 className="font-semibold">Imágenes actuales:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedEvent.imgPerEvent.map((img, idx) => (
                <img
                  key={img}
                  src={img}
                  alt={selectedEvent.eventName}
                  className="w-24 h-24 object-cover rounded border"
                />
              ))}
            </div>
          </div>

          <div
            className="border-2 border-dashed border-blue-400 rounded-lg p-6 text-center cursor-pointer mb-4"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <p className="mb-2">
              Arrastra aquí las imágenes o haz click para seleccionar
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Seleccionar Imágenes
            </label>
          </div>

          {images.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Imágenes a subir:</h4>
              <div className="flex flex-wrap gap-2">
                {images.map((file, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-24 h-24 object-cover rounded border"
                    />
                    <button
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 text-xs"
                      onClick={() => handleRemoveImage(idx)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
                Subir Imágenes
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventGalleryManager;
