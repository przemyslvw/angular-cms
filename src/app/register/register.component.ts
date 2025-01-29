import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private auth: Auth, private router: Router) {}

  register() {
    if (!this.email || !this.password || !this.confirmPassword) {
      alert('Wypełnij wszystkie pola!');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Hasła się nie zgadzają!');
      return;
    }

    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        alert('Rejestracja udana!');
        this.router.navigate(['/login']); // Przekierowanie po rejestracji
      })
      .catch((error) => {
        alert(`Błąd rejestracji: ${error.message}`);
      });
  }
}
