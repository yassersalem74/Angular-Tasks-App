import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getInitialLoginStatus());
  private currentUserSubject = new BehaviorSubject<any | null>(this.getInitialUser());

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  currentUser$: Observable<any | null> = this.currentUserSubject.asObservable();

  constructor(private usersApiService: UsersApiService) {}

  private getInitialLoginStatus(): boolean {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    return storedLoginStatus ? JSON.parse(storedLoginStatus) : false;
  }

  private getInitialUser(): any | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  login(user: any): Observable<boolean> {
    return this.usersApiService.loginUser(user).pipe(
      map(validUser => {
        if (validUser) {
          this.currentUserSubject.next(validUser);
          this.isLoggedInSubject.next(true);
          localStorage.setItem('isLoggedIn', JSON.stringify(true));
          localStorage.setItem('currentUser', JSON.stringify(validUser));
          return true;
        } else {
          alert("Invalid email or password");
          return false;
        }
      }),
      catchError(() => of(false))
    );
  }

  logout(): Observable<boolean> {
    return of(true).pipe(
      map(() => {
        this.currentUserSubject.next(null);
        this.isLoggedInSubject.next(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        return true;
      }),
      catchError(() => of(false))
    );
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  getCurrentUser(): any | null {
    return this.currentUserSubject.value;
  }
}