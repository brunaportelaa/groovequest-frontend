import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateTrainingSessionRequest, TrainingSession } from '../models/training-session.model';
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

  create(request: CreateTrainingSessionRequest): Observable<TrainingSession> {
    return this.http.post<TrainingSession>(this.apiUrl, request);
  }
}
