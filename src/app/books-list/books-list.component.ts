import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './books-list.component.html'
})
export class BooksListComponent {
  books = [
    { id: 1, title: 'AI Ethics Simplified', author: 'Turing Scholars' },
    { id: 2, title: 'Machine Learning 101', author: 'Alan M.' },
    { id: 3, title: 'Data Privacy Basics', author: 'Grace Hopper' }
  ];
}
