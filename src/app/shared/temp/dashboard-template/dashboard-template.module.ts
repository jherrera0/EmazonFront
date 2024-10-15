import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { DashboardTemplateComponent } from './dashboard-template.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CreateCategoryModule } from 'src/app/features/categories/pages/create-category/create-category.module';
import { ListCategoriesModule } from 'src/app/features/categories/pages/list-categories/list-categories.module';
import { CreateBrandModule } from 'src/app/features/brands/pages/create-brand/create-brand.module';
import { ListBrandsModule } from 'src/app/features/brands/pages/list-brands/list-brands.module';


@NgModule({
  declarations: [
    DashboardTemplateComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateCategoryModule,
    ListCategoriesModule,
    CreateBrandModule,
    ListBrandsModule
  ]
})
export class DashboardTemplateModule { }
