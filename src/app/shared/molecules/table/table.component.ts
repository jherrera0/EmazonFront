import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BrandResponseCustom } from '@model/brand-response.model';
import { CategoryResponseCustom } from '@model/category-response';
import { Pagination } from '@model/pagination.model';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input()  pageData!: Pagination<any>;
  @Input() keys:  (keyof any)[] = [];
  @Input() headers: string[] = [];
  @Output() onPageChange = new EventEmitter<number>();

  isObject(value: any): boolean {
    return value && typeof value === 'object';
  }

  getCategories(categories: CategoryResponseCustom[]): string {
    return categories.map(category => category.name).join(', ');
  }

  getBrandName(brand: BrandResponseCustom): string {
    return brand.name;  }

  constructor() { }
  ngOnInit() {
    //empty because we don't need to do anything here
  }
}
