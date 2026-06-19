import { Component, OnInit } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TrainingSession } from '../../../../core/models/training-session.model';

import {
  formatIntensity,
  formatSkill,
  getIntensityClass,
} from '../../../../core/utils/training-session-presentation';

import { ApiError } from '../../../../core/models/api-error.model';
import { TrainingSessionService } from '../../../../core/services/training-session.service';
import { ApiErrorService } from '../../../../core/services/api-error.service';

@Component({
  selector: 'app-sessions-page',
  standalone: true,
  imports: [DatePipe, NgClass, RouterLink],
  templateUrl: './sessions-page.component.html',
  styleUrl: './sessions-page.component.scss'
})
export class SessionsPageComponent implements OnInit{

  isLoading = false;
  deletingSessionId: number | null = null;
  sessions: TrainingSession[] = [];
  apiError: ApiError | null = null;
  
  readonly formatSkill = formatSkill;
  readonly formatIntensity = formatIntensity;
  readonly getIntensityClass = getIntensityClass;

  constructor(
    private readonly trainingSessionService: TrainingSessionService,
    private readonly apiErrorService: ApiErrorService
  ) {}

  ngOnInit():void {
    this.loadSessions();
  }

  loadSessions(): void {
    this.isLoading = true;
    this.apiError = null;

    this.trainingSessionService.findAll().subscribe({
      next: (sessions) => {
        this.sessions = sessions;
        this.isLoading = false;
      },
      error: (error) => {
        this.apiError = this.apiErrorService.toApiError(error);
        this.isLoading = false;
      }
    })
  }

  deleteSession(deletingSession: TrainingSession): void {
    const confirmed = window.confirm('Are you sure you want to delete this session?');

    if(!confirmed) {
      return;
    }

    this.deletingSessionId = deletingSession.id;
    this.apiError = null;

    this.trainingSessionService.delete(deletingSession.id).subscribe({
      next: () => {
        this.sessions = this.sessions.filter(s => s.id !== deletingSession.id);
        this.deletingSessionId = null;
      },
      error: (error) => {
        this.apiError = this.apiErrorService.toApiError(error);
        this.deletingSessionId = null;
      }
    });

  }

  trackBySessionId(_index: number, session: TrainingSession): number {
    return session.id;
  }
}
