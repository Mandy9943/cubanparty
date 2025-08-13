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
