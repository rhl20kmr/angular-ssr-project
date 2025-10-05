import { Injectable, signal } from '@angular/core';

export interface ActivityLog {
  action: string;
  timestamp: string;
  component: string;
  user: string;
}

@Injectable({ providedIn: 'root' })
export class ActivityTrackerService {
    private logs = signal<ActivityLog[]>([]);
    userId: string = (typeof window !== 'undefined' && sessionStorage.getItem('userId'))
        ? sessionStorage.getItem('userId')!
        : 'defaultUser';
    private currentUser = signal<any>(this.userId); // default user

    setUser(name: string) {
        this.currentUser.set(name);
    }

    addLog(action: string, component: string) {
        console.log('User id set using session in services:', sessionStorage.getItem('userId'));
        const newLog: ActivityLog = {
        action,
        timestamp: new Date().toISOString(),
        component,
        user: this.userId,
        };
        this.logs.update(logs => [...logs, newLog]);
        console.log('Activity Log:', newLog);
    }

    getLogs() {
        return this.logs();
    }

    clearLogs() {
        this.logs.set([]);
    }
}
