import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersApiService } from '../../services/users-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false; 

  constructor(
    private fb: FormBuilder,
    private usersApiService: UsersApiService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[A-Za-z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
    },);
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }


  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      const user = this.registerForm.value;
      this.usersApiService.registerUser(user).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.loading = false;
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration error:', error);
          this.loading = false;
        }
      );
    } else {
      console.error('Form is invalid');
      this.registerForm.markAllAsTouched();
    }
  }
}