import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HambugerButtonComponent } from './hambuger-button.component';

describe('HamburgerButtonComponent', () => {
  let component: HambugerButtonComponent;
  let fixture: ComponentFixture<HambugerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HambugerButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HambugerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should toggle isMenuOpen from false to true', () => {
    component.isMenuOpen = false;
    component.toggleMenu();
    expect(component.isMenuOpen).toBeTruthy();
  });

  it('should toggle isMenuOpen from true to false', () => {
    component.isMenuOpen = true;
    component.toggleMenu();
    expect(component.isMenuOpen).toBeFalsy();
  });
});
