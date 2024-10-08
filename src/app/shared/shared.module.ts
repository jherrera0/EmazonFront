import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerFooterPageComponent } from './atoms/divider-footer-page/divider-footer-page.component';
import { HambugerButtonComponent } from './atoms/hambuger-button/hambuger-button.component';
import { LogoComponent } from './atoms/logo/logo.component';
import { InputsComponent } from './atoms/inputs/inputs.component';
import { NavigationLinkComponent } from './atoms/navigation-link/navigation-link.component';
import { FooterPageComponent } from './organisms/footer-page/footer-page.component';
import { HeaderPageComponent } from './organisms/header-page/header-page.component';
import { InputErrorHandlerComponent } from './atoms/input-error-handler/input-error-handler.component';
import { ButtonComponent } from './atoms/button/button.component';
import { NavigationPanelComponent } from './organisms/navigation-panel/navigation-panel.component';


@NgModule({
  declarations: [DividerFooterPageComponent,
    HambugerButtonComponent,
    LogoComponent,
    InputsComponent,
    NavigationLinkComponent,
    FooterPageComponent,
    HeaderPageComponent,
    InputErrorHandlerComponent,
    ButtonComponent,
    NavigationPanelComponent],
  imports: [
    CommonModule
  ],
  exports: [DividerFooterPageComponent,
    HambugerButtonComponent,
    LogoComponent,
    InputsComponent,
    NavigationLinkComponent,
    FooterPageComponent,
    HeaderPageComponent,
    InputErrorHandlerComponent,
    ButtonComponent,
    NavigationPanelComponent
  ]

})
export class SharedModule { }
