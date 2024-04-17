import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
})
export class CreateUserFormComponent {
  newUser: any = {};
  userData: any = {}; // Initialize userData as an empty object
  router: any;

  createUser(): void {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.error('No token found for authentication.');
      return;
    }

    const headers: { [key: string]: string } = {};
    headers['Authorization'] = `Bearer ${token}`;

    axios.post('http://localhost:8080/auth/signup', this.userData, { headers })
      .then(response => {
        console.log('User created successfully:', response.data);
        // Optionally, update the UI to display the newly created user
        // Clear the form after successful creation
        this.userData = {}; // Clear userData after successful creation
        this.router.navigate(['/admin']);

      })
      .catch(error => {
        console.error('Error creating user:', error);
        // Optionally, handle error response and display error message
      });
  }
}
