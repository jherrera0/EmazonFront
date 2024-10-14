import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../core/service/category.service';
import { FormsModule } from '@angular/forms';
import { ListCategoriesComponent } from './list-categories.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ListCategoriesComponent],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule
  ],
  providers: [CategoryService]
})
export class ListCategoriesModule { }
