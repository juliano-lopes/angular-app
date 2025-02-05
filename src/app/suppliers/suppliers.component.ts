import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, getAuth, onAuthStateChanged, User } from '@angular/fire/auth';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { AuthGuard } from '../services/AuthGuard.service';
import { lastValueFrom, Observable } from 'rxjs';
@Component({
  selector: 'app-suppliers',
  imports: [MatCardModule, RouterOutlet, CommonModule],
  templateUrl: './suppliers.component.html',
  styles: ``
})
export class SuppliersComponent {
  constructor(protected auth: AuthGuard) {
    
  }
  }
