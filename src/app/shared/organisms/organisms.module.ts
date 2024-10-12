import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationPanelComponent } from './navigation-panel/navigation-panel.component';
import { HeaderPageComponent } from './header-page/header-page.component';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { MoleculesModule } from '../molecules/molecules.module';
import { AtomsModule } from '@atoms/atoms.module';


@NgModule({
  declarations: [
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
    NavigationPanelComponent,
    HeaderPageComponent,
    FooterPageComponent
  ]
})
export class OrganismsModule { }
