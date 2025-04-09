# E-Book Dashboard Application Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Features](#features)
4. [Technical Stack](#technical-stack)
5. [Project Structure](#project-structure)
6. [Authentication System](#authentication-system)
7. [Book Management](#book-management)
8. [PDF Viewer](#pdf-viewer)
9. [Reading Progress Tracking](#reading-progress-tracking)
10. [Shopping Cart](#shopping-cart)
11. [UI/UX Design](#uiux-design)
12. [Security Implementation](#security-implementation)
13. [Performance Optimization](#performance-optimization)
14. [Error Handling](#error-handling)
15. [Testing Strategy](#testing-strategy)
16. [Deployment Guide](#deployment-guide)
17. [Development Workflow](#development-workflow)
18. [API Documentation](#api-documentation)
19. [Troubleshooting](#troubleshooting)
20. [Future Enhancements](#future-enhancements)

## Introduction

The E-Book Dashboard is a modern web application built with Angular that allows users to browse, read, and manage digital books. The application provides a seamless experience for users to discover, purchase, and read e-books with features like progress tracking and a responsive design.

### Purpose

This documentation provides comprehensive information about the E-Book Dashboard application, including its architecture, features, implementation details, and development guidelines.

### Target Audience

- Developers working on the application
- Project managers and stakeholders
- Quality assurance engineers
- System administrators responsible for deployment

## System Architecture

### Component Architecture

The application follows a component-based architecture using Angular's standalone components. Each feature is encapsulated in its own component with associated services.

### State Management

- Uses Angular Services for state management
- Implements BehaviorSubject for reactive state updates
- Local storage for persistence where appropriate

### Data Flow

```
User Interface (Components) → Services → Data Storage (LocalStorage/API)
```

### Module Organization

- Feature-based module organization
- Lazy loading for improved performance
- Shared modules for common functionality

## Features

### User Authentication

- Secure login and registration
- Password recovery
- Session management
- Role-based access control

### Book Catalog

- Browse available books
- Search and filter functionality
- Book categorization
- Detailed book information

### PDF Viewer

- Page navigation
- Zoom controls
- Progress tracking
- Responsive layout

### Reading Progress

- Track reading progress
- Resume from last position
- Reading statistics
- Bookmarking

### Shopping Cart

- Add/remove books
- Quantity management
- Price calculation
- Checkout process

### User Profile

- Personal information management
- Reading history
- Purchased books
- Preferences

## Technical Stack

### Frontend

- **Framework**: Angular
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Angular Services
- **Routing**: Angular Router
- **Form Handling**: Reactive Forms

### PDF Handling

- **Library**: PDF.js
- **Integration**: ng2-pdf-viewer

### Authentication

- **Method**: JWT-based authentication
- **Storage**: LocalStorage

### Development Tools

- **Package Manager**: npm
- **Build Tool**: Angular CLI
- **Version Control**: Git
- **Testing**: Jasmine/Karma

## Project Structure

```
ebook-dashboard/
├── src/
│   ├── app/
│   │   ├── auth/                 # Authentication components
│   │   │   ├── login/            # Login component
│   │   │   └── signup/           # Signup component
│   │   ├── book-detail/          # Book viewer component
│   │   ├── books-list/           # Book catalog component
│   │   ├── cart/                 # Shopping cart component
│   │   ├── dashboard/            # Main dashboard component
│   │   ├── pipes/                # Custom Angular pipes
│   │   ├── services/             # Application services
│   │   │   ├── auth.service.ts   # Authentication service
│   │   │   ├── book.service.ts   # Book management service
│   │   │   └── reading-progress.service.ts # Reading progress service
│   │   ├── shared/               # Shared components
│   │   ├── app.component.ts      # Root component
│   │   ├── app.config.ts         # Application configuration
│   │   └── app.routes.ts         # Route definitions
│   ├── assets/
│   │   ├── e-books/              # PDF files
│   │   ├── images/               # Image assets
│   │   └── pdfjs/                # PDF.js files
│   └── environments/             # Environment configurations
```

## Authentication System

### Components

#### LoginComponent

Handles user login with the following features:

- Username/password authentication
- Form validation
- Error handling
- Remember me functionality

#### SignupComponent

Manages user registration with:

- Personal information collection
- Password strength validation
- Username availability check
- Email verification

### Services

#### AuthService

```typescript
@Injectable({ providedIn: "root" })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  // Methods
  login(username: string, password: string): Observable<User | null>;
  signup(name: string, email: string, username: string, password: string): Observable<boolean>;
  logout(): void;
  isLoggedIn(): boolean;
  getUser(): User | null;
}
```

### Guards

#### AuthGuard

Protects routes requiring authentication:

```typescript
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  router.navigate(["/login"]);
  return false;
};
```

### Form Validation

#### Login Form

```typescript
this.loginForm = this.fb.group({
  username: ["", [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z0-9]+$")]],
  password: ["", [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$")]],
});
```

#### Signup Form

```typescript
this.signupForm = this.fb.group(
  {
    name: ["", [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z ]+$")]],
    email: ["", [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")]],
    username: ["", [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z0-9]+$")]],
    password: ["", [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$")]],
    confirmPassword: ["", [Validators.required]],
  },
  { validator: this.passwordMatchValidator }
);
```

## Book Management

### Components

#### BooksListComponent

Displays available books with:

- Grid/list view options
- Filtering and sorting
- Pagination
- Search functionality

#### BookDetailComponent

Shows book details and PDF viewer:

```typescript
@Component({
  selector: "app-book-detail",
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
  templateUrl: "./book-detail.component.html",
})
export class BookDetailComponent implements OnInit {
  @ViewChild("pdfViewer") pdfViewer: any;
  book: any;
  pdfSrc: string = "";
  currentPage = 1;
  totalPages = 0;
  progressPercentage = 0;

  // Methods
  onPageChange(page: number): void;
  onLoadComplete(pdf: any): void;
  onError(error: any): void;
  private updateProgress(): void;
  private saveProgress(): void;
  private loadReadingProgress(): void;
}
```

### Services

#### BookService

Manages book data and operations:

```typescript
@Injectable({ providedIn: "root" })
export class BookService {
  private books: Book[] = [];

  // Methods
  getBooks(): Book[];
  getBookById(id: number): Book | undefined;
}
```

### Book Data Structure

```typescript
interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  pdfPath?: string;
  category?: string;
}
```

## PDF Viewer

### Features

- Page navigation
- Zoom controls
- Progress tracking
- Responsive layout

### Configuration

```typescript
// PDF.js configuration in index.html
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script>
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
</script>
```

### Component Usage

```html
<pdf-viewer [src]="pdfSrc" [page]="currentPage" [original-size]="true" [show-all]="true" [zoom]="1" (pageChange)="onPageChange($event)" (after-load-complete)="onLoadComplete($event)" (error)="onError($event)" style="width: 100%; height: 100%;"> </pdf-viewer>
```

### PDF Worker Configuration

The application uses a local copy of the PDF.js worker file located at `assets/pdf.worker.js`. This file is essential for PDF rendering and processing.

## Reading Progress Tracking

### Components

- Progress bar
- Page counter
- Last read timestamp

### Services

#### ReadingProgressService

Manages reading progress:

```typescript
@Injectable({ providedIn: "root" })
export class ReadingProgressService {
  // Methods
  saveProgress(bookId: string, page: number, line: number, category: string, totalPages: number): void;
  getProgress(bookId: string): ReadingProgress | null;
}
```

### Progress Data Structure

```typescript
interface ReadingProgress {
  bookId: string;
  lastPage: number;
  lastLine: number;
  category: string;
  totalPages: number;
  progressPercentage: number;
  lastReadTimestamp: string;
}
```

## Shopping Cart

### Features

- Add/remove books
- Quantity management
- Price calculation
- Checkout process

### Components

#### CartComponent

Manages cart interface with:

- Item listing
- Quantity adjustment
- Price calculation
- Checkout button

### Cart Data Structure

```typescript
interface CartItem {
  bookId: number;
  title: string;
  price: number;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  total: number;
}
```

## UI/UX Design

### Styling

#### Tailwind Configuration

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        "background-dark": "#1F2937",
        "text-primary": "#111827",
        "text-secondary": "#4B5563",
      },
    },
  },
  plugins: [],
};
```

### Responsive Design

- Mobile-first approach
- Breakpoints for different screen sizes
- Flexible layouts

### Theme Support

- Light/dark mode
- Theme switching
- Consistent color palette

## Security Implementation

### Authentication

- JWT-based authentication
- Token storage in localStorage
- Route protection with AuthGuard
- Password validation with strong requirements

### Data Protection

- Input sanitization
- XSS prevention
- CSRF protection
- Secure password handling

### Best Practices

- HTTPS for all communications
- Secure headers
- Content Security Policy
- Regular security audits

## Performance Optimization

### Lazy Loading

- Feature modules are lazy loaded
- PDF.js worker is loaded on demand
- Assets are optimized and compressed

### Caching

- Reading progress is cached in localStorage
- Book data is cached in memory
- PDF files are cached by the browser

### Code Splitting

- Route-based code splitting
- Vendor bundle optimization
- Tree shaking

## Error Handling

### Global Error Handling

```typescript
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error) {
    console.error("An error occurred:", error);
    // Implement error reporting/logging
  }
}
```

### Component Error Handling

```typescript
onError(error: any) {
  console.error('PDF Error:', error);
  this.errorMessage = 'Error loading PDF. Please try again later.';
  this.isLoading = false;
}
```

### Error Types

- Network errors
- Authentication errors
- PDF loading errors
- Form validation errors

## Testing Strategy

### Unit Tests

```typescript
describe("AuthService", () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
```

### Component Tests

```typescript
describe("BookDetailComponent", () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
```

### Testing Tools

- Jasmine for unit testing
- Karma for test running
- Cypress for E2E testing
- Jest for component testing

## Deployment Guide

### Build Configuration

```json
{
  "configurations": {
    "production": {
      "budgets": [
        {
          "type": "initial",
          "maximumWarning": "2mb",
          "maximumError": "5mb"
        }
      ],
      "outputHashing": "all"
    },
    "development": {
      "buildOptimizer": false,
      "optimization": false,
      "vendorChunk": true,
      "extractLicenses": false,
      "sourceMap": true,
      "namedChunks": true
    }
  }
}
```

### Environment Configuration

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000",
  pdfWorkerUrl: "assets/pdf.worker.js",
};
```

### Deployment Steps

1. Build the application
   ```bash
   ng build --configuration production
   ```
2. Deploy to web server
3. Configure server settings
4. Set up SSL certificate
5. Configure domain and DNS

## Development Workflow

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (v15 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone [repository-url]
   ```
2. Install dependencies
   ```bash
   cd ebook-dashboard
   npm install
   ```
3. Start the development server
   ```bash
   ng serve
   ```
4. Open your browser and navigate to `http://localhost:4200`

### Code Style

- Follow Angular style guide
- Use TypeScript strict mode
- Implement proper error handling
- Write unit tests for components and services

### Best Practices

- Use lazy loading for feature modules
- Implement proper error boundaries
- Follow SOLID principles
- Use proper typing for all variables and functions
- Implement proper security measures

### Version Control

- Git for version control
- Feature branch workflow
- Pull request reviews
- Semantic versioning

## API Documentation

### Authentication API

- POST /api/auth/login
- POST /api/auth/signup
- POST /api/auth/logout
- GET /api/auth/user

### Book API

- GET /api/books
- GET /api/books/:id
- GET /api/books/category/:category

### Reading Progress API

- POST /api/progress
- GET /api/progress/:bookId

### Cart API

- GET /api/cart
- POST /api/cart/add
- POST /api/cart/remove
- POST /api/cart/checkout

## Troubleshooting

### Common Issues

1. PDF not loading

   - Check if PDF file exists
   - Verify PDF.js worker configuration
   - Clear browser cache

2. Authentication issues

   - Check token expiration
   - Verify credentials
   - Clear localStorage

3. Performance issues
   - Check network connectivity
   - Reduce bundle size
   - Optimize images

### Debugging Tools

- Browser DevTools
- Angular DevTools
- Network monitoring
- Console logging

## Future Enhancements

### Planned Features

1. Offline reading mode
2. Social sharing
3. Reading notes and highlights
4. Advanced search with filters
5. Recommendation system

### Technical Improvements

1. Server-side rendering
2. Progressive Web App
3. Micro-frontend architecture
4. Enhanced analytics
5. A/B testing framework

---

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
