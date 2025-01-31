import { Component, Input, Output, EventEmitter, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {TaskFormComponent} from '../task-form/task-form.component';
import { Task } from './task';

@Component({
  selector: 'app-task',
  imports: [CommonModule, MatCardModule, MatButtonModule, TaskFormComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  isNewTask: boolean = false;
  @Input() task: Task | undefined = undefined;
  @Output() sentTask = new EventEmitter<Task>();
  sendTask() {
    this.sentTask.emit(this.task);

  }
  toggleNewTask() {
this.isNewTask = !this.isNewTask;
  }
}
