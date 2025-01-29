import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  public userName: string = '';
  constructor(private router: Router, private userService: UserService) { }

  goToCart() {
    this.router.navigate(['cart']);
  }


  logoutUser(): void {
    this.userService.logoutUser(); // Call the logout function in UserService
    this.router.navigate(['/login']); // Navigate to the login page after logout
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  ngOnInit(): void {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const email = loggedInUser?.email;

    if (email) {
      this.userName = email.split('@')[0]; 
    } else {
      this.userName = 'Guest'; 
    }
  }

}

