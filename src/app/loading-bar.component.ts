import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-loading-bar',
  imports: [MatProgressBarModule],
  template: `
  @if (visible) {
    <div aria-label="carregando categorias...">
      &nbsp;
<mat-progress-bar color="primary" mode="indeterminate"> </mat-progress-bar>
    </div>
}
  `,
  styles: ``
})
export class LoadingBarComponent {
  @Input() visible: boolean = true;

}
