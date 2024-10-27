import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAuxWarehouseComponent } from './create-aux-warehouse.component';

describe('CreateAuxWarehouseComponent', () => {
  let component: CreateAuxWarehouseComponent;
  let fixture: ComponentFixture<CreateAuxWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAuxWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAuxWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
