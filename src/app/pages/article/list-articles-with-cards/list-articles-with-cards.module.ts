import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListArticlesWithCardsRoutingModule } from './list-articles-with-cards-routing.module';
import { ListArticlesWithCardsComponent } from 'src/app/features/articles/pages/list-articles-with-cards/list-articles-with-cards.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ListArticlesWithCardsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ListArticlesWithCardsRoutingModule
  ]
})
export class ListArticlesWithCardsModule { }
