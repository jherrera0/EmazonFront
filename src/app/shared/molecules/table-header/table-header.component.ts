import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {
  @Input() headers!: string[];
  constructor() { }

  ngOnInit(): void {
    // empty because we don't need to do anything here
    }

}
