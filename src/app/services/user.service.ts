import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user'; // Ajusta esta URL según tu configuración

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/allUsers`);
  }

  getUserById(userId: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/userById/${userId}`);
  }

  searchUsers(name?: string, lastname?: string, email?: string, job?: string): Observable<UserDto[]> {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (lastname) params = params.set('lastname', lastname);
    if (email) params = params.set('email', email);
    if (job) params = params.set('job', job);

    return this.http.get<UserDto[]>(`${this.apiUrl}/search`, { params });
  }

  deleteUser(userId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/deleteUser/${userId}`);
  }

  uploadUserImage(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put<any>(`${this.apiUrl}/uploadUserImage/${userId}`, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }
}
