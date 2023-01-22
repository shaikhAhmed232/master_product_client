import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

export interface IProduct {
  product_id: number
  product_name: string
  category_name: string
  category_id: number
}

export interface IProductsResponse {
  page: number
  products: IProduct[]
  rowCount: number
  total_products: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _url =  `http://localhost:5050/api/v1/products`
  constructor(private http:HttpClient) { }
  getProduct (page=1) : Observable<IProductsResponse> {
    const res = this.http.get<IProductsResponse>(this._url + `?page=${page}`);
    return res;
  }

  createProduct (data: {product_name:string, category:number}) {
    return this.http.post(this._url, {...data})
  }

  updateProduct(data:{product_id:number, product_name:string, category:number}) {
    return this.http.put(this._url + "/" + data.product_id, data);
  }

  deleteProduct (id:number) {
    return this.http.delete(this._url + `/${id}`)
  }
}
