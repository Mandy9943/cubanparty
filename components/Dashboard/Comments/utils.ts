export const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "flagged":
      return "bg-red-100 text-red-800";
    case "rejected":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "approved":
      return "Aprobado";
    case "pending":
      return "Pendiente";
    case "flagged":
      return "Reportado";
    case "rejected":
      return "Rechazado";
    default:
      return status;
  }
};

// Adapter: Appwrite TestimonialDocument -> UI Comment
import type { TestimonialDocument } from "@/swr/useTestimonials";
import type { Comment } from "./types";

export function adaptTestimonial(doc: TestimonialDocument): Comment {
  return {
    id: doc.$id,
    name: doc.name,
    image: doc.image,
    text: doc.text,
    createdAt: doc.$createdAt,
  };
}

export function adaptTestimonials(docs: TestimonialDocument[]): Comment[] {
  return docs.map(adaptTestimonial);
}
