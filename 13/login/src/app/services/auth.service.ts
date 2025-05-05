import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUser.asObservable();

  register(user: User): boolean {
    if (this.users.find(u => u.email === user.email)) {
      return false;
    }
    this.users.push(user);
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser.next(user);
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUser.value;
  }
}
