import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ListCategoriesComponent } from "src/app/features/categories/pages/list-categories/list-categories.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ListCategoriesRoutingModule } from "./list-categories-routing.module";
import { CategoryService } from "@service/category.service";


@NgModule({
  declarations: [ListCategoriesComponent],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    ListCategoriesRoutingModule
  ],
  providers: [CategoryService]
})
export class ListCategoriesModule { }
