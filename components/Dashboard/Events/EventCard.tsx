"use client";

import {
  Calendar,
  Clock,
  Edit,
  ExternalLink,
  MapPin,
  MoreHorizontal,
  Users,
} from "lucide-react";
import Image from "next/image";
import { EventCardProps } from "./types";
import {
  formatDateShort,
  getCategoryColor,
  getStatusColor,
  getStatusText,
} from "./utils";

export default function EventCard({ event, onEdit }: EventCardProps) {
  const attendancePercentage = event.capacity
    ? Math.round(((event.attendees || 0) / event.capacity) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Header with Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="absolute top-4 right-4 z-10">
          <button className="p-1.5 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-colors">
            <MoreHorizontal className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Event Image */}
        <div className="relative w-full h-full">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-2 rounded-md text-center">
          <div className="text-lg font-bold">
            {new Date(event.date).getDate()}
          </div>
          <div className="text-xs uppercase font-semibold">
            {formatDateShort(event.date).split(" ")[1]}
          </div>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-12 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-semibold">
          {event.price}
        </div>

        {/* Status and Category */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              event.status
            )}`}
          >
            {getStatusText(event.status)}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
              event.category
            )}`}
          >
            {event.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{new Date(event.date).toLocaleDateString("es-ES")}</span>
            <Clock className="h-4 w-4 ml-4 mr-2 flex-shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
          {event.capacity && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>
                {event.attendees || 0} / {event.capacity} asistentes
              </span>
              <span className="ml-2 text-xs text-gray-500">
                ({attendancePercentage}%)
              </span>
            </div>
          )}
        </div>

        {/* Attendance Progress Bar */}
        {event.capacity && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(attendancePercentage, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(event)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
          >
            <Edit className="w-4 h-4 mr-1" />
            Editar
          </button>
          <a
            href={event.buyTicketLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 border border-gray-300 hover:border-gray-400 rounded-md transition-colors flex items-center justify-center"
          >
            <ExternalLink className="h-4 w-4 text-gray-600" />
          </a>
        </div>
      </div>
    </div>
  );
}
