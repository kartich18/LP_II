import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    // Basic validation
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.error = 'All fields are required';
      return;
    }

    // Password validation
    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters long';
      return;
    }

    if (!/\d/.test(this.password)) {
      this.error = 'Password must contain at least one number';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    // Attempt to register
    const success = this.authService.register({
      username: this.username,
      email: this.email,
      password: this.password
    });

    if (success) {
      alert('Registration successful! Please login with your credentials.');
      this.router.navigate(['/login']);
    } else {
      this.error = 'Email already exists';
    }
  }
}
