import { CategoryRequest } from './../../../../core/model/category-request.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CreateCategoryComponent } from './create-category.component';
import { CategoryService } from '../../../../core/service/category.service';
import { ToastService } from '@service/toast.service';
import { HttpResponse } from '@angular/common/http';

class MockCategoryService {
  saveCategory = jest.fn();
  getErrorMessage = jest.fn().mockReturnValue('Error saving category');
}

class MockToastService {
  showToast = jest.fn();
}

describe('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;
  let categoryService: MockCategoryService;
  let toastService: MockToastService;

  beforeEach(async () => {
    categoryService = new MockCategoryService();
    toastService = new MockToastService();

    await TestBed.configureTestingModule({
      declarations: [CreateCategoryComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: CategoryService, useValue: categoryService },
        { provide: ToastService, useValue: toastService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.createCategoryForm).toBeTruthy();
    expect(component.createCategoryForm.get('categoryName')).toBeTruthy();
    expect(component.createCategoryForm.get('categoryDescription')).toBeTruthy();
  });

  it('should create a category successfully', () => {
    const mockResponse = new HttpResponse<CategoryRequest>({ status: 201, body: { name: 'Test Category', description: 'Test Description' } });
    categoryService.saveCategory.mockReturnValue(of(mockResponse));

    component.createCategoryForm.setValue({
      categoryName: 'Test Category',
      categoryDescription: 'Test Description',
    });

    component.createCategory();

    expect(categoryService.saveCategory).toHaveBeenCalledWith({
      name: 'Test Category',
      description: 'Test Description',
    });
    expect(toastService.showToast).toHaveBeenCalledWith('Category saved successfully!', 'success');
  });

  it('should handle error when creating a category', () => {
    categoryService.saveCategory.mockReturnValue(throwError(() => new Error('Error saving category')));

    component.createCategoryForm.setValue({
      categoryName: 'Test Category',
      categoryDescription: 'Test Description',
    });

    component.createCategory();

    expect(categoryService.saveCategory).toHaveBeenCalledWith({
      name: 'Test Category',
      description: 'Test Description',
    });
    expect(toastService.showToast).toHaveBeenCalledWith('Error saving category', 'error');
  });

  it('should return correct error message for categoryName', () => {
    component.createCategoryForm.get('categoryName')?.setErrors({ required: true });
    expect(component.categoryNameError).toBe('Required a valid category name');
  });

  it('should not return error message for categoryName', () => {
    component.createCategoryForm.get('categoryName')?.setErrors(null);
    expect(component.categoryNameError).toBe('');
  });

  it('should return correct error message for categoryDescription', () => {
    component.createCategoryForm.get('categoryDescription')?.setErrors({ minlength: { requiredLength: 3, actualLength: 1 } });
    expect(component.categoryDescriptionError).toBe('Required a valid category description');
  });

  it('should not return error message for categoryDescription', () => {
    component.createCategoryForm.get('categoryDescription')?.setErrors(null);
    expect(component.categoryDescriptionError).toBe('');
  });

  it('should call saveCategory and showToast on success', () => {
    categoryService.saveCategory.mockReturnValue(of({}));
    component.createCategoryForm.setValue({
      categoryName: 'Test Category',
      categoryDescription: 'Test Description'
    });

    component.createCategory();

    expect(categoryService.saveCategory).toHaveBeenCalledWith({
      name: 'Test Category',
      description: 'Test Description'
    });
    expect(toastService.showToast).toHaveBeenCalledWith('Category saved successfully!', 'success');
  });

  it('should call showToast with error message on error', () => {
    categoryService.saveCategory.mockReturnValue(throwError(() => new Error('Error')));
    component.createCategoryForm.setValue({
      categoryName: 'Test Category',
      categoryDescription: 'Test Description'
    });

    component.createCategory();

    expect(toastService.showToast).toHaveBeenCalledWith('Error saving category', 'error');
  });
  it('should return correct error message for required error', () => {
    const control = new FormControl();
    control.setErrors({ required: true });
    control.markAsTouched();
    const message = component.getErrorMessage(control, 'Category Name');
    expect(message).toBe('Category Name is required.');
  });
  it('should return correct error message for minlength error', () => {
    const control = new FormControl();
    control.setErrors({ minlength: { requiredLength: 3, actualLength: 1 } });
    control.markAsTouched();
    const message = component.getErrorMessage(control, 'Category Name');
    expect(message).toBe('Category Name must be at least 3 characters.');
  });

  it('should return correct error message for maxlength error', () => {
    const control = new FormControl();
    control.setErrors({ maxlength: { requiredLength: 50, actualLength: 65 } });
    control.markAsTouched();
    const message = component.getErrorMessage(control, 'Category Name');
    expect(message).toBe('Category Name must be at most 50 characters.');
  });

  it('should return correct error message for pattern error', () => {
    const control = new FormControl();
    control.setErrors({ pattern: true });
    control.markAsTouched();
    const message = component.getErrorMessage(control, 'Category Name');
    expect(message).toBe('Category Name contains forbidden characters.');
  });

  it('should return empty string if control has no errors', () => {
    const control = new FormControl();
    control.markAsTouched();
    const message = component.getErrorMessage(control, 'Category Name');
    expect(message).toBe('');
  });

  it('should return the FormControl for categoryName', () => {
    const control = component.categoryName;
    expect(control).toBe(component.createCategoryForm.get('categoryName'));
  });

  it('should return null if categoryName control does not exist', () => {
    component.createCategoryForm.removeControl('categoryName');
    const control = component.categoryName;
    expect(control).toBeNull();
  });

  it('should return the FormControl for categoryDescription', () => {
    const control = component.categoryDescription;
    expect(control).toBe(component.createCategoryForm.get('categoryDescription'));
  });

  it('should return null if categoryDescription control does not exist', () => {
    component.createCategoryForm.removeControl('categoryDescription');
    const control = component.categoryDescription;
    expect(control).toBeNull();
  });

});
