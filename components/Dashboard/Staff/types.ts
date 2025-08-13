import { Facebook, Instagram, Youtube } from "lucide-react";

export interface Social {
  icon: typeof Instagram | typeof Facebook | typeof Youtube;
  url: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  image: string;
  socials: Social[];
  status: "active" | "inactive";
}

export interface StaffGridProps {
  triggerAddModal?: boolean;
  onAddModalTriggered?: () => void;
}

export interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  member?: StaffMember | null;
  isEditing: boolean;
}

export interface StaffCardProps {
  member: StaffMember;
  onEdit: (member: StaffMember) => void;
}

export interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}
