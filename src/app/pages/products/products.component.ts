import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CategoriesService, ICategory } from 'src/app/services/categories.service';
import { ProductsService, IProduct } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  categories: ICategory[] = [];
  page: number = 1
  totalPage : Array<number> = [];
  currentPage: number = this.totalPage[0]
  newProduct = new Product('', '')
  editing:boolean = false
  selectedProductId:number = 1; 

  constructor (private _products: ProductsService, private _category: CategoriesService) {}

  ngOnInit(): void {
    this._products.getProduct().subscribe((data) => {
      this.products = data.products
      let pageCount = Math.round(data.total_products / data.rowCount)
      let tem = []
      let i = 1;
      while (i <= pageCount) {
        tem.push(i)
        i++
      }
      this.totalPage = tem
  })
    this._category.getCategories().subscribe(data => this.categories = data.categories)
  }
  getData ($event:any) {
    this._products.getProduct($event).subscribe(data => {
      this.products = data.products
    })
  }

  deleteProduct (id:number): void {
    this._products.deleteProduct(id).subscribe((data:any) => 
      {
      if (data.status === 'success') {
        this.products = this.products.filter((product:IProduct) => product.product_id !== id)
      } else {
        console.log(data)
        alert('Product not deleted')
      }
    })
  }

  createProduct(product_name:string, category_name:string) {
    let category_id = this.filterCategoryId(category_name)

    let data = {
      product_name: product_name,
      category: category_id
    }
    this._products.createProduct(data).subscribe((data:any) => {
      this.products.push(data)
      this.newProduct = new Product('', '')
      alert('product added')
    })
  }

  updateProduct (product_name:string, category_name:string) {
    let product_id = this.selectedProductId
    let category_id = this.filterCategoryId(category_name)
    this._products.updateProduct({product_id, product_name, category:category_id}).subscribe(data => {
      this.products = this.products.map((product:IProduct) => {
        if (product.product_id === product_id) {
          return {
            product_id,
            product_name,
            category_id,
            category_name
          }
        } return product
      })
      alert('Product Updated')
      this.editing = false
      this.newProduct = new Product('', '')
    })
  }

  clikedEdit (product_id:number, product_name:string, category_name:string, category_id:number) {
    this.newProduct = new Product(product_name, category_name)
    this.selectedProductId = product_id
    this.editing = true
  }

  filterCategoryId (category_name:string) {
    return this.categories.filter(category => category.category_name === category_name)[0].category_id;
  }
}
