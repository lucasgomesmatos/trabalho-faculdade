import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  title = 'app-header-crud-alunos';
  currentUrl: string;
  constructor(private location: Location) {}

  currentPath() {
    return this.location.path();
  }
}
