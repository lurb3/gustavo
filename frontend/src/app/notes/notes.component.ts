import axios, {AxiosInstance, AxiosResponse} from 'axios';
import { Component } from '@angular/core';
import Swal from "sweetalert2";
import { AuthService } from "../services/auth.service";
import {AxiosInstanceService} from "../services/axios.service";

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
  api!: AxiosInstance;

  constructor(private authService: AuthService, private axiosInstanceService: AxiosInstanceService) {
    this.api = this.axiosInstanceService.getInstance();
    this.getNotes();
  }

  async getNotes() {
    try {
      const notes = await this.api.get('/api/notes');
      this.notes = notes?.data?.notes;
    } catch (err: any) {
      console.error('Error fetching notes:', err);
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
      return;
    }

    const movedItem = this.notes.splice(previousIndex, 1)[0]; // Remove the item from the previous position
    this.notes.splice(currentIndex, 0, movedItem); // Insert the item at the new position
  }

  async onSubmit() {
    const createNote = await this.api.post('/api/notes', {title: this.title, text: this.text});
    this.getNotes();
  }

}
