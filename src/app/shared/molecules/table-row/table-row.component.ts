import { Component, Input, OnInit } from '@angular/core';
import { CategoryResponse } from 'src/app/core/model/category-response';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
  @Input() rowData: CategoryResponse = {} as CategoryResponse;
  @Input() properties: string[] = [];
  constructor() { }

  ngOnInit(): void {
    // empty because we don't need to do anything here
  }

}
