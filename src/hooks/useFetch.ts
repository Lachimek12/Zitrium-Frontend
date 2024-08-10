/* Libraries */
import { useState } from "react";

/* Types imports */
import { DataTransfer } from "@customTypes/apiResponse";

async function parseData(response: Response): Promise<unknown> {
  const contentType: string | null = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  } else if (contentType?.includes("text/html")) {
    return response;
  } else {
    throw new Error(`Unsupported response type: "${contentType}", unable to parse data`);
  }
}

function useFetch<T>(url: string, options?: RequestInit): DataTransfer<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const request = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const parsedData = await parseData(response);
      setData(parsedData as T | null);
      setError(null);
    } catch (err) {
      setError(err as Error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { request, data, loading, error } as DataTransfer<T>;
}

function usePostFetch<T, U>(data: T, url: string, options?: RequestInit): DataTransfer<U> {
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

export { useFetch, usePostFetch };
