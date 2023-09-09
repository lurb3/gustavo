import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {AxiosInstanceService} from "../services/axios.service";
import Swal from 'sweetalert2';
import axios, {AxiosInstance} from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email!: string;
  password!: string;
  isLoading: boolean = false;
  api!: AxiosInstance;

  constructor(private router: Router, private axiosInstanceService: AxiosInstanceService) {
    this.api = this.axiosInstanceService.getInstance();
  }

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

    try {
      await http.get('/sanctum/csrf-cookie');
      const login = await this.api.post('/api/login', formData);

      this.isLoading = false;
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
    } catch (err) {
      this.isLoading = false;
      Swal.fire({
        heightAuto: false,
        position: "center",
        icon: 'error',
        title: 'Unauthorized',
        text: "Incorrect email or password",
        timer: 1500
      })
    }
  }
}
