import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormService } from '../form.service';
import { FormSchema } from '../interfaces';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

export function inputTextValidator(inputRe: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = new RegExp(control.value).test(control.value);
    return forbidden ? { forbiddenText: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgTemplateOutlet,
    ReactiveFormsModule
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {
  dynamicForm: FormGroup = this.formBuilder.group({});

  formSchema!: FormSchema;

  constructor(private formBuilder: FormBuilder, private formService: FormService) {
    this.formSchema = this.formService.getFormStructure();
    for (let prop in this.formSchema.properties) {
      this.dynamicForm.addControl(prop, new FormControl(''));
      if (this.isPropRequired(prop)) {
        this.dynamicForm.controls[prop].setValidators([Validators.required]);
      }
    }
  }

  isPropRequired(name: string): boolean {
    const control = this.formSchema.required.find((prop) => {
      return prop === name;
    });
    return control !== undefined;
  }

  onSubmit() {
    console.log(this.dynamicForm.value);
  }
}
