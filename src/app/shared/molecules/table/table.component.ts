import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryResponse, PaginationCategory } from 'src/app/core/model/category-response';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input()  pageData!: PaginationCategory<CategoryResponse[]>;
  @Input() headers: string[] = [];
  @Output() onPageChange = new EventEmitter<number>();

  constructor() { }
  ngOnInit() {
    //empty because we don't need to do anything here
  }
}
