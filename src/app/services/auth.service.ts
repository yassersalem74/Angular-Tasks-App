import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getInitialLoginStatus());
  private currentUserSubject = new BehaviorSubject<any>(this.getInitialUser());

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  constructor() {}

  private getInitialLoginStatus(): boolean {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    return storedLoginStatus ? JSON.parse(storedLoginStatus) : false;
  }

  private getInitialUser(): any {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  login(user: any): void {
    if (user) {
      this.currentUserSubject.next(user);
      this.isLoggedInSubject.next(true);
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      alert("Invalid email or password");
    }
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }
}