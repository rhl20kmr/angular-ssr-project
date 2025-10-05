import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivityLog, ActivityTrackerService } from './activity.tracker.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activity-logger',
  imports: [NgFor,FormsModule],
  templateUrl: './activity-logger.component.html',
  styleUrl: './activity-logger.component.scss'
})
export class ActivityLoggerComponent {
  logs: ActivityLog[] = [];
  filterText = '';

  constructor(private tracker: ActivityTrackerService) {
    this.logs = this.tracker.getLogs();
  }

  filteredLogs() {
    if (!this.filterText) return this.logs;
    const filter = this.filterText.toLowerCase();
    return this.logs.filter(log =>
      Object.values(log).some(val =>
        String(val).toLowerCase().includes(filter)
      )
    );
  }

  clearAll() {
    //this.logs = [];
    this.filterText = '';
  }
}
