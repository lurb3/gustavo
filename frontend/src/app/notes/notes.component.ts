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
  noteLists!: any;
  notes!: any;
  title!: string;
  text!: string;
  note_list_id: number = 0;
  isLoading: boolean = false;
  api!: AxiosInstance;

  constructor(private authService: AuthService, private axiosInstanceService: AxiosInstanceService) {
    this.api = this.axiosInstanceService.getInstance();
    this.getNoteLists();
  }

  async getNoteLists() {
    try {
      const noteLists = await this.api.get('/api/note_lists');
      console.log(noteLists)
      this.noteLists = noteLists?.data?.note_lists;
      this.getNotes();
    } catch (err: any) {
      console.error('Error fetching note lists:', err);
      Swal.fire({
        heightAuto: false,
        title: 'Could not fetch note lists',
        text: err?.response?.data?.message || '',
        confirmButtonText: 'Ok',
        icon: 'error',
      })
    }
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

  async drop(event: any) {

  }

  async onDrop(event: any) {
    const { currentIndex, previousIndex } = event;

    if (currentIndex === previousIndex) {
      return;
    }

    const movedItem = this.notes.splice(previousIndex, 1)[0];
    this.notes.splice(currentIndex, 0, movedItem);

    const noteId = event.item?.data?.id;
    const updatedNotes = await this.api.post(`api/notes/position/${noteId}`, {
      curr: currentIndex
    });

  }

  async onSubmit() {
    const createNote = await this.api.post('/api/notes', {
      title: this.title,
      text: this.text,
      note_list_id: this.note_list_id
    });
    this.getNotes();
  }

}
