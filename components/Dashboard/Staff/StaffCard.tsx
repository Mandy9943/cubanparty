"use client";

import {
  Edit,
  ExternalLink,
  Facebook,
  Instagram,
  MoreHorizontal,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import { StaffCardProps } from "./types";
import { getRoleColor, getStatusColor, getStatusText } from "./utils";

export default function StaffCard({ member, onEdit }: StaffCardProps) {
  const getSocialName = (icon: any) => {
    if (icon === Instagram) return "Instagram";
    if (icon === Facebook) return "Facebook";
    if (icon === Youtube) return "YouTube";
    return "Social";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Header with Photo */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="absolute top-4 right-4 z-10">
          <button className="p-1.5 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-colors">
            <MoreHorizontal className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Profile Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-4 left-4">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              member.status
            )}`}
          >
            {getStatusText(member.status)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name and Role */}
        <div className="text-center mb-4">
          <h3 className="font-semibold text-gray-900 text-lg mb-1">
            {member.name}
          </h3>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(
              member.role
            )}`}
          >
            {member.role}
          </span>
        </div>

        {/* Social Media Links */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Redes Sociales
          </h4>
          <div className="flex flex-wrap gap-2">
            {member.socials.map((social, idx) => {
              const IconComponent = social.icon;

              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-xs text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <IconComponent className="w-3 h-3 mr-1" />
                  {getSocialName(social.icon)}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(member)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
          >
            <Edit className="w-4 h-4 mr-1" />
            Editar
          </button>
          <button className="px-3 py-2 border border-gray-300 hover:border-gray-400 rounded-md transition-colors">
            <ExternalLink className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
