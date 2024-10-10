import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DashboardTemplateComponent } from './shared/temp/dashboard-template/dashboard-template.component';
import { CreateCategoryComponent } from './features/categories/pages/create-category/create-category.component';
import { DashboardTemplateModule } from './shared/temp/dashboard-template/dashboard-template.module';
@NgModule({
  declarations: [
    AppComponent,
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
