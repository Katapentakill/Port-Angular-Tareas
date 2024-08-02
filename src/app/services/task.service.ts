import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status, Task, TaskCreateDto } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000'; // Cambia la URL según tu configuración

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/task/allTasks`);
  }

  createTask(taskCreateDto: TaskCreateDto): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/task/createTask`, taskCreateDto);
  }

  deleteTask(taskId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/task/${taskId}`);
  }

  assignTask(taskId: number, userId: number): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/task/assign/${taskId}/${userId}`, {});
  }

  assignStatus(statusId: number, taskId: number): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/task/assignStatus/${statusId}/${taskId}`, {});
  }

  tagsForTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.baseUrl}/task/`);
  }

  getTasksByStatus(statusId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/task/byStatus/${statusId}`);
  }

  removeTagFromTask(tagId: number, taskId: number): Observable<void> {
    console.log(`Request to remove tag with id ${tagId} from task with id ${taskId}`);
    return this.http.delete<void>(`${this.baseUrl}/task/removeTag/${tagId}/${taskId}`);
  }


  assignTagToTask(tagId: number, taskId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/task/assignTag/${tagId}/${taskId}`, {});
  }

}
