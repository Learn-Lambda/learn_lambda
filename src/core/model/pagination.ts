export interface Pagination<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
