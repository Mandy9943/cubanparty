"use client";
import SponsorsManager from "@/components/Dashboard/Sponsors/SponsorsManager";

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
      </div>
      <SponsorsManager />
    </div>
  );
}
