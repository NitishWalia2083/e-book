# E-Book Dashboard

A modern web application built with Angular for managing and reading digital books. This application provides a seamless experience for users to discover, purchase, and read e-books with features like progress tracking and a responsive design.

## Features

- Secure user authentication (login/signup)
- PDF viewer with page navigation and zoom controls
- Reading progress tracking
- Shopping cart functionality
- Responsive design for all devices

## Tech Stack

- **Frontend Framework**: Angular 19.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PDF Handling**: PDF.js
- **State Management**: Angular Services
- **Authentication**: JWT-based
- **Build Tool**: Angular CLI
- **Package Manager**: npm

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI 

## Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/ebook-dashboard.git
cd ebook-dashboard
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
ebook-dashboard/
├── src/
│   ├── app/
│   │   ├── auth/                 # Authentication components
│   │   ├── book-detail/          # Book viewer component
│   │   ├── books-list/           # Book catalog component
│   │   ├── cart/                 # Shopping cart component
│   │   ├── dashboard/            # Main dashboard component
│   │   ├── services/             # Application services
│   │   └── shared/               # Shared components
│   ├── assets/
│   │   ├── e-books/              # PDF files
│   │   └── images/               # Image assets
│   └── environments/             # Environment configurations
```

## API Integration

The application integrates with the following APIs:

- **Authentication API**: Handles user registration and login
- **Book API**: Manages book catalog and details

### API Endpoints

```typescript
// Authentication
POST /api/auth/login
POST /api/auth/register

// Books
GET /api/books
GET /api/books/:id

// Cart & Payments
POST /api/cart/add
POST /api/cart/checkout
```
## Usage

### Authentication

1. Navigate to the login page
2. Create an account using the signup form
3. Log in with your credentials

### Browsing Books

1. Access the books list from the dashboard
2. Use search and filter options to find books
3. Click on a book to view details

### Reading Books

1. Select a book to open the PDF viewer
2. Use navigation controls to move between pages
3. Track your reading progress automatically

### Shopping Cart

1. Add books to your cart
2. Review your selections
3. Complete the purchase process

## Development

### Code Style

- Follow Angular style guide
- Use TypeScript strict mode
- Implement proper error handling

```

2. Deploy the contents of the `dist` folder to your web server

3. Configure your web server to:
   - Serve static files
   - Handle client-side routing
   - Enable HTTPS
   - Set up proper caching


```

## Security

- All routes are protected with authentication
- Passwords are securely hashed
- JWT tokens are used for session management
- HTTPS is enforced in production

## Performance

- Lazy loading for feature modules
- Optimized bundle size
- Efficient PDF rendering
- Caching strategies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)



