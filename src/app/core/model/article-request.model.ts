export interface ArticleRequest {
  name: string;
  description: string;
  brandId: number;
  categoriesId: number[];
  price: number;
  stock: number;
}
