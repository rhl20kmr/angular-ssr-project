// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
 /*  template: `
    <div class="profile-container">
      <h2>Welcome, {{ profile?.name }}</h2>
      <p><strong>Email:</strong> {{ profile?.email }}</p>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 400px;
      margin: 3rem auto;
      padding: 2rem;
      background: #f9f9f9;
      border-radius: 8px;
      text-align: center;
    }
  `] */
})
export class ProfileComponent {
  user: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('/api/profile', { headers }).subscribe({
      next: (data) => this.user = data,
      error: () => {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
