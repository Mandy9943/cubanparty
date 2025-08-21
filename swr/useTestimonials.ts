import useSWR from "swr";
import { fetcher } from "./fetcher";

export type TestimonialDocument = {
  $id: string;
  $sequence: number;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
  name: string;
  image: string; // URL
  text: string;
};

export type TestimonialsApiResponse = {
  total: number;
  documents: TestimonialDocument[];
};

export function useGetTestimonials() {
  const { data, error, isLoading, mutate } = useSWR<TestimonialsApiResponse>(
    "/api/testimonials",
    (url) => fetcher(url),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );
  return {
    testimonials: data?.documents ?? [],
    isLoading,
    error,
    mutate,
  } as const;
}
