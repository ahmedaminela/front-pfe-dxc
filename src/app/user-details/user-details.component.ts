import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
createUserRequest: any;
  getUserById(userId: number) {
    throw new Error('Method not implemented.');
  }
  users: any[] = [];
  newUser: any = {};
  constructor() {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.error('No token found for authentication.');
      return;
    }

    const headers: { [key: string]: string } = {};
    headers['Authorization'] = `Bearer ${token}`;

    axios.get('http://localhost:8080/api/users', { headers })
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }

  deleteUser(id: number): void {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.error('No token found for authentication.');
      return;
    }

    const headers: { [key: string]: string } = {};
    headers['Authorization'] = `Bearer ${token}`;

    axios.delete(`http://localhost:8080/api/users/${id}`, { headers })
      .then(() => {
        this.users = this.users.filter(user => user.id !== id);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  }

  updateUser(id: number, user: any): void {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.error('No token found for authentication.');
      return;
    }

    const headers: { [key: string]: string } = {};
    headers['Authorization'] = `Bearer ${token}`;

    axios.put(`http://localhost:8080/api/users/${id}`, user, { headers })
      .then(response => {
        // Update the user details in the UI
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
          this.users[index] = response.data;
        }
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  }
  createUser(): void {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.error('No token found for authentication.');
      return;
    }

    const headers: { [key: string]: string } = {};
    headers['Authorization'] = `Bearer ${token}`;

    axios.post('http://localhost:8080/api/signup', this.newUser, { headers })
      .then(response => {
        console.log('User created successfully:', response.data);
        // Optionally, update the UI to display the newly created user
        // Clear the form after successful creation
        this.newUser = {};
      })
      .catch(error => {
        console.error('Error creating user:', error);
        // Optionally, handle error response and display error message
      });
  }
}
