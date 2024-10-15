import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'home',
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Sign-up',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'login',
  },
];


