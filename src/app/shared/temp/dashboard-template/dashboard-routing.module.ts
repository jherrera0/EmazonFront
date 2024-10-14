import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardTemplateComponent } from './dashboard-template.component';
import { CreateCategoryComponent } from 'src/app/features/categories/pages/create-category/create-category.component';
import { ListCategoriesComponent } from 'src/app/features/categories/pages/list-categories/list-categories.component';

const routes: Routes = [{
  path: '',
  component: DashboardTemplateComponent,
  children: [
    {   path: 'create-category', component: CreateCategoryComponent },
    { path: 'list-categories', component: ListCategoriesComponent}
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
