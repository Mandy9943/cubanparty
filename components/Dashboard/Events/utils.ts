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
