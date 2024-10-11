import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { NavigationPanelComponent } from './navigation-panel/navigation-panel.component';
import { HeaderPageComponent } from './header-page/header-page.component';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { MoleculesModule } from '../molecules/molecules.module';
import { AtomsModule } from '@atoms/atoms.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TableComponent,
    NavigationPanelComponent,
    HeaderPageComponent,
    FooterPageComponent
  ],
  imports: [
    CommonModule,
    MoleculesModule,
    AtomsModule
  ],
  exports: [
    TableComponent,
    NavigationPanelComponent,
    HeaderPageComponent,
    FooterPageComponent
  ]
})
export class OrganismsModule { }
