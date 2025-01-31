import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { CategoriesItem } from '../category.dto';
@Component({
  selector: 'app-categoryform',
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatInputModule],
  templateUrl: './form.component.html',
  styles: ``
})
export class CategoryFormComponent {
  @Output() save = new EventEmitter();
  private fb = inject(FormBuilder);
  categoryForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required]
  });
  @Input()
  set category(category: CategoriesItem) {
    this.categoryForm.setValue(category);
  }
  onSubmit() {
    console.log('Submit', this.categoryForm.value);
    this.save.emit(this.categoryForm.value);
  }
}
