import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../core/service/category.service';
import { FormsModule } from '@angular/forms';
import { ListCategoriesComponent } from './list-categories.component';
import { OrganismsModule } from '@organisms/organisms.module';
import { MoleculesModule } from 'src/app/shared/molecules/molecules.module';
import { AtomsModule } from '@atoms/atoms.module';


@NgModule({
  declarations: [ListCategoriesComponent],
  imports: [
    FormsModule,
    MoleculesModule,
    AtomsModule,
    OrganismsModule,
    CommonModule
  ],
  providers: [CategoryService]
})
export class ListCategoriesModule { }
