import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { TrainingSession } from '../../../../core/models/training-session.model';
import { ApiError } from '../../../../core/models/api-error.model';
import { TrainingSessionService } from '../../../../core/services/training-session.service';
import { ApiErrorService } from '../../../../core/services/api-error.service';

@Component({
  selector: 'app-sessions-page',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './sessions-page.component.html',
  styleUrl: './sessions-page.component.scss'
})
export class SessionsPageComponent {

  isLoading = false;
  sessions: TrainingSession[] = [];
  apiError: ApiError | null = null;

  constructor(
    private readonly trainingSessionService: TrainingSessionService,
    private readonly apiErrorService: ApiErrorService
  ) {}

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
}
