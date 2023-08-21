import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  name!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  isLoading: boolean = false;

  constructor(private router: Router) {}

  async onSubmit() {
    const formData = { name: this.name, email: this.email, password: this.password };

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
      const createUser = await http.post('/api/signup', formData);
      if (createUser.status === 200) {
        Swal.fire({
          heightAuto: false,
          title: 'User created',
          confirmButtonText: 'Ok',
          icon: 'success',
          timer: 1500
        }).then(({ isConfirmed }) => {
          this.router.navigate(['/login']);
        });
        return;
      }

      this.isLoading = false;
    } catch (err: any) {
      Swal.fire({
        heightAuto: false,
        title: 'User not created',
        text: err?.response?.data?.message || '',
        confirmButtonText: 'Ok',
        icon: 'error',
      })
      this.isLoading = false;
    }


  }
}
