import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  // Retrieve all users from localStorage
  getUsers(): any[] {
    const storedUsers = localStorage.getItem('users');
    console.log('Stored users:', storedUsers); // Debugging
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  // Add a new user to localStorage
  addUser(user: { email: string; password: string }): boolean {
    const users = this.getUsers();

    // Check if the user already exists
    const existingUser = users.find((u) => u.email === user.email);
    if (existingUser) {
      return false; // User already exists
    }

    // Add the new user
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  // Authenticate a user
  loginUser(email: string, password: string): any {
    const users = this.getUsers();
    console.log('Users in storage:', users); // Debugging

    // Find the user by email and password
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      // Save the logged-in user in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      console.log('User authenticated:', user); // Debugging
      return user;
    }

    console.log('Invalid credentials.'); // Debugging
    return null; // Invalid credentials
  }

  // Get the currently logged-in user
  getLoggedInUser(): any {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return loggedInUser ? JSON.parse(loggedInUser) : null;
  }

  // Log out the current user
  logoutUser(): void {
    localStorage.removeItem('loggedInUser');
  }

  getUserCart(): any[] {
    const loggedInUser = this.getLoggedInUser();
    const email = loggedInUser?.email;

    if (!email) {
      console.error('No logged-in user found.');
      return [];
    }

    const carts = JSON.parse(localStorage.getItem('carts') || '{}');
    return carts[email] || []; // Retrieve the cart for the user or return an empty array
  }
}
