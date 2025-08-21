"use client";

import { CommentsGrid } from "@/components/Dashboard/Comments";
import { useState } from "react";

export default function ComentariosPage() {
  const [triggerAddModal, setTriggerAddModal] = useState(false);

  const handleAddComment = () => {
    setTriggerAddModal(true);
  };

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
          <button
            onClick={handleAddComment}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            + Agregar Comentario
          </button>
        </div>
      </div>
      <CommentsGrid
        triggerAddModal={triggerAddModal}
        onAddModalTriggered={() => setTriggerAddModal(false)}
      />
    </div>
  );
}
