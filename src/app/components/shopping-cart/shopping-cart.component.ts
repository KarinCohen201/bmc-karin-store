import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();

    this.cartService.cartUpdated.subscribe((updatedCart) => {
      this.cartItems = updatedCart; 
    });
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  removeFromCart(item: any) {
    this.cartService.removeCartItem(item); 
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0); 
  }

  clearCart() {
    this.cartService.removeAllCart(); 
    console.log('Cart has been cleared!');
  }
}
