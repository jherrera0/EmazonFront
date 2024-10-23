import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListArticlesRoutingModule } from './list-articles-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ListArticlesComponent } from 'src/app/features/articles/pages/list-articles/list-articles.component';


@NgModule({
  declarations: [ListArticlesComponent],
  imports: [
    CommonModule,
    ListArticlesRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ListArticlesModule { }
