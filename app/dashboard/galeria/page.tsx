"use client";
import EventGallerySelector from "@/components/Dashboard/Gallery/EventGallerySelector";

export default function GaleriaPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Galería</h1>
          <p className="text-gray-600 mt-1">
            Fotos y videos de eventos pasados
          </p>
        </div>
      </div>
      <EventGallerySelector />
    </div>
  );
}
