import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component'; // Import UserDetailsComponent
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login page
  { path: 'login', component: LoginComponent }, // Login route
  { path: 'admin', component: UserDetailsComponent },
  { path: 'create-user', component: CreateUserFormComponent }, // New route for creating a new user

  // User details route

  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
