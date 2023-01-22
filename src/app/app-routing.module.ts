import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  {path: "", component: CategoriesComponent},
  {path: "categories", component: CategoriesComponent},
  {path: "products", component: ProductsComponent},
  {path: "**", component: CategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
