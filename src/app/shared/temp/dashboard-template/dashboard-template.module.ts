import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { DashboardTemplateComponent } from './dashboard-template.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CreateCategoryModule } from 'src/app/features/categories/pages/create-category/create-category.module';
import { ListCategoriesModule } from 'src/app/features/categories/pages/list-categories/list-categories.module';


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
    ListCategoriesModule
  ]
})
export class DashboardTemplateModule { }
