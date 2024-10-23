import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputErrorHandlerComponent } from './input-error-handler.component';

describe('InputErrorHandlerComponent', () => {
  let component: InputErrorHandlerComponent;
  let fixture: ComponentFixture<InputErrorHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputErrorHandlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputErrorHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value correctly via writeValue', () => {
    const testValue = 'test';
    component.writeValue(testValue);
    expect(component.value).toBe(testValue);
  });

  it('should register onChange function correctly', () => {
    const testFn = jest.fn();
    component.registerOnChange(testFn);
    component.onChange();
    expect(testFn).toHaveBeenCalled();
  });

  it('should register onTouched function correctly', () => {
    const testFn = jest.fn();
    component.registerOnTouched(testFn);
    component.onTouched();
    expect(testFn).toHaveBeenCalled();
  });

  it('should set disabled state correctly', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBe(true);
    component.setDisabledState(false);
    expect(component.disabled).toBe(false);
  });

  it('should have default type as text', () => {
    expect(component.type).toBe('text');
  });

  it('should accept and set type input', () => {
    component.type = 'number';
    fixture.detectChanges();
    expect(component.type).toBe('number');
  });

  it('should update value and call onChange and onTouched on input event', () => {
    const testValue = 'new value';
    const inputElement = document.createElement('input');
    inputElement.value = testValue;
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: inputElement });

    const onChangeSpy = jest.spyOn(component, 'onChange');
    const onTouchedSpy = jest.spyOn(component, 'onTouched');

    component.onInput(event);

    expect(component.value).toBe(testValue);
    expect(onChangeSpy).toHaveBeenCalledWith(testValue);
    expect(onTouchedSpy).toHaveBeenCalled();
  });
});
