import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBrandComponent } from 'src/app/features/brands/pages/create-brand/create-brand.component';

const routes: Routes = [
  {
    path: '',
    component: CreateBrandComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateBrandRoutingModule { }
