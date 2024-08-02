import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status, Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  deleteStatus(statusId: number): Observable<String> {
    return this.http.delete<String>(`${this.baseUrl}/status/deleteStatus/${statusId}`);
  }

  createStatus(name: string): Observable<{ message: string }> {
    console.log('Nombre del estado enviado al backend:', name); // Log en el servicio
    return this.http.post<{ message: string }>(`${this.baseUrl}/status/createStatus`, { name });
  }

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.baseUrl}/status/allStatus`);
  }

}
