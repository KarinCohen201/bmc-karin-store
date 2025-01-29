import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public productListUpdated = new EventEmitter<any>(); // EventEmitter for product list updates
  private productList: any[] = [];

  getProducts() {
    return this.productList;
  }

  setProducts(products: any) {
    this.productList = products; // Update the product list
    this.productListUpdated.emit(this.productList); // Emit the updated product list
  }
}
