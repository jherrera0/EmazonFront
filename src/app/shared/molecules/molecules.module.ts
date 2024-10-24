import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from '@atoms/atoms.module';
import { TableComponent } from './table/table.component';
import { CardContainerComponent } from './card-container/card-container.component';



@NgModule({
  declarations: [
    TableComponent,
    CardContainerComponent
  ],
  imports: [
    CommonModule,
    AtomsModule
  ],
  exports: [
    TableComponent,
    CardContainerComponent
  ]
})
export class MoleculesModule { }
