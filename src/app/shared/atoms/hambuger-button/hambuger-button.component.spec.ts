import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HambugerButtonComponent } from './hambuger-button.component';

describe('HambugerButtonComponent', () => {
  let component: HambugerButtonComponent;
  let fixture: ComponentFixture<HambugerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HambugerButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HambugerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
