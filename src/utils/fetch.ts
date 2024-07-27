import { useFetch } from "../hooks/useFetch";
import { DataTransfer } from "../types/ApiResponse";

export function usePostFetch<T, U>(
  data: T,
  url: string,
  options?: RequestInit
): DataTransfer<U> {
  options = options ?? {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  options.method = "POST";

  const post: DataTransfer<U> = useFetch<U>(url, options);
  return post;
}
