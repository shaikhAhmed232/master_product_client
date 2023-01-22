import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ICategory {
  category_id: number,
  category_name: string
}

export interface ICategoriesResponse {
  categories: Array<ICategory>
  rowCount: number
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private _url = "http://localhost:5050/api/v1/categories"
  constructor(private http:HttpClient) { }

  getCategories ():Observable<ICategoriesResponse> {
    return this.http.get<ICategoriesResponse>(this._url)
  }

  createCategory (data: {category_name:string}) {
    return this.http.post(this._url, {...data})
  }

  updateCategory (data:{category_id:number, category_name:string}) {
    return this.http.put(this._url + "/" + data.category_id, data);
  }

  deleteCategories (id:number):Observable<any> {
    return this.http.delete(this._url + "/" + id)
  }

}
