import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '@service/article.service';
import { BrandService } from '@service/brand.service';
import { CategoryService } from '@service/category.service';
import { CreateArticleComponent } from 'src/app/features/articles/pages/create-article/create-article.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateArticleRoutingModule } from './create-article-routing.module';



@NgModule({
  declarations: [CreateArticleComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CreateArticleRoutingModule
  ],
  providers: [BrandService,CategoryService,ArticleService]
})
export class CreateArticleModule { }
