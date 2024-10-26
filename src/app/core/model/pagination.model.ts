export interface Pagination<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  items: T;
}
