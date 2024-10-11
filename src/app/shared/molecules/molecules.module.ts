import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRowComponent } from './table-row/table-row.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { AtomsModule } from '@atoms/atoms.module';



@NgModule({
  declarations: [
    TableRowComponent,
    TableHeaderComponent
  ],
  imports: [
    CommonModule,
    AtomsModule
  ],
  exports: [
    TableRowComponent,
    TableHeaderComponent
  ]
})
export class MoleculesModule { }
