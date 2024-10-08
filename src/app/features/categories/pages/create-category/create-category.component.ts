import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  public createCategoryForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createCategoryForm = this.formBuilder.group({
      categoryName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[^'";<>\\-]+$/),
        ],
      ],
      categoryDescription: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
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
    console.log("Create Category");
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
