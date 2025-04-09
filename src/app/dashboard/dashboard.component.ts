import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReadingProgressService } from '../services/reading-progress.service';
import { AuthService } from '../auth.service';
import { CartService } from '../services/cart.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  currentUser: any = null;
  readingProgress: any[] = [];
  availableBooks: any[] = [];

  constructor(
    private router: Router,
    private readingProgressService: ReadingProgressService,
    private authService: AuthService,
    private cartService: CartService,
    private bookService: BookService
  ) {
    this.currentUser = this.authService.getUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.availableBooks = this.bookService.getBooks();
    this.loadReadingProgress();
  }

  loadReadingProgress() {
    this.readingProgress = this.readingProgressService.getAllProgress();
  }

  getBookTitle(bookId: string): string {
    const book = this.availableBooks.find(b => b.id.toString() === bookId);
    return book ? book.title : 'Unknown Book';
  }

  readBook(bookId: number) {
    this.router.navigate(['/book', bookId]);
  }

  addToCart(book: any) {
    this.cartService.addToCart(book);
    alert(`${book.title} added to cart!`);
  }

  logout() {
    this.authService.logout();
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
