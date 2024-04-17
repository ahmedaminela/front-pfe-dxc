import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html', // Path to your template file
  styleUrls: ['./navbar.component.css'] // Path to your CSS file
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

logout(): void {
    this.authService.logout();
  }
}
