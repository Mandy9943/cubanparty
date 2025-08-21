import useSWR from "swr";
import { fetcher } from "./fetcher";

export type EventDocument = {
  $id: string;
  $sequence: number;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
  title: string;
  description: string;
  date: string; // ISO datetime from DB
  venue: string;
  address: string;
  image: string;
  price: string;
  pricing?: string; // JSON string in DB
  buyTicketLink: string;
  status: boolean; // boolean in DB
  category: string;
  capacity?: number;
  attendees?: number;
  slug: string;
  imgPerEvent?: string[];
};

export type EventsApiResponse = {
  total: number;
  documents: EventDocument[];
};

export function useGetEvents() {
  const { data, error, isLoading, mutate } = useSWR<EventsApiResponse>(
    "/api/events",
    (url) => fetcher(url),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );
  return {
    events: data?.documents ?? [],
    isLoading,
    error,
    mutate,
  } as const;
}
