import { useState } from "react";
import { DataTransfer } from "../types/ApiResponse"


export function useFetch<T>(url: string, options?: RequestInit): DataTransfer<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const request = async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      let parsedData = await parseData(response);
      setData(parsedData);
      setError(null);
    } catch (err) {
      setError(err as Error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { request, data, loading, error } as DataTransfer<T>;
};


async function parseData(response: Response): Promise<any> {
  const contentType: string | null = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return response.json();
  }
  else if(contentType?.includes('text/html')) {
    return response;
  }
  else {
    throw new Error('Unsupported response type, unable to parse data')
  }
}