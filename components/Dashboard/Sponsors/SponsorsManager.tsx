"use client";

import { createSignedUploadUrl } from "@/app/actions/r2.actions";
import {
  createSponsor,
  deleteSponsor,
  updateSponsor,
} from "@/app/actions/sponsors.actions";
import { useGetSponsors } from "@/swr/useSponsors";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { adaptSponsorDocuments, Sponsor } from "./utils";

const SponsorsManager = () => {
  const { sponsors, isLoading, error, mutate } = useGetSponsors();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<{
    id?: string;
    name: string;
    link: string;
    image: string;
  }>({
    name: "",
    link: "",
    image: "",
  });
  const [showForm, setShowForm] = useState(false);

  const resetForm = () => setForm({ name: "", link: "", image: "" });

  const onEdit = (s: Sponsor) => {
    setForm({ id: s.id, name: s.name, link: s.link || "", image: s.image });
    setShowForm(true);
  };

  const onDelete = async (id: string) => {
    if (!confirm("¿Eliminar patrocinador?")) return;
    try {
      await deleteSponsor(id);
      toast.success("Patrocinador eliminado");
      mutate();
    } catch (e) {
      console.error(e);
      toast.error("No se pudo eliminar");
    }
  };

  const handleImageUpload = async (file: File) => {
    const rawExt = file.name.split(".").pop() || "";
    const ext = rawExt.replace(/[^a-zA-Z0-9]/g, "");
    const contentType = file.type || "application/octet-stream";
    const { url, publicUrl } = await createSignedUploadUrl({
      prefix: "sponsors",
      contentType,
      extension: ext,
    });
    const put = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body: file,
    });
    if (!put.ok) throw new Error("R2 PUT failed");
    setForm((p) => ({ ...p, image: publicUrl }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.image) return;
    startTransition(async () => {
      try {
        if (form.id) {
          await updateSponsor(form.id, {
            name: form.name,
            link: form.link || undefined,
            image: form.image,
          });
          toast.success("Patrocinador actualizado");
        } else {
          await createSponsor({
            name: form.name,
            link: form.link || undefined,
            image: form.image,
          });
          toast.success("Patrocinador creado");
        }
        setShowForm(false);
        resetForm();
        mutate();
      } catch (e) {
        console.error(e);
        toast.error("No se pudo guardar");
      }
    });
  };

  const adapted = adaptSponsorDocuments(sponsors);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestionar Patrocinadores</h2>

      {/* Grid */}
      {error && (
        <div className="text-red-600 mb-3">
          No se pudieron cargar los patrocinadores.
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center mb-8">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-40 bg-gray-100 animate-pulse rounded-lg"
              />
            ))
          : adapted.map((s) => (
              <div
                key={s.id}
                className="group relative bg-[#181c2a] rounded-lg border border-gray-700 hover:border-blue-400 transition-all duration-300 p-3 sm:p-8 w-full h-40 flex items-center justify-center hover:bg-[#23263a] shadow-md"
              >
                <a
                  href={s.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      className="object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:scale-110 transition-all duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </a>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    className="bg-white/80 hover:bg-white text-xs px-2 py-1 rounded"
                    onClick={() => onEdit(s)}
                    title="Editar"
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white rounded px-2 text-xs opacity-80 hover:opacity-100"
                    onClick={() => onDelete(s.id)}
                    title="Eliminar patrocinador"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="font-semibold mb-2">
            {form.id ? "Editar patrocinador" : "Agregar nuevo patrocinador"}
          </h3>
          <form onSubmit={onSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Nombre/alt del patrocinador"
              className="border p-2 rounded w-full"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
            <input
              type="url"
              placeholder="Link del patrocinador (opcional)"
              className="border p-2 rounded w-full"
              value={form.link}
              onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))}
            />
            <div className="border-2 border-dashed border-blue-400 rounded-lg p-4 text-center cursor-pointer">
              <p className="mb-2">Selecciona la imagen del patrocinador</p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="sponsor-image-upload"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) await handleImageUpload(file);
                }}
              />
              <label
                htmlFor="sponsor-image-upload"
                className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
              >
                {form.image ? "Cambiar Imagen" : "Subir Imagen"}
              </label>
            </div>
            {form.image && (
              <div className="flex flex-wrap gap-2">
                <img
                  src={form.image}
                  alt="preview"
                  className="w-16 h-16 object-cover rounded"
                />
              </div>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                className="border px-4 py-2 rounded"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={isPending || !form.name || !form.image}
              >
                {isPending
                  ? "Guardando..."
                  : form.id
                  ? "Actualizar"
                  : "Agregar"}
              </button>
            </div>
          </form>
        </div>
      )}

      {!showForm && (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowForm(true)}
        >
          + Agregar Patrocinador
        </button>
      )}
    </div>
  );
};

export default SponsorsManager;
