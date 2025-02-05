import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';

import { Task } from './task/task';

import { TaskServiceService } from './task/task-service.service';
import { AuthGuard } from './services/AuthGuard.service';
import { Route, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(protected auth: AuthGuard, protected router: Router) {
    this.auth.userStateChanged$.subscribe((user) => {
      if (!user) {
        this.router.navigate(['/login']);
      }
  
    });

  }
  ngOnInit() {
  }

}
