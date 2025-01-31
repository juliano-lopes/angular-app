import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';

import { Task } from './task/task';

import { TaskServiceService } from './task/task-service.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
