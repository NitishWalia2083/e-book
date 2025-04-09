import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  updateQuantity(bookId: number, quantity: number) {
    if (quantity >= 1) {
      this.cartService.updateQuantity(bookId, quantity);
    }
  }

  removeFromCart(bookId: number) {
    this.cartService.removeFromCart(bookId);
  }

  checkout() {
    alert('Purchase successful! Thank you for your order.');
    this.cartService.clearCart();
    this.router.navigate(['/dashboard']);
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
} 