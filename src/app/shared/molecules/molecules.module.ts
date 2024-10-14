import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from '@atoms/atoms.module';
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    AtomsModule
  ],
  exports: [
    TableComponent
  ]
})
export class MoleculesModule { }
