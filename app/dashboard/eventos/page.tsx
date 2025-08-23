"use client";

import { EventGrid } from "@/components/Dashboard/Events";
import { useState } from "react";
export default function EventosPage() {
  const [triggerAddModal, setTriggerAddModal] = useState(false);

  const handleAddEvent = () => {
    setTriggerAddModal(true);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Eventos</h1>
          <p className="text-gray-600 mt-1">Gestiona todos los eventos</p>
        </div>
        <button
          onClick={handleAddEvent}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          + Agregar Nuevo Evento
        </button>
      </div>
      <EventGrid
        triggerAddModal={triggerAddModal}
        onAddModalTriggered={() => setTriggerAddModal(false)}
      />
    </div>
  );
}
