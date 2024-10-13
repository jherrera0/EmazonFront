import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { PaginationCategory, CategoryResponse } from 'src/app/core/model/category-response';
import { By } from '@angular/platform-browser';

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
});
