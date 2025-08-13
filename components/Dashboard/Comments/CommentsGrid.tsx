"use client";

import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import CommentModal from "./CommentModal";
import { testimonials } from "./data";
import { CommentsGridProps, Testimonial } from "./types";

export default function CommentsGrid({
  triggerAddModal,
  onAddModalTriggered,
}: CommentsGridProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Testimonial | null>(
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((comment) => (
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
      />
    </>
  );
}
