import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskComponent } from '../task/task.component';

import { Task } from '../task/task';

import { TaskServiceService } from '../task/task-service.service';

@Component({
  selector: 'app-tasklist',
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, TaskComponent],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})
export class TasklistComponent {
  todo: Task[] | undefined = undefined;

  receivedTask: Task | undefined = undefined;

  constructor(private taskService: TaskServiceService) {
    this.todo = taskService.getStaticTasks();
  }


  receiveTask(task: Task) {
    //this.receivedTask = task;
    window.alert(task.title);
  }
}
