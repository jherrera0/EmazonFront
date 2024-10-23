import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCategoryComponent } from 'src/app/features/categories/pages/create-category/create-category.component';
import { CategoryService } from '@service/category.service';
import { CreateCategoryRoutingModule } from './create-category-routing.module';


@NgModule({
  declarations: [CreateCategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CreateCategoryRoutingModule
  ],
  providers: [CategoryService]
})
export class CreateCategoryModule { }
