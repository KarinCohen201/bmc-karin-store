import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addUser(user: { email: string; password: string }): Observable<any> {
    // Send to backend as { username, password }
    return this.http.post(`${this.apiUrl}/register`, {
      email: user.email,
      password: user.password,
    });
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  getLoggedInUser(): any {
    if (typeof window !== 'undefined') {
      const loggedInUser = localStorage.getItem('loggedInUser');
      return loggedInUser ? JSON.parse(loggedInUser) : null;
    }
    return null;
  }
  

  logoutUser(): void {
    localStorage.removeItem('loggedInUser');
  }
}
