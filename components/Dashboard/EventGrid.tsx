"use client";

import { Calendar, MapPin, MoreHorizontal, Users } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: {
    name: string;
    avatar: string;
  };
  image: string;
  attendees: number;
  status: "upcoming" | "ongoing" | "completed";
  category: string;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Festival de Música Electrónica",
    date: "18 May 2024",
    time: "10:00 am",
    location: "San Francisco, CA",
    organizer: {
      name: "Declan Grieve",
      avatar: "/api/placeholder/32/32",
    },
    image: "/api/placeholder/300/200",
    attendees: 245,
    status: "upcoming",
    category: "Música",
  },
  {
    id: "2",
    title: "Conferencia de Innovación Tech",
    date: "23 Jun 2024",
    time: "9:00 am",
    location: "New York, NY",
    organizer: {
      name: "Callum Burston",
      avatar: "/api/placeholder/32/32",
    },
    image: "/api/placeholder/300/200",
    attendees: 180,
    status: "upcoming",
    category: "Tecnología",
  },
  {
    id: "3",
    title: "Expo de Salud y Bienestar",
    date: "14 Jul 2024",
    time: "1:30 pm",
    location: "Los Angeles, CA",
    organizer: {
      name: "Sophia Adams",
      avatar: "/api/placeholder/32/32",
    },
    image: "/api/placeholder/300/200",
    attendees: 320,
    status: "completed",
    category: "Salud",
  },
  {
    id: "4",
    title: "Cumbre de Marketing Digital",
    date: "03 Aug 2024",
    time: "11:00 am",
    location: "Miami, FL",
    organizer: {
      name: "Ethan Thompson",
      avatar: "/api/placeholder/32/32",
    },
    image: "/api/placeholder/300/200",
    attendees: 156,
    status: "ongoing",
    category: "Marketing",
  },
  {
    id: "5",
    title: "Festival de Arte Contemporáneo",
    date: "08 Sept 2024",
    time: "10:30 am",
    location: "Chicago, IL",
    organizer: {
      name: "Ava Wilson",
      avatar: "/api/placeholder/32/32",
    },
    image: "/api/placeholder/300/200",
    attendees: 89,
    status: "upcoming",
    category: "Arte",
  },
  {
    id: "6",
    title: "Conferencia de Desarrollo Web",
    date: "12 Oct 2024",
    time: "3:00 pm",
    location: "Seattle, WA",
    organizer: {
      name: "Olivia Roberts",
      avatar: "/api/placeholder/32/32",
    },
    image: "/api/placeholder/300/200",
    attendees: 267,
    status: "upcoming",
    category: "Tecnología",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-100 text-blue-800";
    case "ongoing":
      return "bg-green-100 text-green-800";
    case "completed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "upcoming":
      return "Próximo";
    case "ongoing":
      return "En curso";
    case "completed":
      return "Completado";
    default:
      return "Desconocido";
  }
};

export default function EventGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockEvents.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          {/* Event Image */}
          <div className="relative h-48 bg-gradient-to-br from-purple-600 to-blue-600">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 right-4">
              <button className="p-1 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors">
                <MoreHorizontal className="h-4 w-4 text-white" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                {event.title}
              </h3>
              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    event.status
                  )}`}
                >
                  {getStatusText(event.status)}
                </span>
                <span className="text-white text-sm font-medium">
                  {event.category}
                </span>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-4">
            {/* Organizer */}
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-medium text-gray-600">
                  {event.organizer.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {event.organizer.name}
                </p>
                <p className="text-xs text-gray-500">Organizador</p>
              </div>
            </div>

            {/* Event Info */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  {event.date}, {event.time}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span>{event.attendees} asistentes</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
                Ver Detalles
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
