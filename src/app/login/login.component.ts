import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { TokenService } from '../token.service'; // Import the service

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username = '';
    password = '';
    errorMessage = '';

    constructor(private router: Router, private tokenService: TokenService) {} // Inject the service

    login(): void {
        axios.post('http://localhost:8080/auth/signin', { username: this.username, password: this.password })
            .then(response => {
                const token = response.data.jwtToken;
                localStorage.setItem('jwtToken', token);
                const decodedToken = this.tokenService.decodeToken(token); // Decode the token
                if (decodedToken && decodedToken.roles.includes('Admin')) {
                    this.router.navigate(['/admin']);
                } else {
                    // Redirect to user page or dashboard as needed
                    this.router.navigate(['/dashboard']);
                }
            })
            .catch(error => {
                console.error('Login failed:', error);
                this.errorMessage = 'Login failed. Please check your credentials.';
            });
    }
    logout(): void {
        // Clear user session
        localStorage.removeItem('jwtToken');
        // Optionally, clear other user-related data
      }
}
