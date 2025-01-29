import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: Auth, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Podaj email i hasło!');
      return;
    }

    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        alert('Logowanie udane!');
        this.router.navigate(['/posts']); // Przekierowanie po zalogowaniu
      })
      .catch((error) => {
        alert(`Błąd logowania: ${error.message}`);
      });
  }
}
