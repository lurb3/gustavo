import { HttpClient, HttpHeaders } from '@angular/common/http';
import axios from 'axios';
import { Component } from '@angular/core';

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

  constructor(private http: HttpClient) {}

  async onSubmit() {
    const formData = { name: this.name, email: this.email, password: this.password };

    const http = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: true
    })

    const signup = await http.post('/api/signup', formData);
  }

  handleUpdateResponse(r: any) {
    console.log('---', r)
  }

  handleError(r: any){
    console.log('---Erro: ', r)
  }
}
