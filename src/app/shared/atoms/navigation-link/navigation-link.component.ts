import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-link',
  templateUrl: './navigation-link.component.html',
  styleUrls: ['./navigation-link.component.scss']
})
export class NavigationLinkComponent implements OnInit {
  @Input() linkText: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
