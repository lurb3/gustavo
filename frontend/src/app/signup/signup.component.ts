import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  onSubmit() {
    const formData = { name: this.name, email: this.email, password: this.password };  
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post('http://localhost:8000/api/signup', formData, { headers })
    .subscribe({
      next: this.handleUpdateResponse.bind(this),
      error: this.handleError.bind(this)
   });
  }

  handleUpdateResponse(r: any) {
    console.log('---', r)
  }

  handleError(r: any){
    console.log('---Erro: ', r)
  }
}
