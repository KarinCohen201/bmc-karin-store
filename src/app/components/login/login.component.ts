import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = ''; 
  password: string = ''; 
  errorMessage: string | null = null; 

  constructor(private router: Router, private userService: UserService) {} 

  login() {
    this.errorMessage = null;

    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in both email and password.';
      return;
    }

    this.userService.loginUser(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Login successful:', res);
        localStorage.setItem('loggedInUser', JSON.stringify(res.user));
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Invalid email or password!';
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']); 
  }
}
