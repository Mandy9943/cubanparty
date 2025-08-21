export type EventPricing = Record<string, string>;

export interface DashboardEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO datetime from DB
  time: string; // HH:mm derived for UI
  venue: string;
  address: string;
  image: string;
  price: string;
  pricing?: EventPricing;
  buyTicketLink: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  category: string;
  capacity?: number;
  attendees?: number;
  slug: string;
}

export interface EventGridProps {
  triggerAddModal?: boolean;
  onAddModalTriggered?: () => void;
}

export interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: DashboardEvent | null;
  isEditing: boolean;
}

export interface EventCardProps {
  event: DashboardEvent;
  onEdit: (event: DashboardEvent) => void;
}

export interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export interface PricingSectionProps {
  pricing: EventPricing;
  onChange: (pricing: EventPricing) => void;
}
