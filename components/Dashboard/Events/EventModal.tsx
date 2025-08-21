"use client";

import { createEvent, updateEvent } from "@/app/actions/events.actions";
import { useGetEvents } from "@/swr/useEvents";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ImageUploader from "./ImageUploader";
import PricingSection from "./PricingSection";
import { slugify } from "./data";
import { EventModalProps, EventPricing } from "./types";

export default function EventModal({
  isOpen,
  onClose,
  event,
  isEditing,
}: EventModalProps) {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date ? String(event.date).slice(0, 10) : "",
    time:
      event?.time || (event?.date ? String(event.date).substring(11, 16) : ""),
    venue: event?.venue || "",
    address: event?.address || "",
    image: event?.image || "",
    price: event?.price || "",
    pricing: (event?.pricing as EventPricing) || ({} as EventPricing),
    buyTicketLink: event?.buyTicketLink || "",
    status: event?.status || "upcoming",
    category: event?.category || "",
    capacity: event?.capacity || 0,
    attendees: event?.attendees || 0,
  });

  // Keep form synced when opening the modal in edit/add mode
  useEffect(() => {
    if (!isOpen) return;
    if (isEditing && event) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        date: event.date ? String(event.date).slice(0, 10) : "",
        time:
          event.time ||
          (event.date ? String(event.date).substring(11, 16) : ""),
        venue: event.venue || "",
        address: event.address || "",
        image: event.image || "",
        price: event.price || "",
        pricing: (event.pricing as EventPricing) || ({} as EventPricing),
        buyTicketLink: event.buyTicketLink || "",
        status: event.status || "upcoming",
        category: event.category || "",
        capacity: event.capacity || 0,
        attendees: event.attendees || 0,
      });
    } else if (!isEditing) {
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        address: "",
        image: "",
        price: "",
        pricing: {} as EventPricing,
        buyTicketLink: "",
        status: "upcoming",
        category: "",
        capacity: 0,
        attendees: 0,
      });
    }
  }, [isOpen, isEditing, event]);

  const { mutate } = useGetEvents();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        venue: formData.venue,
        address: formData.address,
        image: formData.image,
        price: formData.price,
        pricing: formData.pricing as Record<string, string>,
        buyTicketLink: formData.buyTicketLink,
        status: formData.status as any,
        category: formData.category,
        capacity: formData.capacity,
        attendees: formData.attendees,
        slug: slugify(formData.title),
      };

      if (isEditing && event?.id) {
        await updateEvent(event.id, payload);
        toast("Evento actualizado");
      } else {
        await createEvent(payload);
        toast("Evento creado");
      }
      await mutate();
      onClose();
    } catch (err: any) {
      toast.error("No se pudo guardar el evento");
      console.error("[EventModal] submit error", err?.message || err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, image: imageUrl }));
  };

  const handlePricingChange = (pricing: EventPricing) => {
    setFormData((prev) => ({ ...prev, pricing }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? "Editar Evento" : "Crear Nuevo Evento"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <ImageUploader value={formData.image} onChange={handleImageChange} />

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título del Evento
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Nostalgia a lo Cubano"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe el evento..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, date: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hora
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, time: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lugar
              </label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, venue: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: L Club"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Uruguay 1136, Montevideo, Centro"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar categoría</option>
                <option value="Música Latina">Música Latina</option>
                <option value="Concierto">Concierto</option>
                <option value="Fiesta Temática">Fiesta Temática</option>
                <option value="Festival">Festival</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as any,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="upcoming">Próximo</option>
                <option value="ongoing">En curso</option>
                <option value="completed">Completado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacidad
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    capacity: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: 500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asistentes Actuales
              </label>
              <input
                type="number"
                value={formData.attendees}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    attendees: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: 245"
                min="0"
                max={formData.capacity}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio Desde
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Desde $350"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link de Compra
              </label>
              <input
                type="url"
                value={formData.buyTicketLink}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    buyTicketLink: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
                required
              />
            </div>
          </div>

          {/* Pricing Section */}
          <PricingSection
            pricing={formData.pricing}
            onChange={handlePricingChange}
          />

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {submitting
                ? "Guardando..."
                : isEditing
                ? "Actualizar Evento"
                : "Crear Evento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
