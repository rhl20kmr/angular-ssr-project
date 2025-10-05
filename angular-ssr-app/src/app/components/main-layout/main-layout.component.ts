import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedStateService } from '../../services/shared.state.service';

@Component({
  selector: 'app-main-layout',
  imports: [SidebarComponent, ToolbarComponent,RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  user: any = null;
  isLoggedIn: boolean = false;
  sidebarOpen = false;

  constructor(private http: HttpClient, private router: Router,
    private shared: SharedStateService
  ) {}
  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('/api/profile', { headers }).subscribe({
      next: (data)=> {
        this.isLoggedIn = true;
        if (data && typeof data === 'object') {
          this.user = data;
          this.shared.setUserData({
            id: this.user?.id,
            name: this.user.name,
            email: this.user.email
          });
           sessionStorage.setItem('userId', this.user.email);
           console.log('User id set using session:', sessionStorage.getItem('userId'));
        } else {
          console.error('Unexpected response format:', data);
          this.router.navigate(['/login']);
        }
      } ,
      error: () => {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
      }
    });
  }
}
