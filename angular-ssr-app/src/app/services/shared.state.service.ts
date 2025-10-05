import { Injectable, signal } from '@angular/core';
import { User } from '../models/users';

@Injectable({ providedIn: 'root' })
export class SharedStateService {
  // Define a signal for your data
  userData = signal<User | null>(null);

  // Update the signal value
  setUserData(data: User | null) {
    this.userData.set(data);
  }

  // Clear the data
  clearUserData() {
    this.userData.set(null);
  }
}
