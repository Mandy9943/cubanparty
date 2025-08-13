import useSWR from "swr";
import { fetcher } from "./fetcher";

const useSession = () => {
  const { data, error, isLoading } = useSWR(
    "/api/session",
    (url) => fetcher(url),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    user: data,
    isLoading,
    error,
  };
};

export default useSession;
