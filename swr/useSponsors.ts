import useSWR from "swr";
import { fetcher } from "./fetcher";

export type SponsorDocument = {
  $id: string;
  $sequence: number;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
  name: string; // required
  image: string; // required URL
  link?: string | null; // optional URL
};

export type SponsorsApiResponse = {
  total: number;
  documents: SponsorDocument[];
};

export function useGetSponsors() {
  const { data, error, isLoading, mutate } = useSWR<SponsorsApiResponse>(
    "/api/sponsors",
    (url) => fetcher(url),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );
  return {
    sponsors: data?.documents ?? [],
    isLoading,
    error,
    mutate,
  } as const;
}
