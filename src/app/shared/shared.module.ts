import { NgModule } from '@angular/core';
import { AtomsModule } from '@atoms/atoms.module';
import { MoleculesModule } from './molecules/molecules.module';
import { OrganismsModule } from '@organisms/organisms.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    AtomsModule,
    MoleculesModule,
    OrganismsModule
  ]

})
export class SharedModule { }
