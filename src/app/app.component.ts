import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { AngularToastifyModule } from 'angular-toastify';
import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    RouterModule,
    AngularToastifyModule,
    ModalComponent,
  ],
})
export class AppComponent {
  title = 'app-crud-alunos';
}
