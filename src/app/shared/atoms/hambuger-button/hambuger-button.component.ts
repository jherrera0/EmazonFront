import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hambuger-button',
  templateUrl: './hambuger-button.component.html',
  styleUrls: ['./hambuger-button.component.scss']
})
export class HambugerButtonComponent implements OnInit {
  isMenuOpen = false;
  constructor() { }

  ngOnInit(): void {
    // empty because we don't need to do anything here
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
