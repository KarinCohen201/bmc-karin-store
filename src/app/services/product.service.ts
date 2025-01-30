import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public productListUpdated = new EventEmitter<any>(); 
  private productList: any[] = [];

  getProducts() {
    return this.productList;
  }

  setProducts(products: any) {
    this.productList = products; 
    this.productListUpdated.emit(this.productList); 
  }
}
