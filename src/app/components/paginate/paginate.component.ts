import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent {
  @Input() totalPage:Array<number> = []
  @Input() currentPage: number = 0
  @Input() lastPageIndex:number = 0;
  @Output() pageToFetch = new EventEmitter<number>()

  constructor() {}

  getNewData (value:number) {
    this.pageToFetch.emit(value)
  }

  changePage (page:number) {
    this.currentPage = page
    this.getNewData(this.currentPage);
  }

  changePageToNext () {
    let currentIndex = this.totalPage.indexOf(this.currentPage)
    if (currentIndex === this.lastPageIndex) {
      console.log('this is last page')
    } else {
      this.changePage(this.totalPage[currentIndex + 1])
    }
  }

  changePageToPrev () {
    let currentIndex = this.totalPage.indexOf(this.currentPage)
    if (currentIndex === 0) {
      console.log('this is first page')
    } else {
      this.changePage(this.totalPage[currentIndex - 1])
    }
  }

  isLastPage () {
    let currentIndex = this.totalPage.indexOf(this.currentPage) 
    if (currentIndex === this.lastPageIndex) {
      return true
    }
    return false
  }

  isFirstPage () {
    let currentIndex = this.totalPage.indexOf(this.currentPage)
    if (currentIndex === 0) {
      return true
    }
    return false
  }

}
