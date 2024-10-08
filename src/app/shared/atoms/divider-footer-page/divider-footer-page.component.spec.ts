import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerFooterPageComponent } from './divider-footer-page.component';

describe('DividerFooterPageComponent', () => {
  let component: DividerFooterPageComponent;
  let fixture: ComponentFixture<DividerFooterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividerFooterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DividerFooterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
