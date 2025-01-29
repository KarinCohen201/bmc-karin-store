import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service'; 

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
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
          [Validators.required, this.strictEmailValidator()] 
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[A-Z]).+$/) 
          ]
        ],
        confirmPassword: ['', [Validators.required]] 
      },
      {
        validators: this.passwordMatchValidator() 
      }
    );
  }


  strictEmailValidator() {
    return (control: AbstractControl) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!control.value || emailRegex.test(control.value)) {
        return null;
      }
      return { invalidEmail: true }; 
    };
  }


  passwordMatchValidator() {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordsMismatch: true };
    };
  }


  register() {
    if (this.registrationForm.valid) {
      const email = this.registrationForm.get('email')?.value;
      const password = this.registrationForm.get('password')?.value;

      const success = this.userService.addUser({ email, password }); 

      if (success) {
        this.router.navigate(['/login']); 
      } else {
        this.userExistsError = 'User already exists!';
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
