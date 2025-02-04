# E-Commerce App

## Overview
This is an Angular-based e-commerce web application that includes user authentication, product listing and a shopping cart. The project is structured with components, services, and guards to ensure a modular and maintainable codebase.

## Features
- User Authentication: Registration and login functionality
- Product Listing: Display products dynamically
- Shopping Cart: Add and remove items
- Guards: Protect routes for authenticated users
- Services: API handling and state management

## Installation

1. Clone the repository:
   ```sh
   git clone <https://github.com/KarinCohen201/bmc-karin-store/tree/main>
   cd app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Install Playwright for end-to-end testing:
    ```sh
    npx playwright install
    ``` 

4. Run the application:
   ```sh
   ng serve
   ```
   The application will be available at `http://localhost:4200/`

## Project Structure
```
app/
 ├── app.component.*         # Root application component
 ├── app.config.*            # Configuration files
 ├── app.routes.*            # Routing configuration
 │
 ├── components/             # UI Components
 │   ├── header/             # Header component
 │   ├── login/              # Login component
 │   ├── product-list/       # Product listing component
 │   ├── registration/       # User registration component
 │   ├── shopping-cart/      # Shopping cart component
 │
 ├── guards/                 # Route protection
 │   ├── auth.guard.ts       # Authentication guard
 │
 ├── services/               # Data services
 │   ├── api.service.ts      # Handles API requests
 │   ├── cart.service.ts     # Manages shopping cart state
 │   ├── product.service.ts  # Handles product-related logic
 │   ├── user.service.ts     # Handles user authentication
```

## Technologies Used
- Angular (Frontend Framework)
- TypeScript (Programming Language)
- Bootstrap / CSS (Styling)
- RxJS (Reactive Programming)
- Playwright (E2E Testing)

