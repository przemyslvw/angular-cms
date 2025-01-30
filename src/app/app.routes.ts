import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostsComponent } from './posts/posts.component';
import { AddPostComponent } from './add-post/add-post.component';
import { MapComponent } from './map/map.component';
import { AddLocationComponent } from './add-location/add-location.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'map', component: MapComponent },
    { path: 'add-location', component: AddLocationComponent },
    { path: 'add-post', component: AddPostComponent },
    { path: '', redirectTo: 'posts', pathMatch: 'full' }, // domyślna ścieżka
    { path: '**', redirectTo: 'posts' } // przekierowanie na wypadek błędnej ścieżki
  ];
