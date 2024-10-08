import { __param } from 'tslib';
import { Toast } from './../../../../core/service/toast.service';
import { CategoryRequest } from './../../../../core/model/category-request.model';
import { CategoryService } from './../../service/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/service/toast.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  public createCategoryForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
   private CategoryService: CategoryService,
   private toastService: ToastService) {
    this.createCategoryForm = this.formBuilder.group({
      categoryName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(/^[^'";<>\\-]+$/),
        ],
      ],
      categoryDescription: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(/^[^'";<>\\-]+$/),
        ],
      ],
    });
  }

  private errorMessages: {
    [key: string]: (fieldName: string, error?: any) => string;
  } = {
    required: (fieldName: string) => `${fieldName} is required.`,
    minlength: (fieldName: string, error: any) =>
      `${fieldName} must be at least ${error.requiredLength} characters.`,
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
    var category: CategoryRequest = {
      name: this.createCategoryForm.value.categoryName,
      description: this.createCategoryForm.value.categoryDescription
    };

    this.CategoryService.saveCategory(category).subscribe({
      next: () => this.toastService.showToast('Category saved successfully!','success'),
      error: () => this.toastService.showToast(this.CategoryService.getErrorMessage(), 'error')
    });
  }

  get categoryNameError(): string {
    return this.getErrorMessage(this.categoryName, 'Category Name');
  }

  get categoryDescriptionError(): string {
    return this.getErrorMessage(
      this.categoryDescription,
      'Category Description'
    );
  }
  ngOnInit(): void {
  }

}
