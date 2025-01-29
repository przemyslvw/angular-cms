import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostsComponent } from './posts/posts.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'posts', component: PostsComponent },
    { path: '', redirectTo: 'posts', pathMatch: 'full' }, // domyślna ścieżka
    { path: '**', redirectTo: 'posts' } // przekierowanie na wypadek błędnej ścieżki
  ];
