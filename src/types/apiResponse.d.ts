export interface DataTransfer<T> {
  request: () => Promise<void>;
  data: T | null;
  loading: boolean;
  error: Error | null;
}
