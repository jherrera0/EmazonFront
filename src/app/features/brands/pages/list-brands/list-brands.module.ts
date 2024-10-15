import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../core/service/category.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListBrandsComponent } from './list-brands.component';


@NgModule({
  declarations: [ListBrandsComponent],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule
  ],
  providers: [CategoryService]
})
export class ListBrandsModule { }
