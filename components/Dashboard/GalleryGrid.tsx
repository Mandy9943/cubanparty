"use client";

import { Calendar, Download, Eye, Heart, MoreHorizontal } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  eventName: string;
  date: string;
  type: "photo" | "video";
  image: string;
  views: number;
  likes: number;
  photographer?: string;
}

const mockGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Momento destacado del festival",
    eventName: "Festival de Música Electrónica",
    date: "18 May 2024",
    type: "photo",
    image: "/api/placeholder/300/200",
    views: 1250,
    likes: 89,
    photographer: "Carlos Mendez",
  },
  {
    id: "2",
    title: "Presentación principal",
    eventName: "Conferencia Tech Innovation",
    date: "23 Jun 2024",
    type: "video",
    image: "/api/placeholder/300/200",
    views: 2100,
    likes: 156,
    photographer: "Ana Rodriguez",
  },
  {
    id: "3",
    title: "Stands de exhibición",
    eventName: "Expo Salud y Bienestar",
    date: "14 Jul 2024",
    type: "photo",
    image: "/api/placeholder/300/200",
    views: 890,
    likes: 67,
    photographer: "Miguel Torres",
  },
  {
    id: "4",
    title: "Panel de expertos",
    eventName: "Cumbre Marketing Digital",
    date: "03 Aug 2024",
    type: "photo",
    image: "/api/placeholder/300/200",
    views: 1450,
    likes: 112,
    photographer: "Laura Jimenez",
  },
  {
    id: "5",
    title: "Instalación artística",
    eventName: "Festival Arte Contemporáneo",
    date: "08 Sept 2024",
    type: "photo",
    image: "/api/placeholder/300/200",
    views: 780,
    likes: 94,
    photographer: "David Silva",
  },
  {
    id: "6",
    title: "Workshop en vivo",
    eventName: "Conferencia Desarrollo Web",
    date: "12 Oct 2024",
    type: "video",
    image: "/api/placeholder/300/200",
    views: 1890,
    likes: 203,
    photographer: "Sofia Martinez",
  },
];

export default function GalleryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockGalleryItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
        >
          {/* Image/Video Thumbnail */}
          <div className="relative h-48 bg-gradient-to-br from-indigo-600 to-purple-600 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>

            {/* Type indicator */}
            <div className="absolute top-3 left-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.type === "video"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {item.type === "video" ? "Video" : "Foto"}
              </span>
            </div>

            {/* Actions */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors">
                <MoreHorizontal className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Play button for videos */}
            {item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
                </div>
              </div>
            )}

            {/* Overlay info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-white text-xs opacity-90">{item.eventName}</p>
            </div>
          </div>

          {/* Content Details */}
          <div className="p-4">
            {/* Date and photographer */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{item.date}</span>
              </div>
              {item.photographer && (
                <span className="text-xs text-gray-500">
                  por {item.photographer}
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{item.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Heart className="h-4 w-4 mr-1" />
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors">
                Ver
              </button>
              <button className="p-2 border border-gray-300 hover:border-gray-400 rounded-md transition-colors">
                <Download className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
