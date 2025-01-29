import { Injectable, EventEmitter } from '@angular/core';
import { UserService } from './user.service'; // ✅ נוסיף את UserService

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartUpdated = new EventEmitter<any[]>(); 
  private cartItemList: any[] = []; 

  constructor(private userService: UserService) { 
    this.loadCartFromLocalStorage(); 
  }

  private saveCartToLocalStorage() {
    const loggedInUser = this.userService.getLoggedInUser(); 
    const email = loggedInUser?.email;

    if (email) {
      const carts = JSON.parse(localStorage.getItem('carts') || '{}');
      carts[email] = this.cartItemList; 
      localStorage.setItem('carts', JSON.stringify(carts));
    }
  }

  private loadCartFromLocalStorage() {
    const loggedInUser = this.userService.getLoggedInUser(); 
    const email = loggedInUser?.email;

    if (email) {
      const carts = JSON.parse(localStorage.getItem('carts') || '{}');
      this.cartItemList = carts[email] || []; 
      this.cartUpdated.emit(this.cartItemList); 
    }
  }

  addToCart(product: any) {
    this.cartItemList.push(product); 
    this.saveCartToLocalStorage(); 
    this.cartUpdated.emit(this.cartItemList); 
  }

  removeCartItem(product: any) {
    this.cartItemList = this.cartItemList.filter(item => item.id !== product.id); 
    this.saveCartToLocalStorage(); 
    this.cartUpdated.emit(this.cartItemList); 
  }

  removeAllCart() {
    this.cartItemList = []; 
    this.saveCartToLocalStorage(); 
    this.cartUpdated.emit(this.cartItemList); 
  }

  getCartItems() {
    return this.cartItemList; 
  }
}
