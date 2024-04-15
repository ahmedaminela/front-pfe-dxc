import { Component } from '@angular/core';
import axios from 'axios';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username: string='';
    password: string='';

    login(): void {
        axios.post('http://localhost:8080/auth/signin', { username: this.username, password: this.password })
            .then(response => {
                // Handle successful login
                console.log(response.data);
            })
            .catch(error => {
                // Handle login error
                console.error('Login failed:', error);
            });
    }
}
