import { Component, OnInit } from '@angular/core';
import { ArticleResponse } from '@model/article-response.model';
import { Pagination } from '@model/pagination.model';
import { ArticleService } from '@service/article.service';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit {
  articlePage!: Pagination<ArticleResponse[]>;
  pages: number[] = [];
  pageSize: number = 5;
  sortDirection: string = 'asc';
  sortBy: string = 'name';
  headers: (keyof ArticleResponse)[]= ["id","name","description","brand","categories","price","stock"]
  constructor(private readonly articleService:ArticleService) { }

  ngOnInit(): void {
    this.loadPage(0,this.pageSize,this.sortDirection,this.sortBy);
  }

  loadPage(page: number, size: number, sortDirection: string, sortBy: string) {
    this.articleService.getArticles(page, size, sortDirection,sortBy).subscribe((data) => {
      this.articlePage = data;
      this.loadPagination();
    });
  }

  loadPagination() {
    this.pages = Array.from({ length: this.articlePage.totalPages }, (_, i) => i + 1);
  }
  onPageChange(pageNumber: number) {
    this.loadPage(pageNumber, this.pageSize, this.sortDirection, this.sortBy);
  }

  onSortByChange(event: Event) {
    const newSortBy = (event.target as HTMLSelectElement).value;
    this.sortBy = newSortBy;
    this.loadPage(0, this.pageSize, this.sortDirection, this.sortBy);
  }

  onSortDirectionChange(event: Event) {
    const newDirection = (event.target as HTMLSelectElement).value;
    this.sortDirection = newDirection;
    this.loadPage(0, this.pageSize, this.sortDirection, this.sortBy);
  }

  onPageSizeChange(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.pageSize = Number(newSize);
    this.loadPage(0, this.pageSize, this.sortDirection, this.sortBy);
  }

  previousPage() {
    if (this.articlePage.currentPage > 0) {
      this.onPageChange(this.articlePage.currentPage - 1);
    }
  }

  nextPage() {
    if (this.articlePage.currentPage < this.articlePage.totalPages - 1) {
      this.onPageChange(this.articlePage.currentPage + 1);
    }
  }

  goToPage(page: number) {
    this.articlePage.currentPage = page - 1;
    this.onPageChange(this.articlePage.currentPage);
  }
}
