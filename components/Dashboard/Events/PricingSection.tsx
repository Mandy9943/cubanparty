"use client";

import { Plus, Trash2 } from "lucide-react";
import { EventPricing, PricingSectionProps } from "./types";

export default function PricingSection({
  pricing,
  onChange,
}: PricingSectionProps) {
  const updatePricing = (key: keyof EventPricing, value: string) => {
    onChange({
      ...pricing,
      [key]: value,
    });
  };

  const removePricing = (key: keyof EventPricing) => {
    const newPricing = { ...pricing };
    delete newPricing[key];
    onChange(newPricing);
  };

  const addCustomPricing = () => {
    // Por simplicidad, agregamos un campo general si no existe
    if (!pricing.general) {
      updatePricing("general", "");
    }
  };

  const pricingFields = [
    { key: "general" as keyof EventPricing, label: "General" },
    { key: "preventa" as keyof EventPricing, label: "Preventa" },
    { key: "lote1" as keyof EventPricing, label: "1er Lote" },
    { key: "lote2" as keyof EventPricing, label: "2do Lote" },
    { key: "mesa4vip" as keyof EventPricing, label: "Mesa 4 VIP" },
    { key: "mesa3vip" as keyof EventPricing, label: "Mesa 3 VIP" },
    { key: "vip5personas" as keyof EventPricing, label: "VIP 5 personas" },
    {
      key: "vippalco12personas" as keyof EventPricing,
      label: "VIP Palco 12 personas",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Precios de Entrada
        </label>
        <button
          type="button"
          onClick={addCustomPricing}
          className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Agregar Precio
        </button>
      </div>

      <div className="space-y-3">
        {pricingFields.map(({ key, label }) => {
          const value = pricing[key];
          if (value === undefined) return null;

          return (
            <div key={key} className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updatePricing(key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: $350 o $2500 (4 personas)"
                />
              </div>
              <button
                type="button"
                onClick={() => removePricing(key)}
                className="mt-6 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        })}

        {Object.keys(pricing).length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No hay precios configurados</p>
            <button
              type="button"
              onClick={() => updatePricing("general", "")}
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Agregar primer precio
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-3 rounded-md">
        <p className="text-xs text-gray-600">
          <strong>Tip:</strong> Puedes usar formatos como "$350", "$2500 (4
          personas)", "$1060 (Agotado)", etc.
        </p>
      </div>
    </div>
  );
}
