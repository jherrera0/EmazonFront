import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { TableCellComponent } from './table-cell/table-cell.component';
import { NavigationLinkComponent } from './navigation-link/navigation-link.component';
import { LogoComponent } from './logo/logo.component';
import { InputsComponent } from './inputs/inputs.component';
import { InputErrorHandlerComponent } from './input-error-handler/input-error-handler.component';
import { HambugerButtonComponent } from './hambuger-button/hambuger-button.component';
import { DividerFooterPageComponent } from './divider-footer-page/divider-footer-page.component';
import { ButtonComponent } from './button/button.component';
import { DropDownListComponent } from './drop-down-list/drop-down-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ToastComponent,
    TableCellComponent,
    NavigationLinkComponent,
    LogoComponent,
    InputsComponent,
    InputErrorHandlerComponent,
    HambugerButtonComponent,
    DividerFooterPageComponent,
    ButtonComponent,
    DropDownListComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ToastComponent,
    TableCellComponent,
    NavigationLinkComponent,
    LogoComponent,
    InputsComponent,
    InputErrorHandlerComponent,
    HambugerButtonComponent,
    DividerFooterPageComponent,
    ButtonComponent,
    DropDownListComponent
  ]
})
export class AtomsModule { }
