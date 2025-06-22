import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name = '';
  email = '';
  username = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    const newUser = { name: this.name, email: this.email, username: this.username, password: this.password };

    this.http.post('/api/register', newUser).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => this.errorMessage = err.error?.error || 'Registration failed'
    });
  }
  onLogin() {
    this.router.navigate(['/login']);
  }

}
