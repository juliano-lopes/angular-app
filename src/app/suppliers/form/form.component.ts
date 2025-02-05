import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Supplier } from '../supplier.dto';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form',
  imports: [MatButtonModule, MatFormField, MatInput, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styles: ``
})
export class FormComponent {
  @Output() save = new EventEmitter();
  private fb = inject(FormBuilder);
  supplierForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required]
  });
  @Input()
  set supplier(supplier: Supplier) {
    this.supplierForm.setValue(supplier);
  }
  onSubmit() {
    console.log('Submit', this.supplierForm.value);
    this.save.emit(this.supplierForm.value);
  }

}
