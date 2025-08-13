"use client";

import { Facebook, Instagram, Plus, Trash2, X, Youtube } from "lucide-react";
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { StaffModalProps } from "./types";

export default function StaffModal({
  isOpen,
  onClose,
  member,
  isEditing,
}: StaffModalProps) {
  const [formData, setFormData] = useState({
    name: member?.name || "",
    role: member?.role || "",
    image: member?.image || "",
    status: member?.status || "active",
    socials: member?.socials || [{ icon: Instagram, url: "" }],
  });

  const addSocialField = () => {
    setFormData((prev) => ({
      ...prev,
      socials: [...prev.socials, { icon: Instagram, url: "" }],
    }));
  };

  const removeSocialField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index),
    }));
  };

  const updateSocial = (index: number, field: "icon" | "url", value: any) => {
    setFormData((prev) => ({
      ...prev,
      socials: prev.socials.map((social, i) =>
        i === index ? { ...social, [field]: value } : social
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los datos
    console.log("Guardando:", formData);
    onClose();
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
            {isEditing ? "Editar Miembro" : "Agregar Miembro"}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Roger Zazo"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rol
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, role: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar rol</option>
                <option value="Director">Director</option>
                <option value="DJ">DJ</option>
                <option value="VJ">VJ</option>
                <option value="Showman">Showman</option>
                <option value="RRPP">RRPP</option>
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value as "active" | "inactive",
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>

          {/* Social Media */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Redes Sociales
              </label>
              <button
                type="button"
                onClick={addSocialField}
                className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />
                Agregar
              </button>
            </div>

            <div className="space-y-3">
              {formData.socials.map((social, index) => (
                <div key={index} className="flex gap-2">
                  <select
                    value={
                      social.icon === Instagram
                        ? "instagram"
                        : social.icon === Facebook
                        ? "facebook"
                        : "youtube"
                    }
                    onChange={(e) => {
                      const iconMap = {
                        instagram: Instagram,
                        facebook: Facebook,
                        youtube: Youtube,
                      };
                      updateSocial(
                        index,
                        "icon",
                        iconMap[e.target.value as keyof typeof iconMap]
                      );
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="youtube">YouTube</option>
                  </select>
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) => updateSocial(index, "url", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="URL de la red social"
                  />
                  {formData.socials.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSocialField(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
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
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {isEditing ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
