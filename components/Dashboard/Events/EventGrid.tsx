"use client";

import { useEffect, useState } from "react";
import { events } from "./data";
import EventCard from "./EventCard";
import EventModal from "./EventModal";
import { DashboardEvent, EventGridProps } from "./types";

export default function EventGrid({
  triggerAddModal,
  onAddModalTriggered,
}: EventGridProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<DashboardEvent | null>(
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

  const openEditModal = (event: DashboardEvent) => {
    setSelectedEvent(event);
    setIsEditing(true);
    setModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedEvent(null);
    setIsEditing(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
    setIsEditing(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onEdit={openEditModal} />
        ))}
      </div>

      <EventModal
        isOpen={modalOpen}
        onClose={closeModal}
        event={selectedEvent}
        isEditing={isEditing}
      />
    </>
  );
}
