# Technical Documentation

## Architecture

### Component Architecture

The application follows a component-based architecture using Angular's standalone components. Each feature is encapsulated in its own component with associated services.

### State Management

- Uses Angular Services for state management
- Implements BehaviorSubject for reactive state updates
- Local storage for persistence where appropriate

## Core Services

### AuthService

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

### BookService

```typescript
@Injectable({ providedIn: "root" })
export class BookService {
  private books: Book[] = [];

  // Methods
  getBooks(): Book[];
  getBookById(id: number): Book | undefined;
}
```

### ReadingProgressService

```typescript
@Injectable({ providedIn: "root" })
export class ReadingProgressService {
  // Methods
  saveProgress(bookId: string, page: number, line: number, category: string, totalPages: number): void;
  getProgress(bookId: string): ReadingProgress | null;
}
```

## Component Implementation

### BookDetailComponent

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

## Routing Configuration

```typescript
export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    component: LoginComponent,
    title: "Login",
  },
  {
    path: "signup",
    component: SignupComponent,
    title: "Sign Up",
  },
  {
    path: "dashboard",
    loadComponent: () => import("./dashboard/dashboard.component"),
    canActivate: [authGuard],
  },
  {
    path: "books",
    loadComponent: () => import("./books-list/books-list.component"),
    canActivate: [authGuard],
  },
  {
    path: "book/:id",
    loadComponent: () => import("./book-detail/book-detail.component"),
    canActivate: [authGuard],
  },
  {
    path: "cart",
    loadComponent: () => import("./cart/cart.component"),
    canActivate: [authGuard],
  },
];
```

## PDF Viewer Implementation

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

## Form Validation

### Login Form

```typescript
this.loginForm = this.fb.group({
  username: ["", [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z0-9]+$")]],
  password: ["", [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$")]],
});
```

### Signup Form

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

## Styling

### Tailwind Configuration

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

## Security Considerations

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

## Performance Optimization

### Lazy Loading

- Feature modules are lazy loaded
- PDF.js worker is loaded on demand
- Assets are optimized and compressed

### Caching

- Reading progress is cached in localStorage
- Book data is cached in memory
- PDF files are cached by the browser

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

## Testing

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

## Deployment

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
