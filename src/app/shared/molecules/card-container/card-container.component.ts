import { Component, Input, OnInit } from '@angular/core';
import { ArticleResponse } from '@model/article-response.model';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {
  @Input() items!: ArticleResponse[];
  constructor() { }

  ngOnInit(): void {
    //empty because we don't need to do anything here
  }

}
