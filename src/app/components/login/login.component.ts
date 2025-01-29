import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { UserService } from '../../services/user.service'; // Import UserService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // Add CommonModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = ''; // User's email
  password: string = ''; // User's password
  errorMessage: string | null = null; // Error message to display

  constructor(private router: Router, private userService: UserService) {} // Inject UserService

  login() {
    // Reset error message
    this.errorMessage = null;

    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in both email and password.';
      return;
    }

    const user = this.userService.loginUser(this.email, this.password);
    if (user) {
      this.router.navigate(['/products']); // Navigate to the products page
    } else {
      this.errorMessage = 'Invalid email or password!';
    }
  }

  goToRegister() {
    this.router.navigate(['/register']); // Navigate to the registration page
  }
}
