import EventGrid from "@/components/Dashboard/EventGrid";

export default function EventosPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Eventos</h1>
          <p className="text-gray-600 mt-1">Gestiona todos los eventos</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
          + Agregar Nuevo Evento
        </button>
      </div>
      <EventGrid />
    </div>
  );
}
