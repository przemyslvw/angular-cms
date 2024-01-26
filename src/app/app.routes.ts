import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo:'admin', pathMatch:'full' }, 
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }, 
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }, 
    { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) }, 
    { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) }
  ]; // This is where you define your routes


