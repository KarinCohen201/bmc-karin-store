import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartUpdated = new EventEmitter<any[]>();
  private cartItemList: any[] = [];

  private apiUrl = 'http://localhost:5000/api/cart'; // ← add this

  constructor(private userService: UserService, private http: HttpClient) {
    this.loadCartFromServer(); // ← change this
  }

  private saveCartToServer() {
    const loggedInUser = this.userService.getLoggedInUser();
    const email = loggedInUser?.email;

    if (email) {
      this.http.post(this.apiUrl, { email, items: this.cartItemList })
        .subscribe({
          next: (res) => console.log('Cart saved to server', res),
          error: (err) => console.error('Error saving cart:', err)
        });
    }
  }

  private loadCartFromServer() {
    const loggedInUser = this.userService.getLoggedInUser();
    const email = loggedInUser?.email;

    if (email) {
      this.http.get<any>(`${this.apiUrl}/${email}`)
        .subscribe({
          next: (cart) => {
            this.cartItemList = cart.items || [];
            this.cartUpdated.emit(this.cartItemList);
          },
          error: (err) => {
            console.error('No cart found (first login?)', err);
            this.cartItemList = [];
            this.cartUpdated.emit(this.cartItemList);
          }
        });
    }
  }

  addToCart(product: any) {
    this.cartItemList.push(product);
    this.saveCartToServer();
    this.cartUpdated.emit(this.cartItemList);
  }

  removeCartItem(product: any) {
    this.cartItemList = this.cartItemList.filter(item => item.id !== product.id);
    this.saveCartToServer();
    this.cartUpdated.emit(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.saveCartToServer();
    this.cartUpdated.emit(this.cartItemList);
  }

  getCartItems() {
    return this.cartItemList;
  }
}
