"use client";

import { deleteTestimonial } from "@/app/actions/testimonials.actions";
import { useGetTestimonials } from "@/swr/useTestimonials";
import { Edit } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { CommentCardProps } from "./types";

export default function CommentCard({ comment, onEdit }: CommentCardProps) {
  const { mutate } = useGetTestimonials();

  const onDelete = async () => {
    const ok = window.confirm(`¿Eliminar el testimonio de ${comment.name}?`);
    if (!ok) return;
    try {
      await deleteTestimonial(comment.id);
      toast.success("Testimonio eliminado");
      mutate();
    } catch (e) {
      console.error(e);
      toast.error("No se pudo eliminar");
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-6 text-center">
        <div className="flex justify-end mb-4 gap-2">
          <button
            onClick={onDelete}
            className="p-1 rounded-full hover:bg-red-50 transition-colors"
          >
            <span className="text-red-500 text-xs font-medium">Borrar</span>
          </button>
        </div>

        {/* Profile Image - Circular like in testimonial carousel */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--text-color1)] mx-auto mb-4">
          <Image
            src={comment.image}
            alt={comment.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Name */}
        <h3 className="text-[var(--text-color1)] font-semibold text-lg mb-4">
          {comment.name}
        </h3>

        {/* Testimonial Text */}
        <p className="text-[var(--text-color2)] text-xl font-bold leading-relaxed mb-6">
          {comment.text}
        </p>

        {/* Edit Button */}
        <button
          onClick={() => onEdit?.(comment)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center mx-auto"
        >
          <Edit className="w-4 h-4 mr-1" />
          Editar Testimonio
        </button>
      </div>
    </div>
  );
}
