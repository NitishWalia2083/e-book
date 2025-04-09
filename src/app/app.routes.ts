import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'signup',
        component: SignupComponent,
        title: 'Sign Up'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: 'books',
        loadComponent: () => import('./books-list/books-list.component').then(m => m.BooksListComponent),
        canActivate: [authGuard]
    },
    {
        path: 'book/:id',
        loadComponent: () => import('./book-detail/book-detail.component').then(m => m.BookDetailComponent),
        canActivate: [authGuard]
    },
    {
        path: 'cart',
        loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent),
        canActivate: [authGuard]
    }
];


