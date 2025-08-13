"use client";

import {
  Building2,
  Globe,
  Mail,
  MoreHorizontal,
  Phone,
  Star,
} from "lucide-react";

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  industry: string;
  tier: "gold" | "silver" | "bronze" | "platinum";
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  eventsSponsored: number;
  totalContribution: number;
  status: "active" | "inactive" | "pending";
  joinDate: string;
}

const mockSponsors: Sponsor[] = [
  {
    id: "1",
    name: "TechCorp Solutions",
    logo: "/api/placeholder/80/80",
    industry: "Tecnología",
    tier: "platinum",
    contact: {
      email: "contact@techcorp.com",
      phone: "+1 (555) 123-4567",
      website: "www.techcorp.com",
    },
    eventsSponsored: 12,
    totalContribution: 50000,
    status: "active",
    joinDate: "Ene 2023",
  },
  {
    id: "2",
    name: "Global Marketing Inc",
    logo: "/api/placeholder/80/80",
    industry: "Marketing",
    tier: "gold",
    contact: {
      email: "info@globalmarketing.com",
      phone: "+1 (555) 987-6543",
      website: "www.globalmarketing.com",
    },
    eventsSponsored: 8,
    totalContribution: 35000,
    status: "active",
    joinDate: "Mar 2023",
  },
  {
    id: "3",
    name: "InnovateLab",
    logo: "/api/placeholder/80/80",
    industry: "Investigación",
    tier: "silver",
    contact: {
      email: "hello@innovatelab.com",
      phone: "+1 (555) 456-7890",
      website: "www.innovatelab.com",
    },
    eventsSponsored: 5,
    totalContribution: 20000,
    status: "active",
    joinDate: "Jun 2023",
  },
  {
    id: "4",
    name: "Creative Studios",
    logo: "/api/placeholder/80/80",
    industry: "Diseño",
    tier: "bronze",
    contact: {
      email: "contact@creativestudios.com",
      phone: "+1 (555) 321-0987",
      website: "www.creativestudios.com",
    },
    eventsSponsored: 3,
    totalContribution: 12000,
    status: "pending",
    joinDate: "Ago 2023",
  },
  {
    id: "5",
    name: "HealthTech Innovations",
    logo: "/api/placeholder/80/80",
    industry: "Salud",
    tier: "gold",
    contact: {
      email: "partnerships@healthtech.com",
      phone: "+1 (555) 654-3210",
      website: "www.healthtech.com",
    },
    eventsSponsored: 7,
    totalContribution: 28000,
    status: "active",
    joinDate: "Feb 2023",
  },
  {
    id: "6",
    name: "EcoGreen Solutions",
    logo: "/api/placeholder/80/80",
    industry: "Sostenibilidad",
    tier: "silver",
    contact: {
      email: "info@ecogreen.com",
      phone: "+1 (555) 789-0123",
      website: "www.ecogreen.com",
    },
    eventsSponsored: 4,
    totalContribution: 18000,
    status: "inactive",
    joinDate: "May 2023",
  },
];

const getTierColor = (tier: string) => {
  switch (tier) {
    case "platinum":
      return "bg-gray-100 text-gray-800 border-gray-300";
    case "gold":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "silver":
      return "bg-gray-100 text-gray-600 border-gray-300";
    case "bronze":
      return "bg-orange-100 text-orange-800 border-orange-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const getTierText = (tier: string) => {
  switch (tier) {
    case "platinum":
      return "Platino";
    case "gold":
      return "Oro";
    case "silver":
      return "Plata";
    case "bronze":
      return "Bronce";
    default:
      return tier;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Activo";
    case "inactive":
      return "Inactivo";
    case "pending":
      return "Pendiente";
    default:
      return status;
  }
};

export default function SponsorsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockSponsors.map((sponsor) => (
        <div
          key={sponsor.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                  <Building2 className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {sponsor.name}
                  </h3>
                  <p className="text-xs text-gray-500">{sponsor.industry}</p>
                </div>
              </div>
              <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Tier and Status */}
            <div className="flex items-center justify-between mb-4">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border ${getTierColor(
                  sponsor.tier
                )}`}
              >
                {getTierText(sponsor.tier)}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  sponsor.status
                )}`}
              >
                {getStatusText(sponsor.status)}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">
                  {sponsor.eventsSponsored}
                </p>
                <p className="text-xs text-gray-500">Eventos</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">
                  ${sponsor.totalContribution.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Contribución</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-xs text-gray-600">
                <Mail className="h-3 w-3 mr-2" />
                <span className="truncate">{sponsor.contact.email}</span>
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <Phone className="h-3 w-3 mr-2" />
                <span>{sponsor.contact.phone}</span>
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <Globe className="h-3 w-3 mr-2" />
                <span className="truncate">{sponsor.contact.website}</span>
              </div>
            </div>

            {/* Join Date */}
            <div className="text-xs text-gray-500 mb-4">
              Miembro desde {sponsor.joinDate}
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors">
                Ver Perfil
              </button>
              <button className="px-3 py-2 border border-gray-300 hover:border-gray-400 rounded-md transition-colors">
                <Star className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
