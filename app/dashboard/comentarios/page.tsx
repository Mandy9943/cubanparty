import CommentsGrid from "@/components/Dashboard/CommentsGrid";

export default function ComentariosPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Comentarios</h1>
          <p className="text-gray-600 mt-1">
            Revisa y gestiona los comentarios de los eventos
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium">
            Filtros
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
            Moderar
          </button>
        </div>
      </div>
      <CommentsGrid />
    </div>
  );
}
