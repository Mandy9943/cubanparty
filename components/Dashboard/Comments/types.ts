export type Comment = {
  id: string;
  name: string;
  image: string;
  text: string;
  createdAt?: string | Date;
};

export type CommentCardProps = {
  comment: Comment;
  onEdit?: (comment: Comment) => void;
};

export type CommentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  comment?: Comment | null;
  isEditing?: boolean;
};

export type Testimonial = Comment;

export type CommentsGridProps = {
  triggerAddModal?: boolean;
  onAddModalTriggered?: () => void;
};

export type ImageUploaderProps = {
  value: string;
  onChange: (url: string) => void;
  className?: string;
};
