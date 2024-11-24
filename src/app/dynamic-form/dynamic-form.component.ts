import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormService } from '../form.service';
import { FormSchema } from '../interfaces';
import { CommonModule, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatListModule } from '@angular/material/list';

export function inputTextValidator(inputRe: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = new RegExp(inputRe).test(control.value);
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
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    CommonModule
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
      if (this.isRequired(prop)) {
        this.dynamicForm.controls[prop].setValidators([Validators.required]);
      }
      const pattern = this.formSchema.properties[prop].pattern;
      if (pattern) {
        this.dynamicForm.controls[prop].setValidators([inputTextValidator(pattern)]);
      }
    }
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
