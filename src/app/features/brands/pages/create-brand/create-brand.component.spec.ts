import { BrandRequest } from "@model/brand-request.model";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { of, throwError } from "rxjs";
import { CreateBrandComponent } from "./create-brand.component";
import { BrandService } from "../../../../core/service/brand.service";
import { ToastService } from "@service/toast.service";
import { HttpResponse } from "@angular/common/http";

class MockBrandService {
  saveBrand = jest.fn();
  getErrorMessage = jest.fn().mockReturnValue("Error saving brand");
}

class MockToastService {
  showToast = jest.fn();
}

describe("CreateBrandComponent", () => {
  let component: CreateBrandComponent;
  let fixture: ComponentFixture<CreateBrandComponent>;
  let brandService: MockBrandService;
  let toastService: MockToastService;

  beforeEach(async () => {
    brandService = new MockBrandService();
    toastService = new MockToastService();

    await TestBed.configureTestingModule({
      declarations: [CreateBrandComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: BrandService, useValue: brandService },
        { provide: ToastService, useValue: toastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBrandComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize the form correctly", () => {
    expect(component.createBrandForm).toBeTruthy();
    expect(component.createBrandForm.get("brandName")).toBeTruthy();
    expect(component.createBrandForm.get("brandDescription")).toBeTruthy();
  });

  it("should create a brand successfully", () => {
    const mockResponse = new HttpResponse<BrandRequest>({
        status: 201,
      body: { name: "Test Brand", description: "Test Description" },
    });
    brandService.saveBrand.mockReturnValue(of(mockResponse));

    component.createBrandForm.setValue({
      brandName: "Test Brand",
      brandDescription: "Test Description",
    });

    component.createBrand();

    expect(brandService.saveBrand).toHaveBeenCalledWith({
      name: "Test Brand",
      description: "Test Description",
    });
    expect(toastService.showToast).toHaveBeenCalledWith(
      "Brand saved successfully", "success"
    );
  });

  it("should handle error when saving a brand", () => {
    brandService.saveBrand.mockReturnValue(
      throwError(() => new Error("Error saving brand"))
    );

    component.createBrandForm.setValue({
      brandName: "Test Brand",
      brandDescription: "Test Description",
    });

    component.createBrand();

    expect(brandService.saveBrand).toHaveBeenCalledWith({
      name: "Test Brand",
      description: "Test Description",
    });
    expect(toastService.showToast).toHaveBeenCalledWith(
      "Error saving brand", "error"
    );
  });


  it('should return correct error message for brandName with required', () => {
    component.createBrandForm.get('brandName')?.setErrors({ required: true });
    expect(component.brandNameError).toBe('Required a valid brand name');
  });

  it('should return correct error message for brandName with min requires', () => {
    component.createBrandForm.get('brandName')?.setErrors({ minlength: { requiredLength: 3, actualLength: 1 } });
    expect(component.brandNameError).toBe('Brand name must be at least 3 characters');
  });

  it('should return correct error message for brandName with max requires', () => {
    component.createBrandForm.get('brandName')?.setErrors({ maxlength: { requiredLength: 50, actualLength: 65 } });
    expect(component.brandNameError).toBe('Brand name must be at most 50 characters');
  });

  it('should return correct error message for brandName with pattern', () => {
    component.createBrandForm.get('brandName')?.setErrors({ pattern: true });
    expect(component.brandNameError).toBe('Brand name contains forbidden characters');
  });


  it('should not return error message for brandName', () => {
    component.createBrandForm.get('brandName')?.setErrors(null);
    expect(component.brandNameError).toBe('');
  });

  it('should return correct error message for brandDescription with min requires', () => {
    component.createBrandForm.get('brandDescription')?.setErrors({ minlength: { requiredLength: 3, actualLength: 1 } });
    expect(component.brandDescriptionError).toBe('Brand description must be at least 3 characters');
  });

  it('should return correct error message for brandDescription with max requires', () => {
    component.createBrandForm.get('brandDescription')?.setErrors({ maxlength: { requiredLength: 50, actualLength: 65 } });
    expect(component.brandDescriptionError).toBe('Brand description must be at most 120 characters');
  });

  it('should return correct error message for brandDescription with pattern', () => {
    component.createBrandForm.get('brandDescription')?.setErrors({ pattern: true });
    expect(component.brandDescriptionError).toBe('Brand description contains forbidden characters');
  });

  it('should return correct error message for brandDescription with required', () => {
    component.createBrandForm.get('brandDescription')?.setErrors({ required: true });
    expect(component.brandDescriptionError).toBe('Required a valid brand description');
  });



  it('should not return error message for brandDescription', () => {
    component.createBrandForm.get('brandDescription')?.setErrors(null);
    expect(component.brandDescriptionError).toBe('');
  });

  it('should return correct error message for required error', () => {
    const control = new FormControl();
    control.setErrors({ required: true });
    control.markAsTouched();
    const message = component.getErrorMessage(control, 'Brand Name');
    expect(message).toBe('Brand Name is required.');
  });
  it('should return correct error message for minlength error', () => {
    const control = new FormControl();
    control.setErrors({ minlength: { requiredLength: 3, actualLength: 1 } });
    control.markAsTouched();
    const message = component.getErrorMessage(control, 'brand Name');
    expect(message).toBe('brand Name must be at least 3 characters.');
  });

  it('should return correct error message for maxlength error', () => {
    const control = new FormControl();
    control.setErrors({ maxlength: { requiredLength: 50, actualLength: 65 } });
    control.markAsTouched();
    const message = component.getErrorMessage(control, 'brand Name');
    expect(message).toBe('brand Name must be at most 50 characters.');
  });

  it('should return correct error message for pattern error', () => {
    const control = new FormControl();
    control.setErrors({ pattern: true });
    control.markAsTouched();
    const message = component.getErrorMessage(control, 'Brand Name');
    expect(message).toBe('Brand Name contains forbidden characters.');
  });

  it('should return empty string if control has no errors', () => {
    const control = new FormControl();
    control.markAsTouched();
    const message = component.getErrorMessage(control, 'Brand Name');
    expect(message).toBe('');
  });

  it('should return the FormControl for brandyName', () => {
    const control = component.brandName;
    expect(control).toBe(component.createBrandForm.get('brandName'));
  });

  it('should return null if brandName control does not exist', () => {
    component.createBrandForm.removeControl('brandName');
    const control = component.brandName;
    expect(control).toBeNull();
  });

  it('should return the FormControl for brandDescription', () => {
    const control = component.brandDescription;
    expect(control).toBe(component.createBrandForm.get('brandDescription'));
  });

  it('should return null if brandDescription control does not exist', () => {
    component.createBrandForm.removeControl('brandDescription');
    const control = component.brandDescription;
    expect(control).toBeNull();
  });

});
