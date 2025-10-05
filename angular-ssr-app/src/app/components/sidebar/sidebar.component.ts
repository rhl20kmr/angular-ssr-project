import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isOpen = true; // for mobile toggle
  isCollapsed = false;
  menuItems = [
    { name: 'Dashboard', icon: 'home', route: '/profile' },
    { name: 'Activity-Logger', icon: 'check', route: '/activity-logger' },
  ];
  constructor(private router: Router) {}
  onMenuClick(item: any) {
    console.log('Navigating to:', item.route);
    // Optional: perform analytics, close mobile sidebar, etc.
    // Example:
    // this.isOpen = false;

    // Navigate manually (optional if using [routerLink])
    //this.router.navigate([item.route]);
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

}
