import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private apiUrl = 'https://entertaining-skitter-carriage.glitch.me/users';

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400 && error.error.message === 'Email already exists') {
          return throwError('Email already exists');
        }
        return throwError('An error occurred');
      })
    );
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('An error occurred');
      })
    );
  }

  loginUser(loginUser: { email: string; password: string }): Observable<any> {
    return this.getAllUsers().pipe(
      map(users => {
        const user = users.find(u => u.email === loginUser.email && u.password === loginUser.password);
        if (user) {
          return user;
        } else {
          throw new Error('Invalid email or password');
        }
      })
    );
  }
}