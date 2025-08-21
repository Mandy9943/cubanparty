"use client";

import { useGetEvents } from "@/swr/useEvents";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import EventModal from "./EventModal";
import { DashboardEvent, EventGridProps } from "./types";
import { adaptEventDocuments } from "./utils";

export default function EventGrid({
  triggerAddModal,
  onAddModalTriggered,
}: EventGridProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<DashboardEvent | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const { events, isLoading, error } = useGetEvents();

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

  const adaptedEvents: DashboardEvent[] = adaptEventDocuments(events || []);

  return (
    <>
      {isLoading ? (
        <div className="text-sm text-gray-500">Cargando eventos…</div>
      ) : error ? (
        <div className="text-sm text-red-600">Error cargando eventos</div>
      ) : adaptedEvents.length === 0 ? (
        <div className="text-sm text-gray-500">No hay eventos aún</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adaptedEvents.map((event) => (
            <EventCard key={event.id} event={event} onEdit={openEditModal} />
          ))}
        </div>
      )}

      <EventModal
        isOpen={modalOpen}
        onClose={closeModal}
        event={selectedEvent}
        isEditing={isEditing}
      />
    </>
  );
}
