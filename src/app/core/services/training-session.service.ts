import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateTrainingSessionRequest, TrainingSession, UpdateTrainingSessionRequest } from '../models/training-session.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingSessionService {
  
  private readonly apiUrl = `${environment.apiUrl}/sessions`;

  constructor(private readonly http: HttpClient) { }

  findAll(): Observable<TrainingSession[]> {
    return this.http.get<TrainingSession[]>(this.apiUrl)
  }

  findById(id: number): Observable<TrainingSession> {
    return this.http.get<TrainingSession>(`${this.apiUrl}/${id}`);
  }

  create(request: CreateTrainingSessionRequest): Observable<TrainingSession> {
    return this.http.post<TrainingSession>(this.apiUrl, request);
  }

  update(
    id: number,
    request: UpdateTrainingSessionRequest
  ): Observable<TrainingSession> {
    return this.http.put<TrainingSession>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
