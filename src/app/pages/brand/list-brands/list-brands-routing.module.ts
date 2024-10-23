import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBrandsComponent } from 'src/app/features/brands/pages/list-brands/list-brands.component';

const routes: Routes = [
  {
    path: '',
    component: ListBrandsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListBrandsRoutingModule { }
