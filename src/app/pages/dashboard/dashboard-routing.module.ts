import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardTemplateComponent } from '@templates/dashboard-template/dashboard-template.component';


const routes: Routes = [

  {path: '', redirectTo: 'modules/list-articles', pathMatch: 'full'},
  {
  path: 'modules',
  component: DashboardTemplateComponent,
  children: [
        {   path: 'create-category',
          loadChildren: () => import('src/app/pages/category/create-category/create-category.module').then(m => m.CreateCategoryModule)
        },
        { path: 'list-categories',
          loadChildren: () => import('src/app/pages/category/list-categories/list-categories.module').then(m => m.ListCategoriesModule)
        },
        {path:'create-brand',
          loadChildren: () => import('src/app/pages/brand/create-brand/create-brand.module').then(m => m.CreateBrandModule)
        },
        {
          path: 'list-brands',
          loadChildren: () => import('src/app/pages/brand/list-brands/list-brands.module').then(m => m.ListBrandsModule)
        },
        {
          path: 'create-article',
          loadChildren: () => import('src/app/pages/article/create-article/create-article.module').then(m => m.CreateArticleModule)
        },
        {
          path: 'list-articles',
          loadChildren: () => import('src/app/pages/article/list-articles/list-articles.module').then(m => m.ListArticlesModule)
        },
        {
          path: 'list-articles-with-cards',
          loadChildren: () => import('src/app/pages/article/list-articles-with-cards/list-articles-with-cards.module').then(m => m.ListArticlesWithCardsModule)
        }
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
