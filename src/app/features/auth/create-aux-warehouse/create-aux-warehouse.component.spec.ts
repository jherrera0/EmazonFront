import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CreateAuxWarehouseComponent } from "./create-aux-warehouse.component";
import { AuthService } from "@service/auth.service";
import { ToastService } from "@service/toast.service";
import { AbstractControl, ReactiveFormsModule } from "@angular/forms";
import { HttpResponse } from "@angular/common/http";
import { UserRequest } from "@model/user-request.model";
import { of, throwError } from "rxjs";
import { ToastConst } from "@util/toastConst";

class MockAuthService {
  createAuxWarehouse = jest.fn();
  getErrorMessage = jest.fn().mockReturnValue('Error');
}
class MockToastService{
  showToast = jest.fn();
}
describe('CreateAuxWarehouseComponent', () => {
  let component: CreateAuxWarehouseComponent;
  let fixture: ComponentFixture<CreateAuxWarehouseComponent>;
  let authService:MockAuthService;
  let toastService:MockToastService;

  beforeEach(async () => {
    authService = new MockAuthService();
    toastService = new MockToastService();

    await TestBed.configureTestingModule({
      declarations: [ CreateAuxWarehouseComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: ToastService, useValue: toastService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAuxWarehouseComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a warehouse', () => {
    const mockResponse = new HttpResponse<UserRequest>({
       status: 201,
      body:{
        name: 'test',
        lastName: 'test',
        document: '123456',
        phone: '123456',
        birthDate: new Date(2000,1,1),
        email: 'test@test.com',
        password: '123456',
      },
     });
    authService.createAuxWarehouse.mockReturnValue(of(mockResponse));

    component.createAuxWarehouseForm.setValue({
      auxWarehouseName: 'test',
      auxWarehouseLastName: 'test',
      auxWarehouseDocument: '123456',
      auxWarehousePhoneNumber: '123456',
      auxWarehouseBirthdate: new Date(2000,1,1),
      auxWarehouseEmail: 'test@test.com',
      auxWarehousePassword: '123456',
    });
    component.createAuxWarehouseForm.markAllAsTouched();
    component.createAuxWarehouse();

    expect(authService.createAuxWarehouse).toHaveBeenCalledWith({
      name: 'test',
      lastName: 'test',
      document: '123456',
      phone: '123456',
      birthDate: new Date(2000,1,1),
      email: 'test@test.com',
      password: '123456',
    });
    expect(toastService.showToast).toHaveBeenCalledWith("Auxiliar of warehouse created successfully", ToastConst.SUCCESS);

  });

  it('should set maxDate on ngOnInit', () => {
    const today = new Date().toISOString().split('T')[0];
    component.ngOnInit();
    expect(component.maxDate).toBe(today);
  });

  it('should show error toast on failed warehouse creation', () => {
    authService.createAuxWarehouse.mockReturnValue(throwError(() => new Error('Error')));

    component.createAuxWarehouseForm.setValue({
      auxWarehouseName: 'test',
      auxWarehouseLastName: 'test',
      auxWarehouseDocument: '123456',
      auxWarehousePhoneNumber: '1234567890',
      auxWarehouseBirthdate: new Date(2000, 1, 1),
      auxWarehouseEmail: 'test@test.com',
      auxWarehousePassword: '123456',
    });
    component.createAuxWarehouseForm.markAllAsTouched();
    component.createAuxWarehouse();

    expect(authService.createAuxWarehouse).toHaveBeenCalledWith({
      name: 'test',
      lastName: 'test',
      document: '123456',
      phone: '1234567890',
      birthDate: new Date(2000, 1, 1),
      email: 'test@test.com',
      password: '123456',
    });
    expect(toastService.showToast).toHaveBeenCalledWith(authService.getErrorMessage(), ToastConst.ERROR);
  });

  it('should toggle password visibility', () => {
    expect(component.hidePassword).toBe(true);
    component.showPassword();
    expect(component.hidePassword).toBe(false);
    component.showPassword();
    expect(component.hidePassword).toBe(true);
  });

  it('should enable button if form is valid', () => {
    component.createAuxWarehouseForm.setValue({
      auxWarehouseName: 'test',
      auxWarehouseLastName: 'test',
      auxWarehouseDocument: '123456',
      auxWarehousePhoneNumber: '1234567890',
      auxWarehouseBirthdate: new Date(2000, 1, 1),
      auxWarehouseEmail: 'test@test.com',
      auxWarehousePassword: '123456',
    });
    expect(component.isButtonDisabled()).toBe(false);
  });

  it('should return error message if password is required', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehousePassword');
    control?.setValue('');
    control?.markAsTouched();
    expect(component.auxWarehousePasswordError).toBe('The password is required');
  });

  it('should return empty string if password is valid', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehousePassword');
    control?.setValue('validPassword');
    control?.markAsTouched();
    expect(component.auxWarehousePasswordError).toBe('');
  });

  it('should return error message if email is required', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehouseEmail');
    control?.setValue('');
    control?.markAsTouched();
    expect(component.auxWarehouseEmailError).toBe('The email is required');
  });

  it('should return error message if email is invalid', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehouseEmail');
    control?.setValue('invalidEmail');
    control?.markAsTouched();
    expect(component.auxWarehouseEmailError).toBe('The email is invalid');
  });

  it('should return empty string if email is valid', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehouseEmail');
    control?.setValue('valid@test.com');
    control?.markAsTouched();
    expect(component.auxWarehouseEmailError).toBe('');
  });

  it('should return error message if birthdate is required', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehouseBirthdate');
    control?.setValue('');
    control?.markAsTouched();
    expect(component.auxWarehouseBirthdateError).toBe('The birthdate is required');
  });

  it('should return error message if age is invalid', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehouseBirthdate');
    control?.setValue('2010-01-01');
    control?.markAsTouched();
    expect(component.auxWarehouseBirthdateError).toBe('The age must be at least 18 years');
  });

  it('should return empty string if birthdate is valid', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehouseBirthdate');
    control?.setValue('2000-01-01');
    control?.markAsTouched();
    expect(component.auxWarehouseBirthdateError).toBe('');
  });

  it('should return error message if phone number is required', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehousePhoneNumber');
    control?.setValue('');
    control?.markAsTouched();
    expect(component.auxWarehousePhoneNumbreError).toBe('The phone number is required');
  });

  it('should return error message if phone number is too short', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehousePhoneNumber');
    control?.setValue('12345');
    control?.markAsTouched();
    expect(component.auxWarehousePhoneNumbreError).toBe('The phone number must have at least 10 characters');
  });

  it('should return error message if phone number is too long', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehousePhoneNumber');
    control?.setValue('12345678901234');
    control?.markAsTouched();
    expect(component.auxWarehousePhoneNumbreError).toBe('The phone number must have at most 13 characters');
  });

  it('should return error message if phone number pattern is invalid', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehousePhoneNumber');
    control?.setValue('+3456548798');
    control?.markAsTouched();
    expect(component.auxWarehousePhoneNumbreError).toBe('the number need a pefix valid or not have prefix');
  });

  it('should return empty string if phone number is valid', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehousePhoneNumber');
    control?.setValue('1234567890');
    control?.markAsTouched();
    expect(component.auxWarehousePhoneNumbreError).toBe('');
  });

  it('should return error message if document is required', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehouseDocument');
    control?.setValue('');
    control?.markAsTouched();
    expect(component.auxWarehouseDocumentError).toBe('The document is required');
  });

  it('should return error message if document pattern is invalid', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehouseDocument');
    control?.setValue('invalidDocument');
    control?.markAsTouched();
    expect(component.auxWarehouseDocumentError).toBe('The document needs to be a number');
  });

  it('should return empty string if document is valid', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehouseDocument');
    control?.setValue('123456');
    control?.markAsTouched();
    expect(component.auxWarehouseDocumentError).toBe('');
  });

  it('should return error message if last name is required', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehouseLastName');
    control?.setValue('');
    control?.markAsTouched();
    expect(component.auxWarehouseLastNameError).toBe('The last name is required');
  });

  it('should return error message if last name is too short', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehouseLastName');
    control?.setValue('ab');
    control?.markAsTouched();
    expect(component.auxWarehouseLastNameError).toBe('The last name must have at least 3 characters');
  });

  it('should return error message if last name pattern is invalid', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehouseLastName');
    control?.setValue('invalid@name');
    control?.markAsTouched();
    expect(component.auxWarehouseLastNameError).toBe('The last name is invalid');
  });

  it('should return empty string if last name is valid', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehouseLastName');
    control?.setValue('validName');
    control?.markAsTouched();
    expect(component.auxWarehouseLastNameError).toBe('');
  });

  it('should return error message if name is required', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehouseName');
    control?.setValue('');
    control?.markAsTouched();
    expect(component.auxWarehouseNameError).toBe('The name is required');
  });

  it('should return error message if name is too short', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehouseName');
    control?.setValue('ab');
    control?.markAsTouched();
    expect(component.auxWarehouseNameError).toBe('The name must have at least 3 characters');
  });

  it('should return error message if name pattern is invalid', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehouseName');
    control?.setValue('invalid@name');
    control?.markAsTouched();
    expect(component.auxWarehouseNameError).toBe('The name is invalid');
  });

  it('should return empty string if name is valid', () => {
    const control = component.createAuxWarehouseForm.get('auxWarehouseName');
    control?.setValue('validName');
    control?.markAsTouched();
    expect(component.auxWarehouseNameError).toBe('');
  });

  describe('validAgeValidator', () => {
    it('should return null if date is not provided', () => {
      const control = { value: null } as AbstractControl;
      const result = component.validAgeValidator(control);
      expect(result).toBeNull();
    });

    it('should return null if age is 18 or older', () => {
      const control = { value: '2000-01-01' } as AbstractControl;
      const result = component.validAgeValidator(control);
      expect(result).toBeNull();
    });

    it('should return { invalidAge: true } if age is less than 18', () => {
      const control = { value: '2010-01-01' } as AbstractControl;
      const result = component.validAgeValidator(control);
      expect(result).toEqual({ invalidAge: true });
    });

    it('should return null if age is exactly 18', () => {
      const today = new Date();
      const birthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
      const control = { value: birthDate.toISOString().split('T')[0] } as AbstractControl;
      const result = component.validAgeValidator(control);
      expect(result).toBeNull();
    });

    it('should return { invalidAge: true } if age is 17 and 11 months', () => {
      const today = new Date();
      const birthDate = new Date(today.getFullYear() - 18, today.getMonth() + 1, today.getDate());
      const control = { value: birthDate.toISOString().split('T')[0] } as AbstractControl;
      const result = component.validAgeValidator(control);
      expect(result).toEqual({ invalidAge: true });
    });
  });

});
