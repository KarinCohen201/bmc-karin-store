import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public userName: string = '';
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    const loggedInUser = this.userService.getLoggedInUser();
    this.userName = loggedInUser?.email ? loggedInUser.email.split('@')[0] : 'Guest';
  }

  goToCart() {
    this.router.navigate(['cart']);
  }


  logoutUser(): void {
    this.userService.logoutUser();
    this.router.navigate(['/login']);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

}

