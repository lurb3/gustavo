import axios, {AxiosInstance, AxiosResponse} from 'axios';
import { Component } from '@angular/core';
import Swal from "sweetalert2";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  notes!: any;
  title!: string;
  text!: string;
  isLoading: boolean = false;
  http!: AxiosInstance;

  constructor(private authService: AuthService) {
    this.http = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Bearer ${this.authService.getToken()}`
      },
      withCredentials: true
    });
    this.getNotes();
  }

  async getNotes() {

    try {
      const notes = await this.http.get('/api/notes');
      this.notes = notes?.data?.notes;
    } catch (err: any) {
      Swal.fire({
        heightAuto: false,
        title: 'Could not fetch notes',
        text: err?.response?.data?.message || '',
        confirmButtonText: 'Ok',
        icon: 'error',
      })
    }
  }

  onDrop(event: any) {
    const { currentIndex, previousIndex } = event;

    if (currentIndex === previousIndex) {
      return; // No change in order, do nothing
    }

    const movedItem = this.notes.splice(previousIndex, 1)[0]; // Remove the item from the previous position
    this.notes.splice(currentIndex, 0, movedItem); // Insert the item at the new position
  }

  async onSubmit() {
    const createNote = await this.http.post('/api/notes', {title: this.title, text: this.text});
    this.getNotes();
  }

}
