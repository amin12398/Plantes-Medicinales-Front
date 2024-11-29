import { Component } from '@angular/core';
import { user } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: user = {
    fullName: '',
    email: '',
    password: '',
  };

  registrationSuccess: boolean = false; // To control the success message

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.register(this.user).subscribe(
      (response) => {
        console.log('User registered successfully', response);
        this.registrationSuccess = true; // Show success message
      },
      (error) => {
        console.error('Error during registration', error);
        this.registrationSuccess = false; // Optionally, handle error feedback
      }
    );
  }
}
