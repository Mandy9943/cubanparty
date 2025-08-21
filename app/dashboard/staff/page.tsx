"use client";

import { StaffGrid } from "@/components/Dashboard/Staff";
import { useGetStaff } from "@/swr/useStaff";
import { useState } from "react";

export default function StaffPage() {
  const [triggerAddModal, setTriggerAddModal] = useState(false);
  const { staff } = useGetStaff();

  const handleAddMember = () => {
    setTriggerAddModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff</h1>
          <p className="text-gray-600 mt-1">Gestiona el equipo de trabajo</p>
        </div>
        <button
          onClick={handleAddMember}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          + Agregar Miembro
        </button>
      </div>
      <StaffGrid
        triggerAddModal={triggerAddModal}
        onAddModalTriggered={() => setTriggerAddModal(false)}
        staffDocuments={staff?.documents}
      />
    </div>
  );
}
