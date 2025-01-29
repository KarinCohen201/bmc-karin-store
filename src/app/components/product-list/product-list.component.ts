import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent], 
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  public productList : any;
  constructor(private api: ApiService, private cartService: CartService, private router: Router){ }

  ngOnInit(): void {
    this.api.getProducts()
      .subscribe(res => {
        this.productList = res;
      })
  }
  

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

}
