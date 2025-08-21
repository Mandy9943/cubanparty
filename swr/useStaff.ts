export interface StaffDocument {
  name: string;
  role: string;
  image: string;
  socials: string[];
  status: boolean;
  $id: string;
  $sequence: number;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}

export interface StaffApiResponse {
  total: number;
  documents: StaffDocument[];
}
import useSWR from "swr";
import { fetcher } from "./fetcher";

export const useGetStaff = () => {
  const { data, error, isLoading, mutate } = useSWR<StaffApiResponse>(
    "/api/staff",
    (url) => fetcher(url),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    staff: data,
    isLoading,
    error,
    mutate,
  };
};
