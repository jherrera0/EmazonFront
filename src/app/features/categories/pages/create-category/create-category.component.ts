import { CategoryRequest } from './../../../../core/model/category-request.model';
import { CategoryService } from '../../../../core/service/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '@service/toast.service';
import { ToastConst } from '@util/toastConst';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  public createCategoryForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
   private readonly CategoryService: CategoryService,
   private readonly toastService: ToastService) {
    this.createCategoryForm = this.formBuilder.group({
      categoryName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[^@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`¡¿!]+$/)
        ],
      ],
      categoryDescription: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(90),
          Validators.pattern(/^[^@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`¡¿!]+$/)

        ],
      ],
    });


  }

  private readonly errorMessages: {
    [key: string]: (fieldName: string, error?: any) => string;
  } = {
    required: (fieldName: string) => `${fieldName} is required.`,
    minlength: (fieldName: string, error: any) =>
      `${fieldName} must be at least ${error.requiredLength} characters.`,
    maxlength: (fieldName: string, error: any) => `${fieldName} must be at most ${error.requiredLength} characters.`,
    pattern: (fieldName: string) =>
      `${fieldName} contains forbidden characters.`,
  };

  get categoryName() {
    return this.createCategoryForm.get('categoryName');
  }

  get categoryDescription() {
    return this.createCategoryForm.get('categoryDescription');
  }

  getErrorMessage(control: any, fieldName: string): string {
    if (control?.touched && control?.errors) {
      const firstKey = Object.keys(control.errors)[0];
      const error = control.errors[firstKey];
      return this.errorMessages[firstKey](fieldName, error);
    }
    return '';
  }

  createCategory(){
    let category: CategoryRequest = {
      name: this.createCategoryForm.value.categoryName,
      description: this.createCategoryForm.value.categoryDescription
    };

    this.CategoryService.saveCategory(category).subscribe({
      next: () => this.toastService.showToast('Category saved successfully!',ToastConst.SUCCESS),
      error: () => this.toastService.showToast(this.CategoryService.getErrorMessage(), ToastConst.ERROR)
    });
  }

  get categoryNameError(): string {
    const control = this.createCategoryForm.get('categoryName');
    if (control?.hasError('required')||control?.hasError('minlength')||control?.hasError('pattern')||control?.hasError('maxlength')) {
      return 'Required a valid category name';
    }
    return '';
  }

  get categoryDescriptionError(): string {
    const control = this.createCategoryForm.get('categoryDescription');
    if (control?.hasError('required')||control?.hasError('minlength')||control?.hasError('pattern')||control?.hasError('maxlength')) {
      return 'Required a valid category description';
    }
    return '';
  }
  ngOnInit(): void {
    // empty because we don't need to do anything here
  }

}
