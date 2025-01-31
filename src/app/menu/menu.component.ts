import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-menu',
  imports: [MatListModule],
  template: `
      @for(item of menuItems; track item.path) {
      <a mat-list-item [href]="item.path">{{item.label}}</a>
      }
  `,
  styles: ``
})
export class MenuComponent {
  menuItems: Array<{ path: string; label: string }> = [
    {
      path: '/',
      label: 'Início'
    },
    {
      path: '/categories',
      label: 'Categorias'
    },
    {
      path: '/suppliers',
      label: 'Fornecedores'
    },
    {
      path: '/about',
      label: 'Sobre'
    },
    {
      path: '/tasks',
      label: 'Tarefas'
    }


  ];

}
