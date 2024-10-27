import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAuxWarehouseComponent } from 'src/app/features/auth/create-aux-warehouse/create-aux-warehouse.component';

const routes: Routes = [
  {
    path: '',
    component: CreateAuxWarehouseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAuxWarehouseRoutingModule { }
