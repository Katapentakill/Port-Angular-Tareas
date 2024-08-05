import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskCreateDto } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000'; // Cambia la URL según tu configuración

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/task/allTasks`, { headers: this.getHeaders() });
  }

  createTask(taskCreateDto: TaskCreateDto): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/task/createTask`, taskCreateDto, { headers: this.getHeaders() });
  }

  deleteTask(taskId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/task/${taskId}`, { headers: this.getHeaders() });
  }

  assignTask(taskId: number, userId: number): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/task/assign/${taskId}/${userId}`, {}, { headers: this.getHeaders() });
  }

  assignStatus(statusId: number, taskId: number): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/task/assignStatus/${statusId}/${taskId}`, {}, { headers: this.getHeaders() });
  }

  tagsForTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/task/`, { headers: this.getHeaders() });
  }

  getTasksByStatus(statusId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/task/byStatus/${statusId}`, { headers: this.getHeaders() });
  }

  removeTagFromTask(tagId: number, taskId: number): Observable<void> {
    console.log(`Request to remove tag with id ${tagId} from task with id ${taskId}`);
    return this.http.delete<void>(`${this.baseUrl}/task/removeTag/${tagId}/${taskId}`, { headers: this.getHeaders() });
  }

  assignTagToTask(tagId: number, taskId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/task/assignTag/${tagId}/${taskId}`, {}, { headers: this.getHeaders() });
  }
}
