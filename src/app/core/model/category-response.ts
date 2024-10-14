export interface CategoryResponse {
  id:number;
  name: string;
  description: string;
}

export interface PaginationCategory<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  items: T;
}
