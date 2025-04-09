import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
    bookId: number;
    title: string;
    price: number;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems = new BehaviorSubject<CartItem[]>(this.getStoredCart());
    cartItems$ = this.cartItems.asObservable();

    private getStoredCart(): CartItem[] {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    }

    addToCart(book: any) {
        const currentCart = this.cartItems.value;
        const existingItem = currentCart.find(item => item.bookId === book.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            currentCart.push({
                bookId: book.id,
                title: book.title,
                price: book.price,
                quantity: 1
            });
        }

        this.updateCart(currentCart);
    }

    removeFromCart(bookId: number) {
        const currentCart = this.cartItems.value.filter(item => item.bookId !== bookId);
        this.updateCart(currentCart);
    }

    updateQuantity(bookId: number, quantity: number) {
        const currentCart = this.cartItems.value;
        const item = currentCart.find(item => item.bookId === bookId);
        if (item) {
            item.quantity = quantity;
            this.updateCart(currentCart);
        }
    }

    clearCart() {
        this.updateCart([]);
    }

    getTotal(): number {
        return this.cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    private updateCart(cart: CartItem[]) {
        localStorage.setItem('cart', JSON.stringify(cart));
        this.cartItems.next(cart);
    }
} 