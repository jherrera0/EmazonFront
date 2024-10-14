import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ListCategoriesComponent } from './list-categories.component';
import { CategoryService } from '@service/category.service';

describe('ListCategoriesComponent', () => {
  let component: ListCategoriesComponent;
  let fixture: ComponentFixture<ListCategoriesComponent>;
  let categoryServiceMock: any;

  beforeEach(async () => {
    categoryServiceMock = {
      getCategories: jest.fn().mockReturnValue(of({
        currentPage: 0,
        pageSize: 5,
        totalPages: 2,
        items: [
          { id: 1, name: 'category1', description: 'description1' },
          { id: 2, name: 'category2', description: 'description2' },
          { id: 3, name: 'category3', description: 'description3' },
          { id: 4, name: 'category4', description: 'description4' },
          { id: 5, name: 'category5', description: 'description5' }
        ]
      }))
    };

    await TestBed.configureTestingModule({
      declarations: [ListCategoriesComponent],
      providers: [{ provide: CategoryService, useValue: categoryServiceMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', () => {
    expect(categoryServiceMock.getCategories).toHaveBeenCalledWith(0, 5, 'asc');
    expect(component.categoriesPage.items.length).toBe(5);
  });

  it('should load pagination correctly', () => {
    component.loadPagination();
    expect(component.pages.length).toBe(2);
  });

  it('should change page size', () => {
    const event = { target: { value: '10' } } as unknown as Event;
    component.onPageSizeChange(event);
    expect(component.pageSize).toBe(10);
    expect(categoryServiceMock.getCategories).toHaveBeenCalledWith(0, 10, 'asc');
  });

  it('should change sort direction', () => {
    const event = { target: { value: 'desc' } } as unknown as Event;
    component.onSortDirectionChange(event);
    expect(component.sortDirection).toBe('desc');
    expect(categoryServiceMock.getCategories).toHaveBeenCalledWith(0, 5, 'desc');
  });

  it('should go to next page', () => {
    component.nextPage();
    expect(categoryServiceMock.getCategories).toHaveBeenCalledWith(1, 5, 'asc');
  });

  it('should go to previous page', () => {
    component.categoriesPage.currentPage = 1;
    component.previousPage();
    expect(categoryServiceMock.getCategories).toHaveBeenCalledWith(0, 5, 'asc');
  });

  it('should go to specific page', () => {
    component.goToPage(2);
    expect(categoryServiceMock.getCategories).toHaveBeenCalledWith(1, 5, 'asc');
  });
});
