import { Component } from '@angular/core';
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

  constructor() {}

  async onSubmit() {
    const formData = { email: this.email, password: this.password };

    const http = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: true
    })
    await http.get('/sanctum/csrf-cookie');

    const login = await http.post('/api/login', formData)

    if (login.data) {
      localStorage.setItem('authToken', login.data?.token);
      Swal.fire(
        'Logged in!',
        'Good, you are in',
        'success'
      )
    } else {
      Swal.fire(
        'Unauthorized',
        'Incorrect email or password',
        'error'
      )
    }

  }
}
