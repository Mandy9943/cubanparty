"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { PricingSectionProps } from "./types";

export default function PricingSection({
  pricing,
  onChange,
}: PricingSectionProps) {
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const updatePricing = (key: string, value: string) => {
    onChange({
      ...pricing,
      [key]: value,
    });
  };

  const removePricing = (key: string) => {
    const newPricing = { ...pricing };
    delete newPricing[key];
    onChange(newPricing);
  };

  const addCustomPricing = () => {
    const raw = newKey.trim();
    if (!raw) return;
    const key = raw; // keep user's label as-is
    if ((pricing as Record<string, string>)[key] !== undefined) return;
    updatePricing(key, newValue.trim());
    setNewKey("");
    setNewValue("");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Precios de Entrada
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="Nombre (ej. Preventa, 1er Lote, VIP 5 personas)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Valor (ej. $350 o $2500 (4 personas))"
            className="flex-[2] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addCustomPricing}
            className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Agregar
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {Object.entries(pricing).map(([key, value]) => (
          <div key={key} className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                {key}
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
        ))}

        {Object.keys(pricing).length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No hay precios configurados</p>
            <button
              type="button"
              onClick={addCustomPricing}
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
