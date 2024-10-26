import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { ArticleService } from "@service/article.service";
import { ListArticlesWithCardsComponent } from "./list-articles-with-cards.component";

describe('ListArticlesComponent', () => {
  let component: ListArticlesWithCardsComponent
  let fixture: ComponentFixture<ListArticlesWithCardsComponent>;
  let articleServiceMock: any;

  beforeEach(async () => {
    articleServiceMock = {
      getArticles: jest.fn().mockReturnValue(of({
      currentPage: 0,
      pageSize: 5,
      totalPages: 2,
      items: [
        { id: 1, name: 'article1', description: 'description1', brand: 'brand1', categories: ['category1'], price: 10, stock: 5 },
        { id: 2, name: 'article2', description: 'description2', brand: 'brand2', categories: ['category2'], price: 20, stock: 10 },
        { id: 3, name: 'article3', description: 'description3', brand: 'brand3', categories: ['category3'], price: 30, stock: 15 },
        { id: 4, name: 'article4', description: 'description4', brand: 'brand4', categories: ['category4'], price: 40, stock: 20 },
        { id: 5, name: 'article5', description: 'description5', brand: 'brand5', categories: ['category5'], price: 50, stock: 25 }
      ],
    }))
    };

    await TestBed.configureTestingModule({
      declarations: [ ListArticlesWithCardsComponent ],
      providers: [ { provide: ArticleService, useValue: articleServiceMock } ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListArticlesWithCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load articles on init', () => {
    expect(articleServiceMock.getArticles).toHaveBeenCalledWith(0, 5, 'asc', 'name');
    expect(component.articlePage.items.length).toBe(5);
  });

  it('should load pagination correctly', () => {
    component.loadPagination();
    expect(component.pages.length).toBe(2);
  });

  it('should change page size', () => {
    const event = { target: { value: '10' } } as unknown as Event;
    component.onPageSizeChange(event);
    expect(component.pageSize).toBe(10);
    expect(articleServiceMock.getArticles).toHaveBeenCalledWith(0, 10, 'asc', 'name');
  });

  it('should change sort direction', () => {
    const event = { target: { value: 'desc' } } as unknown as Event;
    component.onSortDirectionChange(event);
    expect(component.sortDirection).toBe('desc');
    expect(articleServiceMock.getArticles).toHaveBeenCalledWith(0, 5, 'desc', 'name');
  });

  it('should change sort by', () => {
    const event = { target: { value: 'name' } } as unknown as Event;
    component.onSortByChange(event);
    expect(component.sortBy).toBe('name');
    expect(articleServiceMock.getArticles).toHaveBeenCalledWith(0, 5, 'asc', 'name');
  });

  it('should change page', () => {
    component.onPageChange(1);
    expect(articleServiceMock.getArticles).toHaveBeenCalledWith(1, 5, 'asc', 'name');
  });

  it('should go to next page', () => {
    component.nextPage();
    expect(articleServiceMock.getArticles).toHaveBeenCalledWith(1, 5, 'asc', 'name');
  });

  it('should go to previous page', () => {
    component.previousPage();
    expect(articleServiceMock.getArticles).toHaveBeenCalledWith(0, 5, 'asc', 'name');
  });

  it('should go to page', () => {
    component.goToPage(2);
    expect(articleServiceMock.getArticles).toHaveBeenCalledWith(1, 5, 'asc', 'name');
  });

  it('should go to previous page if current page is greater than 0', () => {
    component.articlePage = { currentPage: 1, pageSize: 5, totalPages: 2, items: [] };
    component.previousPage();
    expect(articleServiceMock.getArticles).toHaveBeenCalledWith(0, 5, 'asc', 'name');
  });

});
