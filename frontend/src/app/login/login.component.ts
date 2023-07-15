import { Component } from '@angular/core';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email!: string;
  password!: string;
  isLoading: boolean = false;

  constructor(private router: Router) {}

  async onSubmit() {
    const formData = { email: this.email, password: this.password };

    const http = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: true
    })
    this.isLoading = true;

    await http.get('/sanctum/csrf-cookie');
    const login = await http.post('/api/login', formData);

    this.isLoading = false;

    if (login.data) {
      localStorage.setItem('authToken', login.data?.token);
      Swal.fire({
        heightAuto: false,
        title: 'Logged in!',
        confirmButtonText: 'Ok',
        icon: 'success',
        timer: 1500
      }).then(({ isConfirmed }) => {
          this.router.navigate(['/dashboard']);
      })
    } else {
      Swal.fire(
        'Unauthorized',
        'Incorrect email or password',
        'error'
      )
    }

  }
}
