import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriesComponent } from 'src/app/features/categories/pages/list-categories/list-categories.component';

const routes: Routes = [
  {
    path: '',
    component: ListCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCategoriesRoutingModule { }
