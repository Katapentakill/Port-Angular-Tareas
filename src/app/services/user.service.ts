import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user'; // Ajusta esta URL según tu configuración

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allUsers`);
  }

  getUserById(userId: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/userById/${userId}`);
  }
}
