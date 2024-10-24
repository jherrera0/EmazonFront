import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-link',
  templateUrl: './navigation-link.component.html',
  styleUrls: ['./navigation-link.component.scss']
})
export class NavigationLinkComponent implements OnInit {
  @Input() linkText: string = '';
  @Input() linkUrl: string = '';
  constructor() { }

  ngOnInit(): void {
    // empty because we don't need to do anything here
  }

}
