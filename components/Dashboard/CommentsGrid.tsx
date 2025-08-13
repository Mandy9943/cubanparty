"use client";

import {
  Flag,
  MessageCircle,
  MoreHorizontal,
  Star,
  ThumbsUp,
} from "lucide-react";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  eventName: string;
  eventDate: string;
  rating: number;
  comment: string;
  date: string;
  status: "approved" | "pending" | "flagged" | "rejected";
  likes: number;
  replies: number;
  category: "general" | "organization" | "venue" | "food" | "entertainment";
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "Isabel Moreno",
      avatar: "/api/placeholder/40/40",
      verified: true,
    },
    eventName: "Festival de Música Electrónica",
    eventDate: "18 May 2024",
    rating: 5,
    comment:
      "Increíble experiencia! La organización fue perfecta y el sonido espectacular. Definitivamente volveré el próximo año.",
    date: "2 días",
    status: "approved",
    likes: 24,
    replies: 3,
    category: "general",
  },
  {
    id: "2",
    author: {
      name: "Roberto Silva",
      avatar: "/api/placeholder/40/40",
      verified: false,
    },
    eventName: "Conferencia Tech Innovation",
    eventDate: "23 Jun 2024",
    rating: 4,
    comment:
      "Muy buenas ponencias, aunque el networking podría mejorar. Los speakers fueron de primer nivel.",
    date: "5 días",
    status: "pending",
    likes: 12,
    replies: 1,
    category: "organization",
  },
  {
    id: "3",
    author: {
      name: "Carmen López",
      avatar: "/api/placeholder/40/40",
      verified: true,
    },
    eventName: "Expo Salud y Bienestar",
    eventDate: "14 Jul 2024",
    rating: 3,
    comment:
      "El evento estuvo bien pero el lugar era muy pequeño para la cantidad de asistentes. Mucha aglomeración.",
    date: "1 semana",
    status: "flagged",
    likes: 8,
    replies: 5,
    category: "venue",
  },
  {
    id: "4",
    author: {
      name: "Miguel Herrera",
      avatar: "/api/placeholder/40/40",
      verified: false,
    },
    eventName: "Cumbre Marketing Digital",
    eventDate: "03 Aug 2024",
    rating: 5,
    comment:
      "Excelente evento! Aprendí muchísimo y las conexiones que hice fueron invaluables. La comida también estuvo genial.",
    date: "3 días",
    status: "approved",
    likes: 31,
    replies: 7,
    category: "food",
  },
  {
    id: "5",
    author: {
      name: "Lucía Ramírez",
      avatar: "/api/placeholder/40/40",
      verified: true,
    },
    eventName: "Festival Arte Contemporáneo",
    eventDate: "08 Sept 2024",
    rating: 4,
    comment:
      "Las instalaciones artísticas fueron impresionantes. Solo faltó más variedad en el entretenimiento nocturno.",
    date: "4 días",
    status: "approved",
    likes: 19,
    replies: 2,
    category: "entertainment",
  },
  {
    id: "6",
    author: {
      name: "Andrés Vega",
      avatar: "/api/placeholder/40/40",
      verified: false,
    },
    eventName: "Conferencia Desarrollo Web",
    eventDate: "12 Oct 2024",
    rating: 2,
    comment:
      "Muy decepcionante. Los talleres no cumplieron las expectativas y la organización fue caótica.",
    date: "6 días",
    status: "rejected",
    likes: 3,
    replies: 12,
    category: "organization",
  },
];

const getStatusColor = (status: string) => {
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

const getStatusText = (status: string) => {
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

const getCategoryColor = (category: string) => {
  switch (category) {
    case "general":
      return "bg-blue-100 text-blue-800";
    case "organization":
      return "bg-purple-100 text-purple-800";
    case "venue":
      return "bg-indigo-100 text-indigo-800";
    case "food":
      return "bg-orange-100 text-orange-800";
    case "entertainment":
      return "bg-pink-100 text-pink-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getCategoryText = (category: string) => {
  switch (category) {
    case "general":
      return "General";
    case "organization":
      return "Organización";
    case "venue":
      return "Lugar";
    case "food":
      return "Comida";
    case "entertainment":
      return "Entretenimiento";
    default:
      return category;
  }
};

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${
        i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
      }`}
    />
  ));
};

export default function CommentsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockComments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold text-sm">
                    {comment.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {comment.author.name}
                    </h3>
                    {comment.author.verified && (
                      <div className="ml-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">hace {comment.date}</p>
                </div>
              </div>
              <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            {/* Event Info */}
            <div className="text-xs text-gray-600 mb-2">
              <span className="font-medium">{comment.eventName}</span>
              <span className="mx-1">•</span>
              <span>{comment.eventDate}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-2">
              {renderStars(comment.rating)}
              <span className="ml-2 text-sm font-medium text-gray-700">
                {comment.rating}/5
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Status and Category */}
            <div className="flex items-center justify-between mb-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  comment.status
                )}`}
              >
                {getStatusText(comment.status)}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                  comment.category
                )}`}
              >
                {getCategoryText(comment.category)}
              </span>
            </div>

            {/* Comment Text */}
            <p className="text-sm text-gray-700 mb-4 line-clamp-3">
              {comment.comment}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-600">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{comment.likes}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>{comment.replies}</span>
                </div>
              </div>
              {comment.status === "flagged" && (
                <Flag className="h-4 w-4 text-red-500" />
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              {comment.status === "pending" && (
                <>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors">
                    Aprobar
                  </button>
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors">
                    Rechazar
                  </button>
                </>
              )}
              {comment.status === "approved" && (
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors">
                  Ver Completo
                </button>
              )}
              {comment.status === "flagged" && (
                <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors">
                  Revisar
                </button>
              )}
              {comment.status === "rejected" && (
                <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors">
                  Restaurar
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
