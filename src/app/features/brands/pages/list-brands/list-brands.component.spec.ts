import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBrandsComponent } from './list-brands.component';
import { of } from 'rxjs';
import { BrandService } from '@service/brand.service';

describe('ListBrandsComponent', () => {
  let component: ListBrandsComponent;
  let fixture: ComponentFixture<ListBrandsComponent>;
  let brandServiceMock: any;

  beforeEach(async () => {
    brandServiceMock = {
      getBrands: jest.fn().mockReturnValue(of({
        currentPage: 0,
        pageSize: 5,
        totalPages: 2,
        items: [
          { id: 1, name: 'brand1', description: 'description1' },
          { id: 2, name: 'brand2', description: 'description2' },
          { id: 3, name: 'brand3', description: 'description3' },
          { id: 4, name: 'brand4', description: 'description4' },
          { id: 5, name: 'brand5', description: 'description5' }
        ]
      }))
    };


    await TestBed.configureTestingModule({
      declarations: [ ListBrandsComponent ],
      providers: [ { provide: BrandService, useValue: brandServiceMock } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load brands on init', () => {
    expect(brandServiceMock.getBrands).toHaveBeenCalledWith(0, 5, 'asc');
    expect(component.brandsPage.items.length).toBe(5);
  });

  it('should load pagination correctly', () => {
    component.loadPagination();
    expect(component.pages.length).toBe(2);
  });

  it('should change page size', () => {
    const event = { target: { value: '10' } } as unknown as Event;
    component.onPageSizeChange(event);
    expect(component.pageSize).toBe(10);
    expect(brandServiceMock.getBrands).toHaveBeenCalledWith(0, 10, 'asc');
  });

  it('should change sort direction', () => {
    const event = { target: { value: 'desc' } } as unknown as Event;
    component.onSortDirectionChange(event);
    expect(component.sortDirection).toBe('desc');
    expect(brandServiceMock.getBrands).toHaveBeenCalledWith(0, 5, 'desc');
  });

  it('should change page', () => {
    component.onPageChange(1);
    expect(brandServiceMock.getBrands).toHaveBeenCalledWith(1, 5, 'asc');
  });

  it('should change page', () => {
    component.onPageChange(1);
    expect(brandServiceMock.getBrands).toHaveBeenCalledWith(1, 5, 'asc');
  });

  it('should change page', () => {
    component.onPageChange(1);
    expect(brandServiceMock.getBrands).toHaveBeenCalledWith(1, 5, 'asc');
  });

  it('should go to next page', () => {
    component.nextPage();
    expect(brandServiceMock.getBrands).toHaveBeenCalledWith(1, 5, 'asc');
  });

  it('should go to previous page', () => {
    component.brandsPage.currentPage = 1;
    component.previousPage();
    expect(brandServiceMock.getBrands).toHaveBeenCalledWith(0, 5, 'asc');
  });

  it('should go to specific page', () => {
    component.goToPage(2);
    expect(brandServiceMock.getBrands).toHaveBeenCalledWith(1, 5, 'asc');
  });

});
