export interface BrandResponse {
  id: number;
  name: string;
  description: string;
}

export interface PaginationBrand<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  items: T;
}
