import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    private books = [
        {
            id: 1,
            title: 'Eloquent JavaScript',
            author: 'Marijn Haverbeke',
            description: 'A modern introduction to programming',
            price: 50,
            pdfPath: '/assets/e-books/Eloquent_JavaScript.pdf'
        },
        {
            id: 2,
            title: 'AI Ethics Simplified',
            author: 'Turing Scholars',
            description: 'A comprehensive guide to understanding AI ethics and its implications in modern society.',
            price: 29.99,
            pdfPath: '/assets/e-books/testing.pdf'
        },
        {
            id: 3,
            title: 'Machine Learning 101',
            author: 'Alan M.',
            description: 'Learn the fundamentals of machine learning with practical examples and real-world applications.',
            price: 39.99,
            category: 'Technology'
        },
        {
            id: 4,
            title: 'Data Privacy Basics',
            author: 'Grace Hopper',
            description: 'Essential knowledge about data privacy, security, and best practices in the digital age.',
            price: 24.99,
            category: 'Privacy'
        },
        {
            id: 5,
            title: 'Web Development Fundamentals',
            author: 'Tim Berners-Lee',
            description: 'Master the basics of web development with this comprehensive guide.',
            price: 34.99,
            category: 'Technology'
        },
        {
            id: 6,
            title: 'Digital Marketing Strategies',
            author: 'Sarah Johnson',
            description: 'Learn effective digital marketing techniques for the modern business landscape.',
            price: 27.99,
            category: 'Marketing'
        }
    ];

    constructor() { }

    getBooks() {
        return this.books;
    }

    getBookById(id: number) {
        return this.books.find(book => book.id === id);
    }
} 