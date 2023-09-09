import { Injectable } from '@angular/core';
import axios, { AxiosInstance as Axios } from 'axios';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AxiosInstanceService {
  private instance: Axios;

  constructor(private authService: AuthService, private router: Router) {
    this.instance = axios.create({
      baseURL: 'http://localhost:8000',
      timeout: 8000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      withCredentials: true
    });

    // Add a request interceptor to set the Authorization header with the token before each request.
    this.instance.interceptors.request.use((config) => {
      const token = this.authService.getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });

    // Add a response interceptor to handle 401 Unauthorized responses.
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        // Handle other errors here.
        return Promise.reject(error);
      }
    );
  }

  getInstance(): Axios {
    return this.instance;
  }
}
