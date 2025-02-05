import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router'; // Importe o Router
import { AuthGuard } from '../services/AuthGuard.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  template: `
    @if(!(auth.userStateChanged$|async)) {
      <div>
      <h2>Login</h2>
      <form (ngSubmit)="login()">
        <input name="emailControle"#emailControle="ngModel" type="email" [(ngModel)]="email" placeholder="Email">
        <input name="passControle" #passControle="ngModel" type="password" [(ngModel)]="password" placeholder="Password">
        <button type="submit">Login</button>
    </form>    
    </div>
    }
    @if(auth.getError()) {
        <div aria-label="polite" >Erro ao logar: {{auth.getError()}}</div>
      }

  `,
  styles: ``
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(protected auth: AuthGuard, protected router: Router) { // Injeta Auth e Router
this.auth.userStateChanged$.subscribe((user) => {
if(user) {
  this.router.navigate(['/']);
}
});
  }
  ngOnInit(): void {

  }

  login() {
    this.auth.login(this.email, this.password);
  }

}