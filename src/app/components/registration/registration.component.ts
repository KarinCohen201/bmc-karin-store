import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service'; // Import UserService

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule and CommonModule
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  userExistsError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    // Create the form with validation rules
    this.registrationForm = this.fb.group(
      {
        email: [
          '', 
          [Validators.required, this.strictEmailValidator()] // Use a custom email validator
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[A-Z]).+$/) // At least one uppercase letter
          ]
        ],
        confirmPassword: ['', [Validators.required]] // Confirm password field with required validation
      },
      {
        validators: this.passwordMatchValidator() // Attach passwordMatchValidator to the form group
      }
    );
  }

  // Custom email validator for stricter validation
  strictEmailValidator() {
    return (control: AbstractControl) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!control.value || emailRegex.test(control.value)) {
        return null; // Valid email
      }
      return { invalidEmail: true }; // Invalid email
    };
  }

  // Check if passwords match
  passwordMatchValidator() {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordsMismatch: true };
    };
  }

  // Handle form submission
  register() {
    if (this.registrationForm.valid) {
      const email = this.registrationForm.get('email')?.value;
      const password = this.registrationForm.get('password')?.value;

      const success = this.userService.addUser({ email, password }); // Add the user

      if (success) {
        this.router.navigate(['/login']); // Navigate to the login page
      } else {
        this.userExistsError = 'User already exists!';
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
