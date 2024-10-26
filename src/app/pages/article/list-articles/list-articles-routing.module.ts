import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListArticlesComponent } from 'src/app/features/articles/pages/list-articles/list-articles.component';

const routes: Routes = [
  {
    path: '',
    component: ListArticlesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListArticlesRoutingModule { }
