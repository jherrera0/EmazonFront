import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { DashboardTemplateComponent } from './dashboard-template.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CreateCategoryComponent } from 'src/app/features/categories/pages/create-category/create-category.component';


@NgModule({
  declarations: [
    DashboardTemplateComponent,
    CreateCategoryComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardTemplateModule { }
