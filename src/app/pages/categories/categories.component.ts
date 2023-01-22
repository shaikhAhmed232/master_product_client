import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/categories';
import { CategoriesService,ICategory } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories:ICategory[] = []
  keys: string[] = []
  newCategory = new Categories('')
  editing:boolean = false
  selectedCategory: number = 0;
  constructor (private _categories:CategoriesService) {}

  ngOnInit(): void {
    this._categories.getCategories().subscribe(data => this.categories = data.categories)
  }

  deleteCategory (id:number) {
    this._categories.deleteCategories(id).subscribe(data => {
      if (data.status==='success') {
        this.categories = this.categories.filter((category:ICategory) => category.category_id !== id)
      } else {
        alert("Item not Deleted")
      }
    })
  }

  createCategory(category_name: string) {
    let data = {
       category_name
    }
    this._categories.createCategory(data).subscribe((data:any) => {
      this.categories.push(data)
      this.newCategory = new Categories('')
      alert('category added')
    })
  }

  updateCategory (category_name:string) {
    let category_id = this.selectedCategory
    this._categories.updateCategory({category_id, category_name}).subscribe(data => {
      this.categories = this.categories.map((category:ICategory) => {
        if (category.category_id === category_id) {
          return {
            category_id,
            category_name
          }
        } return category
      })
      alert('category Updated')
      this.editing = false
      this.newCategory = new Categories('')
    })
  }

  editClicked (category_name:string, category_id:number) {
    this.newCategory = new Categories(category_name)
    this.selectedCategory = category_id
    this.editing = true
  }

  filterCategoryId (category_name:string) {
    console.log(category_name)
    return this.categories.filter(category => category.category_name === category_name)[0].category_id;
  }

}
