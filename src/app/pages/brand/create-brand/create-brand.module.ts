import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CreateBrandComponent } from "src/app/features/brands/pages/create-brand/create-brand.component";
import { SharedModule } from "src/app/shared/shared.module";
import { CreateBrandRoutingModule } from "./create-brand-routing.module";
import { BrandService } from "@service/brand.service";


@NgModule({
  declarations: [CreateBrandComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CreateBrandRoutingModule,
  ],
  providers: [BrandService]
})
export class CreateBrandModule { }
