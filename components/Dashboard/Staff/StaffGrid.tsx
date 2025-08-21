"use client";

import { useEffect, useState } from "react";
import StaffCard from "./StaffCard";
import StaffModal from "./StaffModal";
import { StaffGridProps, StaffMember } from "./types";
import { adaptStaffDocuments } from "./utils";

export default function StaffGrid(props: StaffGridProps) {
  const { triggerAddModal, onAddModalTriggered, staffDocuments = [] } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

  // Handle external trigger for add modal
  useEffect(() => {
    if (triggerAddModal) {
      openAddModal();
      onAddModalTriggered?.();
    }
  }, [triggerAddModal, onAddModalTriggered]);

  const openEditModal = (member: StaffMember) => {
    setSelectedMember(member);
    setIsEditing(true);
    setModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedMember(null);
    setIsEditing(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMember(null);
    setIsEditing(false);
  };

  const team: StaffMember[] = adaptStaffDocuments(props.staffDocuments ?? []);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <StaffCard key={member.id} member={member} onEdit={openEditModal} />
        ))}
      </div>

      <StaffModal
        isOpen={modalOpen}
        onClose={closeModal}
        member={selectedMember}
        isEditing={isEditing}
      />
    </>
  );
}
