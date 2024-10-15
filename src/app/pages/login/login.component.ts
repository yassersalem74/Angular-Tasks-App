import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersApiService } from '../../services/users-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  loginError = false;

  constructor(
    private fb: FormBuilder,
    private usersApiService: UsersApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.loginError = false;
      const loginUser = this.loginForm.value;
      this.usersApiService.loginUser(loginUser).subscribe(
        (user) => {
          console.log('Login successful:', user);
          this.loading = false;
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Login error:', error);
          this.loginError = true;
          this.loading = false;
        }
      );
    } else {
      console.error('Form is invalid');
      this.loginForm.markAllAsTouched();
    }
  }
}