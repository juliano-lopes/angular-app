import { Component } from '@angular/core';
import { TaskServiceService } from '../task/task-service.service';
import { Task } from '../task/task';

@Component({
  selector: 'app-task-form',
  imports: [],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  task: Task = { title: "my task", description: "my description" };
  constructor(private taskService: TaskServiceService) {

  }
  addTask() {
    this.taskService.addTask(this.task).then(() => {
      alert("tarefa adicionada");
    }).catch((error) => {
      alert("erro ao adicionar, " + error);
    });
  }
}
