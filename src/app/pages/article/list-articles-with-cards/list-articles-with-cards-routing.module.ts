import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListArticlesWithCardsComponent } from 'src/app/features/articles/pages/list-articles-with-cards/list-articles-with-cards.component';

const routes: Routes = [
  {
    path: '',
    component: ListArticlesWithCardsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListArticlesWithCardsRoutingModule { }
