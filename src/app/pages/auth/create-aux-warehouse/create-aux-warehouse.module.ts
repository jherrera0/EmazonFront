import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAuxWarehouseRoutingModule } from './create-aux-warehouse-routing.module';
import { CreateAuxWarehouseComponent } from 'src/app/features/auth/create-aux-warehouse/create-aux-warehouse.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateAuxWarehouseComponent],
  imports: [
    CommonModule,
    CreateAuxWarehouseRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CreateAuxWarehouseModule { }
