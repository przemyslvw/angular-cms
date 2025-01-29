import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [FormsModule] 
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private auth: Auth) {}

  register() {
    if (!this.email || !this.password) {
      alert('Email and password are required');
      return;
    }

    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        alert('User registered successfully!');
        this.email = '';
        this.password = '';
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  }
}
