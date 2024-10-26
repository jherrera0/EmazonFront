import { BrandResponseCustom } from "./brand-response.model";
import { CategoryResponseCustom } from "./category-response";

export interface ArticleResponse{
  id:number;
  name: string;
  description: string;
  brand: BrandResponseCustom;
  categories: CategoryResponseCustom[];
  price: number;
  stock: number;
}
