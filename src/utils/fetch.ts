import { useFetch } from "../hooks/useFetch";
import { DataTransfer } from "../types/ApiResponse"

export function usePostFetch<T>(data: T, url: string, options?: RequestInit): DataTransfer<String> {
    
    options = options ?? {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    options.method = 'POST';

    const post: DataTransfer<String> = useFetch<String>(url, options)
    return post;
}