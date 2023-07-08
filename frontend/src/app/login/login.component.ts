import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private http: HttpClient) {}

  onSubmit() {
    const formData = { email: this.email, password: this.password };  
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post('http://localhost:8000/api/login', formData, { headers })
    .subscribe({
      next: this.handleUpdateResponse.bind(this),
      error: this.handleError.bind(this)
   });
  }

  handleUpdateResponse(r: any) {
    console.log('---', r)
    const headers = { 'Authorization': `Bearer ${r.token}` }
    this.http.get('http://localhost:8000/api/me', { headers })
    .subscribe({
      next: (e) => console.log(e),
      error: (e) => console.log('Error: ', e)
   });
  }

  handleError(r: any){
    console.log('---Erro: ', r)
  }
}
