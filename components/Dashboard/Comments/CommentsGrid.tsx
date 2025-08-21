"use client";

import { useGetTestimonials } from "@/swr/useTestimonials";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import CommentModal from "./CommentModal";
import { CommentsGridProps, Testimonial } from "./types";
import { adaptTestimonials } from "./utils";

export default function CommentsGrid({
  triggerAddModal,
  onAddModalTriggered,
}: CommentsGridProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Testimonial | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const { testimonials, isLoading, error, mutate } = useGetTestimonials();

  // Handle external trigger for add modal
  useEffect(() => {
    if (triggerAddModal) {
      openAddModal();
      onAddModalTriggered?.();
    }
  }, [triggerAddModal, onAddModalTriggered]);

  const openEditModal = (comment: Testimonial) => {
    setSelectedComment(comment);
    setIsEditing(true);
    setModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedComment(null);
    setIsEditing(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedComment(null);
    setIsEditing(false);
  };

  return (
    <>
      {error && (
        <div className="text-red-600 mb-4">
          No se pudieron cargar los testimonios.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-100 animate-pulse rounded-lg"
              />
            ))
          : adaptTestimonials(testimonials).map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onEdit={openEditModal}
              />
            ))}
      </div>

      <CommentModal
        isOpen={modalOpen}
        onClose={closeModal}
        comment={selectedComment}
        isEditing={isEditing}
        // onSave triggers SWR mutate inside the modal after success via props or we can let modal call mutate via hook; keep grid clean
        // We'll let CommentModal import the hook to mutate itself
      />
    </>
  );
}
