export interface IPagination<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
