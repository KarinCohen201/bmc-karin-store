import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartUpdated = new EventEmitter<any[]>(); // EventEmitter for cart updates
  private cartItemList: any[] = []; // Store items in memory

  constructor() {
    this.loadCartFromLocalStorage(); // Load cart from localStorage on initialization
  }

  private saveCartToLocalStorage() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const email = loggedInUser?.email;

    if (email) {
      const carts = JSON.parse(localStorage.getItem('carts') || '{}');
      carts[email] = this.cartItemList; // Save the current cart for the logged-in user
      localStorage.setItem('carts', JSON.stringify(carts));
    }
  }

  private loadCartFromLocalStorage() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const email = loggedInUser?.email;

    if (email) {
      const carts = JSON.parse(localStorage.getItem('carts') || '{}');
      this.cartItemList = carts[email] || []; // Load the user's cart or initialize an empty array
      this.cartUpdated.emit(this.cartItemList); // Emit the loaded cart
    }
  }

  addToCart(product: any) {
    this.cartItemList.push(product); // Add product to in-memory cart
    this.saveCartToLocalStorage(); // Save to localStorage
    this.cartUpdated.emit(this.cartItemList); // Emit updated cart
  }

  removeCartItem(product: any) {
    this.cartItemList = this.cartItemList.filter(item => item.id !== product.id); // Remove item
    this.saveCartToLocalStorage(); // Save to localStorage
    this.cartUpdated.emit(this.cartItemList); // Emit updated cart
  }

  removeAllCart() {
    this.cartItemList = []; // Clear all items
    this.saveCartToLocalStorage(); // Save to localStorage
    this.cartUpdated.emit(this.cartItemList); // Emit empty cart
  }

  getCartItems() {
    return this.cartItemList; // Return all items
  }
}
