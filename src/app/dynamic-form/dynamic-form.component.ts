import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormService } from '../form.service';
import { FormSchema } from '../interfaces';
import { CommonModule, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';

export function inputTextValidator(inputRe: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = new RegExp(inputRe).test(control.value);
    return !valid ? { forbiddenText: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgTemplateOutlet,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    CommonModule,
    MatFormFieldModule
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent {
  dynamicForm: FormGroup = this.formBuilder.group({});

  formSchema!: FormSchema;

  constructor(private formBuilder: FormBuilder, private formService: FormService) {
    this.formSchema = this.formService.getFormStructure();
    for (let prop in this.formSchema.properties) {
      this.dynamicForm.addControl(prop, new FormControl(''));
      this.dynamicForm.controls[prop].reset();
      this.dynamicForm.controls[prop].setErrors(null);
      this.dynamicForm.controls[prop].markAsUntouched();
      this.dynamicForm.controls[prop].markAsPristine();
      let validators: ValidatorFn[] = [];
      if (this.isRequired(prop)) {
        validators.push(Validators.required);
      }
      const pattern = this.formSchema.properties[prop].pattern;
      if (pattern) {
        validators.push(inputTextValidator(pattern));
        console.log(pattern);
      }
      if (validators.length > 0) {
        this.dynamicForm.controls[prop].setValidators(validators);
      }
    }
    // this.dynamicForm.markAsUntouched({onlySelf: false});
    // this.dynamicForm.markAsPristine({onlySelf: false});
    // this.dynamicForm.clearValidators();
  }

  isRequired(name: string): boolean {
    const control = this.formSchema.required.find((prop) => {
      return prop === name;
    });
    return control !== undefined;
  }

  getColumnItems(column: any, items: string[]): string[] {
    const columnItems = [];
    const content = column.content;
    for (let i = 0; i < content.length; i++) {
      columnItems.push(items[content[i]]);
    }
    return columnItems;
  }

  getFormValue() {
    return JSON.stringify(this.dynamicForm.value, null, 4);
  }
}
