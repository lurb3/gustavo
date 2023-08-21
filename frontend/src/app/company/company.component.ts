import { Component } from '@angular/core';
import axios from "axios";
import Swal from "sweetalert2";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  companyName!: string;
  role!: string;
  isLoading: boolean = false;

  async createCompany() {
    const formData = { name: this.companyName, role: this.role }
    const http = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: true
    })
    this.isLoading = true;

    const company = await http.post('/api/company', formData);

    console.log('---', company)
  }

}
