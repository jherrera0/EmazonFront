import { NgModule } from "@angular/core";
import { DashboardTemplateComponent } from "@templates/dashboard-template/dashboard-template.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";




@NgModule({
  declarations: [
    DashboardTemplateComponent,
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,

  ]
})
export class DashboardModule { }
