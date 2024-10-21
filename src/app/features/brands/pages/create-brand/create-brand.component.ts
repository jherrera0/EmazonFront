import { BrandRequest } from './../../../../core/model/brand-request.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BrandService } from '@service/brand.service';
import { ToastService } from '@service/toast.service';
import { ToastConst } from '@util/toastConst';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent implements OnInit {
  public createBrandForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly brandService: BrandService,
    private readonly toastService: ToastService
  ) {
    this.createBrandForm = this.formBuilder.group({
      brandName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[^@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`¡¿!]+$/)
        ],
      ],
      brandDescription: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(120),
          Validators.pattern(/^[^@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`¡¿!]+$/)
        ],
      ],
    });
  }
  createBrand(){
    let brand: BrandRequest ={
      name: this.createBrandForm.value.brandName,
      description: this.createBrandForm.value.brandDescription
    }

    this.brandService.saveBrand(brand).subscribe({
      next: () => { this.toastService.showToast('Brand saved successfully', ToastConst.SUCCESS); },
      error: () => { this.toastService.showToast(this.brandService.getErrorMessage(), ToastConst.ERROR); },
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

  getErrorMessage(control: any, fieldName: string): string {
    if (control?.touched && control?.errors) {
      const firstKey = Object.keys(control.errors)[0];
      const error = control.errors[firstKey];
      return this.errorMessages[firstKey](fieldName, error);
    }
    return '';
  }

  get brandName() {
    return this.createBrandForm.get('brandName');
  }

  get brandNameError(): string {
    const control = this.createBrandForm.get('brandName');
    if (control?.hasError('required')||control?.hasError('minlength')||control?.hasError('pattern')||control?.hasError('maxlength')) {
      return 'Required a valid brand name';
    }
    return '';
  }

  get brandDescription() {
    return this.createBrandForm.get('brandDescription');
  }

  get brandDescriptionError(): string {
    const control = this.createBrandForm.get('brandDescription');
    if (control?.hasError('required')||control?.hasError('minlength')||control?.hasError('pattern')||control?.hasError('maxlength')) {
      return 'Required a valid brand description';
    }
    return '';
  }

  ngOnInit(): void {
    // empty because we don't need to do anything here
  }

}
