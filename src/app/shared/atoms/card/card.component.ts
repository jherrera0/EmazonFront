import { Component, Input, OnInit } from '@angular/core';
import { ArticleResponse } from '@model/article-response.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() article: ArticleResponse = {
    id: 0,
    name: '',
    description: '',
    brand: {id: 0, name: ''},
    categories: [],
    price: 0,
    stock: 0
  }
  constructor() { }

  ngOnInit(): void {
    // empty because we don't need to do anything here
  }

}
