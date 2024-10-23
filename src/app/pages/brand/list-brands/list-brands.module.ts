import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '@service/category.service';
import { ListBrandsComponent } from 'src/app/features/brands/pages/list-brands/list-brands.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListBrandsRoutingModule } from './list-brands-routing.module';


@NgModule({
  declarations: [ListBrandsComponent],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    ListBrandsRoutingModule
  ],
  providers: [CategoryService]
})
export class ListBrandsModule { }
