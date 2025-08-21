export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Activo";
    case "inactive":
      return "Inactivo";
    default:
      return status;
  }
};

export const getRoleColor = (role: string) => {
  switch (role) {
    case "Director":
      return "bg-purple-100 text-purple-800";
    case "DJ":
      return "bg-blue-100 text-blue-800";
    case "VJ":
      return "bg-indigo-100 text-indigo-800";
    case "Showman":
      return "bg-orange-100 text-orange-800";
    case "RRPP":
      return "bg-pink-100 text-pink-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

import { Facebook, Instagram, Youtube } from "lucide-react";
import { StaffMember } from "./types";

export function adaptStaffDocuments(documents: any[]): StaffMember[] {
  return documents.map((doc) => ({
    id: doc.$id,
    name: doc.name,
    role: doc.role,
    image: doc.image,
    status: doc.status ? "active" : "inactive",
    socials: doc.socials.map((url: string) => {
      const type = getSocialType(url);
      let icon;
      switch (type) {
        case "facebook":
          icon = Facebook;
          break;
        case "instagram":
          icon = Instagram;
          break;
        case "youtube":
          icon = Youtube;
          break;
        default:
          icon = undefined;
      }
      return { url, icon };
    }),
  }));
}

function getSocialType(
  url: string
): "facebook" | "instagram" | "youtube" | "other" {
  if (url.includes("facebook.com")) return "facebook";
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("youtube.com")) return "youtube";
  return "other";
}
