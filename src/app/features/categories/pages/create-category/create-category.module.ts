import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryService } from '../../../../core/service/category.service';
import { CreateCategoryComponent } from './create-category.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateCategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [CategoryService]
})
export class CreateCategoryModule { }
