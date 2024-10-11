import { CategoryService } from '@service/category.service';
import { Component, OnInit } from '@angular/core';
import { PageCustom } from 'src/app/core/model/page-response.models';
import { CategoryResponse, PaginationCategory } from 'src/app/core/model/category-response';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
  categoriesPage: PaginationCategory<CategoryResponse[]> = {
    "currentPage": 0,
    "pageSize": 5,
    "totalPages": 2,
    "items": [
        {
            "id": -1,
            "name": "",
            "description": ""
        },
        {
          "id": 1,
          "name": "category1",
          "description": "description1"
        },
        {
          "id": 2,
          "name": "category2",
          "description": "description2"
        },
        {
          "id": 3,
          "name": "category3",
          "description": "description3"
        },
        {
          "id": 4,
          "name": "category4",
          "description": "description4"
        },
        {
          "id": 5,
          "name": "category5",
          "description": "description5"
        }
    ]
};
  pages: number[] = [];
  pageSize: number = 5;
  sortDirection: string = 'asc';
  headers = ["Id","Name","Description"]

  constructor(private readonly CategoryService:CategoryService) { }

  ngOnInit(): void {
    this.loadPage(0,5,'asc');
  }

  loadPagination() {
    this.pages = Array.from({ length: this.categoriesPage.totalPages }, (_, i) => i + 1);
  }

  loadPage(pageNumber: number, pageSize: number, sortDirection: string) {
    this.CategoryService.getCategories(pageNumber,pageSize,sortDirection).subscribe((data) => {
      if(data != undefined){
        this.categoriesPage = data;
      }
    });
    this.loadPagination();
  }
  onPageChange(pageNumber: number) {
    this.loadPage(pageNumber,this.pageSize,this.sortDirection);
  }
  onPageSizeChange(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.pageSize = Number(newSize);
    this.loadPage(0, this.pageSize, this.sortDirection);
  }
  onSortDirectionChange(event: Event) {
    const newDirection = (event.target as HTMLSelectElement).value;
    this.sortDirection = newDirection;
    this.loadPage(0, this.pageSize, this.sortDirection);
  }

  previousPage() {
    if (this.categoriesPage.currentPage > 0) {
      this.onPageChange(this.categoriesPage.currentPage - 1);
    }
  }

  nextPage() {
    if (this.categoriesPage.currentPage < this.categoriesPage.totalPages - 1) {
      this.onPageChange(this.categoriesPage.currentPage + 1);
    }
  }

  goToPage(page: number) {
    this.categoriesPage.currentPage = page - 1;
    this.onPageChange(this.categoriesPage.currentPage);
  }
}
