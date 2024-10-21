import { ArticleService } from "@service/article.service";
import { CreateArticleComponent } from "./create-article.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrandService } from "@service/brand.service";
import { CategoryService } from "@service/category.service";
import { ToastService } from "@service/toast.service";
import { ReactiveFormsModule } from "@angular/forms";
import { of, throwError } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { ArticleRequest } from "@model/article-request.model";

class MockArticleService{
  saveArticle = jest.fn();
  getErrorMessage = jest.fn().mockReturnValue('Error saving article');
}

class MockBrandService{
  getBrands = jest.fn();
}

class MockCategoryService{
  getCategories = jest.fn();
}

class MockToastService{
  showToast = jest.fn();
}

describe('CreateArticleComponent', () => {
  let component: CreateArticleComponent;
  let fixture: ComponentFixture<CreateArticleComponent>;
  let articleService: MockArticleService;
  let brandService: MockBrandService;
  let categoryService: MockCategoryService;
  let toastService: MockToastService;

  beforeEach(async () => {
    articleService = new MockArticleService();
    brandService = new MockBrandService();
    categoryService = new MockCategoryService();
    toastService = new MockToastService();

    await TestBed.configureTestingModule({
      declarations: [CreateArticleComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ArticleService, useValue: articleService },
        { provide: BrandService, useValue: brandService },
        { provide: CategoryService, useValue: categoryService },
        { provide: ToastService, useValue: toastService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateArticleComponent);
    component = fixture.componentInstance;
    brandService.getBrands.mockReturnValue(of([]));
    categoryService.getCategories.mockReturnValue(of([]));
    articleService.saveArticle.mockReturnValue(of({}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should create a article successfully", () => {
    const mockResponse = new HttpResponse<ArticleRequest>({
        status: 201,
      body: {
        name: "Test article",
        description: "Test article description",
        price: 100,
        stock: 10,
        brandId: 1,
        categoriesId: [1, 2],},
    });
    articleService.saveArticle.mockReturnValue(of(mockResponse));

    component.createArticleForm.setValue({
        articleName: "Test article",
        articleDescription: "Test article description",
        articlePrice: 100,
        articleStock: 10,
    });

    component.brandSelected = 1;
    component.categoriesSelected = [1, 2];

    component.createArticle();

    expect(articleService.saveArticle).toHaveBeenCalledWith({
      name: "Test article",
        description: "Test article description",
        price: 100,
        stock: 10,
        brandId: component.brandSelected,
        categoriesId: component.categoriesSelected,
    });
    expect(toastService.showToast).toHaveBeenCalledWith(
      "Article saved successfully", "success"
    );
  });

  it("should handle error when saving a article", () => {
    articleService.saveArticle.mockReturnValue(
      throwError(() => new Error("Error saving article"))
    );

    component.createArticleForm.setValue({
        articleName: "Test article",
        articleDescription: "Test article description",
        articlePrice: 100,
        articleStock: 10,
    });

    component.createArticle();

    expect(toastService.showToast).toHaveBeenCalledWith(
      "Error saving article", "error"
    );
  });

  it('should initialize the form correctly', () => {
    expect(component.createArticleForm).toBeTruthy();
    expect(component.createArticleForm.get('articleName')).toBeTruthy();
    expect(component.createArticleForm.get('articleDescription')).toBeTruthy();
    expect(component.createArticleForm.get('articlePrice')).toBeTruthy();
    expect(component.createArticleForm.get('articleStock')).toBeTruthy();
  });

  it('should get brands', () => {
    brandService.getBrands.mockReturnValue(of({ items: [] }));
    component.getBrands();
    expect(component.brands).toEqual({ items: [] });
  });

  it('should get categories', () => {
    categoryService.getCategories.mockReturnValue(of({ items: [] }));
    component.getCategories();
    expect(component.categories).toEqual({ items: [] });
  });

  it('should return correct error message for articleName', () => {
    component.createArticleForm.get('articleName')?.setErrors({ required: true });
    expect(component.articleNameError).toBe('Valid article name is required');
  });

  it('should return correct error message for articleName', () => {
    component.createArticleForm.get('articleName')?.setErrors({ minlength: { requiredLength: 3 } });
    expect(component.articleNameError).toBe('Article name must be at least 3 characters');
  });

  it('should return correct error message for articleName', () => {
    component.createArticleForm.get('articleName')?.setErrors({ pattern: true });
    expect(component.articleNameError).toBe('Article name contains forbidden characters');
  });

  it('should not return error message for articleName', () => {
    component.createArticleForm.get('articleName')?.setErrors(null);
    expect(component.articleNameError).toBe('');
  });

  it('should return correct error message for articleDescription', () => {
    component.createArticleForm.get('articleDescription')?.setErrors({ required: true });
    expect(component.articleDescriptionError).toBe('Valid article description is required');
  });

  it('should return correct error message for articleDescription', () => {
    component.createArticleForm.get('articleDescription')?.setErrors({ minlength: { requiredLength: 3 } });
    expect(component.articleDescriptionError).toBe('Article description must be at least 3 characters');
  });

  it('should return correct error message for articleDescription', () => {
    component.createArticleForm.get('articleDescription')?.setErrors({ pattern: true });
    expect(component.articleDescriptionError).toBe('Article description contains forbidden characters');
  });

  it('should not return error message for articleDescription', () => {
    component.createArticleForm.get('articleDescription')?.setErrors(null);
    expect(component.articleDescriptionError).toBe('');
  });

  it('should return correct error message for articlePrice', () => {
    component.createArticleForm.get('articlePrice')?.setErrors({ required: true });
    expect(component.articlePriceError).toBe('Valid article price is required');
  });

  it('should not return error message for articlePrice', () => {
    component.createArticleForm.get('articlePrice')?.setErrors(null);
    expect(component.articlePriceError).toBe('');
  });

  it('should return correct error message for articleStock', () => {
    component.createArticleForm.get('articleStock')?.setErrors({ required: true });
    expect(component.articleStockError).toBe('Valid article stock is required');
  });

  it('should not return error message for articleStock', () => {
    component.createArticleForm.get('articleStock')?.setErrors(null);
    expect(component.articleStockError).toBe('');
  });

  it('should return correct error message for articlePrice pattern', () => {
    component.createArticleForm.get('articlePrice')?.setErrors({ pattern: true });
    expect(component.articlePriceError).toBe('Article price must be a number');
  });

  it('should return correct error message for articleStock pattern', () => {
    component.createArticleForm.get('articleStock')?.setErrors({ pattern: true });
    expect(component.articleStockError).toBe('Article stock must be a number');
  });

  it('should return correct error message for articlePrice min', () => {
    component.createArticleForm.get('articlePrice')?.setErrors({ min: true });
    expect(component.articlePriceError).toBe('Article price must be at least 1');
  });

  it('should return correct error message for articleStock min', () => {
    component.createArticleForm.get('articleStock')?.setErrors({ min: true });
    expect(component.articleStockError).toBe('Article stock must be at least 1');
  });


  it('should disable the button when form is invalid', () => {
    component.createArticleForm.setErrors({ invalid: true });
    expect(component.isButtonDisabled()).toBe(true);
  });

  it('should disable the button when no brand is selected', () => {
    component.brandSelected = 0;
    expect(component.isButtonDisabled()).toBe(true);
  });

  it('should disable the button when no categories are selected', () => {
    component.categoriesSelected = [];
    expect(component.isButtonDisabled()).toBe(true);
  });

  it('should enable the button when form is valid and brand and categories are selected', () => {
    component.createArticleForm.setValue({
      articleName: 'Test Article',
      articleDescription: 'Test Description',
      articlePrice: 100,
      articleStock: 10
    });
    component.brandSelected = 1;
    component.categoriesSelected = [1, 2];
    expect(component.isButtonDisabled()).toBe(false);
  });

  it('should call onBrandIdCaptured and set brandSelected', () => {
    component.onBrandIdCaptured({ target: { value: '1' } } as unknown as Event);
    expect(component.brandSelected).toBe(1);
  });

  it('should call onCategoriesIdCaptured and set categoriesSelected', () => {
    component.onCategoriesIdCaptured([1, 2]);
    expect(component.categoriesSelected).toEqual([1, 2]);
  });

  it('should call getBrands on ngOnInit', () => {
    const getBrandsSpy = jest.spyOn(component, 'getBrands');
    component.ngOnInit();
    expect(getBrandsSpy).toHaveBeenCalled();
  });

  it('should call getCategories on ngOnInit', () => {
    const getCategoriesSpy = jest.spyOn(component, 'getCategories');
    component.ngOnInit();
    expect(getCategoriesSpy).toHaveBeenCalled();
  });
});

