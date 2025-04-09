import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  name: string;
  username: string;
  email: string;
  token: string;
}

export interface UserWithPassword extends User {
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private userSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  user$ = this.userSubject.asObservable();

  private getStoredUser(): User | null {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }

  private getStoredUsers(): UserWithPassword[] {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [];
  }

  login(username: string, password: string): Observable<User | null> {
    const users = this.getStoredUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      const { password, ...userWithoutPassword } = user;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      this.userSubject.next(userWithoutPassword);
      return of(userWithoutPassword);
    }
    return of(null);
  }

  signup(name: string, email: string, username: string, password: string): Observable<boolean> {
    const users = this.getStoredUsers();

    if (users.some(u => u.username === username)) {
      return of(false);
    }

    const newUser: UserWithPassword = {
      name,
      email,
      username,
      password,
      token: 'mock-jwt-token'
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return of(true);
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  getUser(): User | null {
    return this.userSubject.value;
  }
}
