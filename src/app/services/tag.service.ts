import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTagDto, Tag } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = 'http://localhost:3000/tag'; // Ajusta esta URL según tu configuración

  constructor(private http: HttpClient) {}

  createTag(createTagDto: CreateTagDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/createTag`, createTagDto);
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/allTags`);
  }

  deleteTag(tagId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/deleteTag/${tagId}`);
  }

}
