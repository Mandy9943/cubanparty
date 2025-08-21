import type { DashboardEvent, EventPricing } from "./types";
export const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-100 text-blue-800";
    case "ongoing":
      return "bg-green-100 text-green-800";
    case "completed":
      return "bg-gray-100 text-gray-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "upcoming":
      return "Próximo";
    case "ongoing":
      return "En curso";
    case "completed":
      return "Completado";
    case "cancelled":
      return "Cancelado";
    default:
      return status;
  }
};

export const getCategoryColor = (category: string) => {
  switch (category) {
    case "Música Latina":
      return "bg-orange-100 text-orange-800";
    case "Concierto":
      return "bg-purple-100 text-purple-800";
    case "Fiesta Temática":
      return "bg-pink-100 text-pink-800";
    case "Festival":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateShort = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
  });
};

// Adapter to transform Appwrite documents into DashboardEvent objects
export function adaptEventDocuments(documents: any[]): DashboardEvent[] {
  return documents.map((doc) => {
    // date comes as ISO datetime; derive time string HH:mm
    const dateIso: string = doc.date || "";
    const d = dateIso ? new Date(dateIso) : null;
    const time = d
      ? d.toISOString().substring(11, 16) // HH:mm
      : "";

    // pricing is a JSON string in DB; parse to object for UI
    let pricing: Record<string, string> = {};
    if (typeof doc.pricing === "string" && doc.pricing.trim()) {
      try {
        pricing = JSON.parse(doc.pricing);
      } catch {
        pricing = {};
      }
    } else if (doc.pricing && typeof doc.pricing === "object") {
      pricing = doc.pricing as Record<string, string>;
    }

    // status boolean -> UI enum
    const status: DashboardEvent["status"] =
      doc.status === true
        ? "upcoming"
        : doc.status === false
        ? "cancelled"
        : "upcoming";

    return {
      id: doc.$id,
      title: doc.title,
      description: doc.description,
      date: dateIso,
      time,
      venue: doc.venue,
      address: doc.address,
      image: doc.image,
      price: doc.price,
      pricing: pricing as EventPricing,
      buyTicketLink: doc.buyTicketLink,
      status,
      category: doc.category,
      capacity: doc.capacity ?? 0,
      attendees: doc.attendees ?? 0,
      slug: doc.slug,
    };
  });
}
