import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { TopComponent } from './components/top/top.component';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { PaginateComponent } from './components/paginate/paginate.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ProductsComponent,
    TopComponent,
    PaginateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    CategoriesService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
