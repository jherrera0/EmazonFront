import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrandService } from '@service/brand.service';
import { CreateArticleComponent } from './create-article.component';
import { CategoryService } from '@service/category.service';
import { ArticleService } from '@service/article.service';


@NgModule({
  declarations: [CreateArticleComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [BrandService,CategoryService,ArticleService]
})
export class CreateArticleModule { }
