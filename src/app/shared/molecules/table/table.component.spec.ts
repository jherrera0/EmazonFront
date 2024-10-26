import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { By } from '@angular/platform-browser';
import { BrandResponseCustom } from '@model/brand-response.model';
import { CategoryResponseCustom } from '@model/category-response';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.pageData = {
      items: [],
      pageSize: 0,
      totalPages: 0,
      currentPage: 0
    };
    component.headers = ['Header1', 'Header2'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render headers', () => {
    const compiled = fixture.nativeElement;
    const headerElements = compiled.querySelectorAll('th');
    expect(headerElements.length).toBe(component.headers.length);
    component.headers.forEach((header, index) => {
      expect(headerElements[index].textContent).toContain(header);
    });
  });

  it('should display the correct number of rows', () => {
    component.pageData.items = [
      { id: 1, name: 'Category 1', description: 'Description 1' },
      { id: 2, name: 'Category 2', description: 'Description 2' }
    ];
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tr'));
    expect(rows.length).toBe(component.pageData.items.length + 1);
});

it('should return the correct brand name', () => {
  const brand = { name: 'Brand A' } as BrandResponseCustom;
  const brandName = component.getBrandName(brand);
  expect(brandName).toBe('Brand A');
});

it('should return an empty string if brand name is not defined', () => {
  const brand = { name: '' } as BrandResponseCustom;
  const brandName = component.getBrandName(brand);
  expect(brandName).toBe('');
});

it('should return a comma-separated string of category names', () => {
  const categories = [
    { name: 'Category 1' },
    { name: 'Category 2' },
    { name: 'Category 3' }
  ] as CategoryResponseCustom[];
  const result = component.getCategories(categories);
  expect(result).toBe('Category 1, Category 2, Category 3');
});

it('should return an empty string if categories array is empty', () => {
  const categories: CategoryResponseCustom[] = [];
  const result = component.getCategories(categories);
  expect(result).toBe('');
});

it('should return true for an object', () => {
  const result = component.isObject({ key: 'value' });
  expect(result).toBe(true);
});

it('should return false for a string', () => {
  const result = component.isObject('string');
  expect(result).toBe(false);
});

it('should return false for a number', () => {
  const result = component.isObject(123);
  expect(result).toBe(false);
});

it('should return true for an array', () => {
  const result = component.isObject([1, 2, 3]);
  expect(result).toBe(true);
});

});
