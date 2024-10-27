import { AuthService } from './../../../core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '@service/toast.service';
import { ToastConst } from '@util/toastConst';

@Component({
  selector: 'app-create-aux-warehouse',
  templateUrl: './create-aux-warehouse.component.html',
  styleUrls: ['./create-aux-warehouse.component.scss']
})
export class CreateAuxWarehouseComponent implements OnInit {
  public createAuxWarehouseForm: FormGroup;
  public maxDate: string = "";
  public hidePassword: boolean = true;
  constructor(private readonly formBuilder:FormBuilder,
    private readonly authService:AuthService,
    private readonly toastService:ToastService,
  ) {
    this.createAuxWarehouseForm = this.formBuilder.group({
      auxWarehouseName: [
        '',
        [Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[^@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`¡¿!]+$/),
        ],
      ],

      auxWarehouseLastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[^@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`¡¿!]+$/),
        ]],

      auxWarehouseDocument: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+$/)
        ]],
      auxWarehousePhoneNumber: [
        '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern(/^\d{10}$|^\+\d{11,12}$/)
      ]],
      auxWarehouseBirthdate: [
        '',
        [
          Validators.required,
          this.validAgeValidator
        ]],
      auxWarehouseEmail: [
        '',
        [
          Validators.required,
          Validators.email
        ]],
      auxWarehousePassword: [
        '',
        [
          Validators.required,
        ]
      ]
    });
  }

  ngOnInit(): void {
    this.maxDate = new Date().toISOString().split('T')[0];
  }

  showPassword(){
    this.hidePassword = !this.hidePassword;
  }

  createAuxWarehouse(){
    let auxWarehouse = {
      name: this.createAuxWarehouseForm.get('auxWarehouseName')?.value,
      lastName: this.createAuxWarehouseForm.get('auxWarehouseLastName')?.value,
      document: this.createAuxWarehouseForm.get('auxWarehouseDocument')?.value,
      phone: this.createAuxWarehouseForm.get('auxWarehousePhoneNumber')?.value,
      birthDate: this.createAuxWarehouseForm.get('auxWarehouseBirthdate')?.value,
      email: this.createAuxWarehouseForm.get('auxWarehouseEmail')?.value,
      password: this.createAuxWarehouseForm.get('auxWarehousePassword')?.value
    }
    this.authService.createAuxWarehouse(auxWarehouse).subscribe({
      next: () => {this.toastService.showToast('Auxiliar of warehouse created successfully', ToastConst.SUCCESS);},
      error: () => { this.toastService.showToast(this.authService.getErrorMessage(), ToastConst.ERROR); }
    });
  }

  isButtonDisabled(){
    return this.createAuxWarehouseForm.invalid;
  }

  get auxWarehouseNameError(){
    const control = this.createAuxWarehouseForm.get('auxWarehouseName');
    if (control?.hasError('required')){
      return 'The name is required';
    }
    if (control?.hasError('minlength')){
      return 'The name must have at least 3 characters';
    }
    if (control?.hasError('pattern')){
      return 'The name is invalid';
    }
    return '';
  }

  get auxWarehouseLastNameError(){
    const control = this.createAuxWarehouseForm.get('auxWarehouseLastName');
    if (control?.hasError('required')){
      return 'The last name is required';
    }
    if (control?.hasError('minlength')){
      return 'The last name must have at least 3 characters';
    }
    if (control?.hasError('pattern')){
      return 'The last name is invalid';
    }
    return '';
  }

  get auxWarehouseDocumentError(){
    const control = this.createAuxWarehouseForm.get('auxWarehouseDocument');
    if (control?.hasError('required')){
      return 'The document is required';
    }
    if (control?.hasError('pattern')){
      return 'The document needs to be a number';
    }
    return '';
  }

  get auxWarehousePhoneNumbreError(){
    const control = this.createAuxWarehouseForm.get('auxWarehousePhoneNumber');
    if (control?.hasError('required')){
      return 'The phone number is required';
    }
    if (control?.hasError('minlength')){
      return 'The phone number must have at least 10 characters';
    }
    if (control?.hasError('maxlength')){
      return 'The phone number must have at most 13 characters';
    }
    if (control?.hasError('pattern')){
      return 'the number need a pefix valid or not have prefix';
    }
    return '';
  }

  get auxWarehouseBirthdateError(){
    const control = this.createAuxWarehouseForm.get('auxWarehouseBirthdate');
    if (control?.hasError('required')){
      return 'The birthdate is required';
    }
    if (control?.hasError('invalidAge')){
      return 'The age must be at least 18 years';
    }
    return '';
  }

  get auxWarehouseEmailError(){
    const control = this.createAuxWarehouseForm.get('auxWarehouseEmail');
    if (control?.hasError('required')){
      return 'The email is required';
    }
    if (control?.hasError('email')){
      return 'The email is invalid';
    }
    return '';
  }

  get auxWarehousePasswordError(){
    const control = this.createAuxWarehouseForm.get('auxWarehousePassword');
    if (control?.hasError('required')){
      return 'The password is required';
    }
    return '';
  }

  validAgeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const date = control.value;
    if (!date) {
      return null;
    }
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18 ? null : { 'invalidAge': true };
  }
}
