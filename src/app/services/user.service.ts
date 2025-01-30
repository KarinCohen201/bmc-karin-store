import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}


  getUsers(): any[] {
    const storedUsers = localStorage.getItem('users');
    console.log('Stored users:', storedUsers); 
    return storedUsers ? JSON.parse(storedUsers) : [];
  }


  addUser(user: { email: string; password: string }): boolean {
    const users = this.getUsers();
    const existingUser = users.find((u) => u.email === user.email);
    if (existingUser) {
      return false; 
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  loginUser(email: string, password: string): any {
    const users = this.getUsers();
    console.log('Users in storage:', users); 

    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      console.log('User authenticated:', user); 
      return user;
    }

    console.log('Invalid credentials.'); 
    return null;
  }

  getLoggedInUser(): any {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return loggedInUser ? JSON.parse(loggedInUser) : null;
  }

  logoutUser(): void {
    localStorage.removeItem('loggedInUser');
  }

}


