// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SharedStateService } from '../services/shared.state.service';
import { ActivityTrackerService } from '../components/activity-logger/activity.tracker.service';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule/* , SidebarComponent, ToolbarComponent */,RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
   /* template: `
    <div class="profile-container">
      <h2>Welcome, {{ user?.name }}</h2>
      <p><strong>Email:</strong> {{ user?.email }}</p>
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
  `]  */
})
export class ProfileComponent {
  user: any = null;
  isLoggedIn: boolean = false;
   sidebarOpen = false;
   suggestion = '';

  constructor(private http: HttpClient, private router: Router,
    public shared: SharedStateService,
    private tracker: ActivityTrackerService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
   /*  const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    } */

   /*  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('/api/profile', { headers }).subscribe({
      next: (data)=> {
        this.isLoggedIn = true;
        if (data && typeof data === 'object') {
          this.user = data;
        } else {
          console.error('Unexpected response format:', data);
          this.router.navigate(['/login']);
        }
      } ,
      error: () => {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
      }
    }); */
  }

  logout(): void {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
  navigateToProfile(): void {
    this.tracker.addLog('task_completed', 'DashboardComponent');
  }
   throwError() {
    //throw new Error('Test error from Angular with AI logging!');
    this.auth.getSuggestion("TypeError: Cannot read property 'map' of undefined")
      .subscribe(s => {
        console.log('AI Suggestion:', s);
        this.suggestion = s
      } );
    }
}
