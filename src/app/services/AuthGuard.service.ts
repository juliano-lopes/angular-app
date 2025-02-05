import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { from, Observable, Unsubscribable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private user!: User | null;
  private error: string | null = null;
  userStateChanged$: Observable<User | null>;
  constructor(private auth: Auth, private router: Router) { // Injeta Auth e Router
    this.userStateChanged$ = new Observable<User | null>((observer) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        observer.next(user);
        this.user = user;
      });
      return unsubscribe;
    });
  }
  getUser() {
    return this.user;
  }
  getError() {
    return this.error;
  }
  login(email: string, password: string) {
    this.error = null; // Limpa qualquer erro anterior
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // O usuário logou com sucesso
        this.user = userCredential.user;
        alert('login realizado');
        this.router.navigate(['/']); // Redireciona para a página principal após o login
      })
      .catch((error) => {
        // Ocorreu um erro durante o login
        this.error = error.message; // Exibe a mensagem de erro
        console.error("Erro ao logar:", error);

      });
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        // O usuário fez logout com sucesso
        alert('logout realizado');
        this.user = null;
        this.router.navigate(['/login']); // Redireciona para a página de login após o logout
      })
      .catch((error) => {
        // Ocorreu um erro durante o logout
        console.error("Erro ao deslogar:", error);
      });
  }


  canActivate(): boolean {

    return !!this.auth.currentUser;
  }
}