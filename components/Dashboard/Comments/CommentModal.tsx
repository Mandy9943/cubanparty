"use client";

import {
  createTestimonial,
  updateTestimonial,
} from "@/app/actions/testimonials.actions";
import { useGetTestimonials } from "@/swr/useTestimonials";
import { X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import ImageUploader from "./ImageUploader";
import { CommentModalProps } from "./types";

export default function CommentModal({
  isOpen,
  onClose,
  comment,
  isEditing,
}: CommentModalProps) {
  const { mutate } = useGetTestimonials();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ name: "", image: "", text: "" });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: comment?.name || "",
        image: comment?.image || "",
        text: comment?.text || "",
      });
    }
  }, [isOpen, comment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formData.name.trim(),
      image: formData.image,
      text: formData.text.trim(),
    };
    startTransition(async () => {
      try {
        if (isEditing && comment?.id) {
          await updateTestimonial(comment.id, payload);
          toast.success("Testimonio actualizado");
        } else {
          await createTestimonial(payload);
          toast.success("Testimonio creado");
        }
        onClose();
        mutate();
      } catch (err) {
        console.error("Error saving testimonial", err);
        toast.error("No se pudo guardar el testimonio");
      }
    });
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, image: imageUrl }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? "Editar Testimonio" : "Agregar Testimonio"}
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

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Usuario
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Carlos Rodríguez"
              required
            />
          </div>

          {/* Testimonial Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Testimonio
            </label>
            <textarea
              value={formData.text}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, text: e.target.value }))
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribe el testimonio del usuario..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Tip: Los emojis y expresiones cubanas hacen los testimonios más
              auténticos 🎉🔥🇨🇺
            </p>
          </div>

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
              disabled={isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isPending
                ? "Guardando..."
                : isEditing
                ? "Actualizar Testimonio"
                : "Crear Testimonio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
