import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, AsyncPipe, CommonModule } from '@angular/common';
import { Auth, signOut, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterModule,
    MatToolbarModule, MatButtonModule,
    CommonModule, NgIf, AsyncPipe // Dodane importy
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-cms';
  user$: Observable<any | null>; // Strumień użytkownika

  constructor(private auth: Auth) {
    this.user$ = user(this.auth); // Sprawdzanie statusu logowania
  }

  logout() {
    signOut(this.auth).then(() => alert('Wylogowano!'));
  }
}
