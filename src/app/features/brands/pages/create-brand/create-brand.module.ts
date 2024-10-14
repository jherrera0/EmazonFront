import { CreateBrandComponent } from './create-brand.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrandService } from '@service/brand.service';


@NgModule({
  declarations: [CreateBrandComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [BrandService]
})
export class CreateBrandModule { }
