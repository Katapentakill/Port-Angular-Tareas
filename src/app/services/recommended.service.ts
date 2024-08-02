import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfileRecommend } from '../models/task.model'; // Importa la interfaz

@Injectable({
  providedIn: 'root'
})
export class RecommendedService {
  private apiUrl = 'http://localhost:3000/task-similarity'; // URL del endpoint del backend

  constructor(private http: HttpClient) { }

  getSimilarity(requiredSkillsNormalized: string, requiredExpertiseNormalized: string, descriptionNormalized: string): Observable<UserProfileRecommend[]> {
    const body = {
      requiredSkillsNormalized,
      requiredExpertiseNormalized,
      descriptionNormalized
    };

    return this.http.post<UserProfileRecommend[]>(this.apiUrl, body);
  }
}
