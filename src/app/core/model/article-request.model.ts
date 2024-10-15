export interface ArticleRequest {
  id: number;
  name: string;
  description: string;
  brandId: number;
  categoriesId: number[];
  price: number;
  stock: number;
}
