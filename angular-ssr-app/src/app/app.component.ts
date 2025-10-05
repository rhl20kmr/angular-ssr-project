import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login-component/login.component';
import { ActivityTrackerService } from './components/activity-logger/activity.tracker.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-ssr-app';
  message = 'Loading...';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router, private tracker: ActivityTrackerService
  ) {
    /* this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.tracker.logRouteChange(event.urlAfterRedirects);
    }); */
    if (isPlatformBrowser(this.platformId)) {
      // Only run this on the browser
      this.http.get<{ message: string }>('/api/message').subscribe((data) => {
        this.message = data.message;
      });
    }
  }
}
