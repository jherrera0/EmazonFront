import { BrandService } from '@service/brand.service';
import { Component, OnInit } from '@angular/core';
import { BrandResponse} from '@model/brand-response.model';
import { Pagination } from '@model/pagination.model';


@Component({
  selector: 'app-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.scss']
})
export class ListBrandsComponent implements OnInit {
  brandsPage!: Pagination<BrandResponse[]>;
  pages: number[] = [];
  pageSize: number = 5;
  sortDirection: string = 'asc';
  headers: (keyof BrandResponse)[] = ["id","name","description"]

  constructor(private readonly brandService:BrandService) { }

  ngOnInit(): void {
    this.loadPage(0,5,'asc');
  }

  loadPagination() {
    this.pages = Array.from({ length: this.brandsPage.totalPages }, (_, i) => i + 1);
  }

  loadPage(page: number, size: number, sortDirection: string) {
    this.brandService.getBrands(page, size, sortDirection).subscribe((data) => {
      this.brandsPage = data;
      this.loadPagination();
    });
  }

  onPageChange(pageNumber: number) {
    this.loadPage(pageNumber, this.pageSize, this.sortDirection);
  }

  onSortDirectionChange(event: Event) {
    const newDirection = (event.target as HTMLSelectElement).value;
    this.sortDirection = newDirection;
    this.loadPage(0, this.pageSize, this.sortDirection);
  }

  onPageSizeChange(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.pageSize = Number(newSize);
    this.loadPage(0, this.pageSize, this.sortDirection);
  }

  previousPage() {
    if (this.brandsPage.currentPage > 0) {
      this.onPageChange(this.brandsPage.currentPage - 1);
    }
  }

  nextPage() {
    if (this.brandsPage.currentPage < this.brandsPage.totalPages - 1) {
      this.onPageChange(this.brandsPage.currentPage + 1);
    }
  }

  goToPage(page: number) {
    this.brandsPage.currentPage = page - 1;
    this.onPageChange(this.brandsPage.currentPage);
  }
}
