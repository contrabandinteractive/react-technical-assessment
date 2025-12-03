Submission for the Technical Assessment

## Features

### Core Features ✅
- **Authentication System**
  - User login with JWT token
  - Protected routes
  - Persistent authentication (localStorage)
  - Logout functionality

- **Product Management**
  - Browse all products
  - View product details
  - Product images and descriptions
  - Real-time product information

- **Shopping Cart**
  - Add items to cart
  - Update quantities
  - Remove items
  - Cart persistence (localStorage)
  - Cart item count display
  - Total price calculation

### User Interface
- Clean, modern design
- Responsive layout
- Loading states
- Error handling with user-friendly messages
- Navigation bar with user info
- Cart badge with item count

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

## Project Structure

```
src/
├── components/
│   ├── Cart.jsx              # Shopping cart component
│   ├── Navbar.jsx            # Navigation bar
│   ├── ProductCard.jsx       # Product card component
│   └── ProtectedRoute.jsx    # Route protection wrapper
├── pages/
│   ├── Login.jsx             # Login page
│   ├── Products.jsx          # Products listing page
│   └── ProductDetail.jsx     # Product detail page
├── context/
│   ├── AuthContext.jsx       # Authentication state management
│   └── CartContext.jsx       # Shopping cart state management
├── services/
│   └── api.js                # API client with interceptors
├── styles/
│   ├── Cart.css
│   ├── Login.css
│   ├── Navbar.css
│   ├── ProductCard.css
│   ├── ProductDetail.css
│   └── Products.css
├── App.jsx                   # Main app component with routing
├── App.css                   # App-level styles
├── main.jsx                  # Application entry point
└── index.css                 # Global styles
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:3000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

### Test Credentials
Use these credentials to log in:
- **Email**: `john.doe@example.com`
- **Password**: `password123`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Integration

The application connects to the backend API at `http://localhost:3000/api` with the following endpoints:

### Authentication
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details

### Cart (Optional)
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart

## State Management

### Authentication (AuthContext)
- User data
- JWT token
- Login/logout functions
- Protected route handling

### Shopping Cart (CartContext)
- Cart items
- Add to cart
- Update quantities
- Remove items
- Calculate totals
- Persistent storage

## Key Features Implementation

### Protected Routes
Routes are protected using the `ProtectedRoute` component that checks authentication status and redirects to login if needed.

### API Interceptors
Axios interceptors automatically attach JWT tokens to all authenticated requests.

### Local Storage
- Authentication tokens persist across sessions
- Cart data is saved locally
- Automatic rehydration on app load

### Error Handling
- Network errors
- Authentication failures
- Invalid data
- User-friendly error messages

## Styling

The application uses custom CSS with:
- CSS variables for theming
- Responsive design (mobile-friendly)
- Modern UI components
- Smooth transitions and animations
- Professional color scheme

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential features to add:
- Product search and filtering
- User profile management
- Order history
- Product reviews and ratings
- Wishlist functionality
- Payment integration
- Image zoom/gallery
- Product categories

## License

This project is part of a technical assessment.
