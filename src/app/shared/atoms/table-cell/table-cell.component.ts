import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent implements OnInit {
  @Input() content : any;
  constructor() { }

  ngOnInit(): void {
    // empty because we don't need to do anything here
  }

}
