import SponsorsGrid from "@/components/Dashboard/SponsorsGrid";

export default function PatrocinadoresPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patrocinadores</h1>
          <p className="text-gray-600 mt-1">
            Gestiona las empresas patrocinadoras
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
          + Agregar Patrocinador
        </button>
      </div>
      <SponsorsGrid />
    </div>
  );
}
