import { Component, OnInit } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

import { DanceSkill, TrainingIntensity, TrainingSession } from '../../../../core/models/training-session.model';
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
  sessions: TrainingSession[] = [];
  apiError: ApiError | null = null;

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

  formatSkill(skill: DanceSkill): string {
    const labels: Record<DanceSkill, string> = {
      HIP_HOP: 'Hip Hop',
      JAZZ_FUNK: 'Jazz Funk',
      HOUSE: 'House',
      PERFORMANCE: 'Performance',
      FLEXIBILITY: 'Flexibility',
      FOUNDATION: 'Foundation',
      MUSICALITY: 'Musicality',
      CHOREO: 'Choreo',
      COMPETITION: 'Competition',
    }
    return labels[skill];
  }

  formatIntensity(intensity: TrainingIntensity): string {
    const labels: Record<TrainingIntensity, string> = {
      LOW: 'Low',
      MEDIUM: 'Medium',
      HIGH: 'High',
    }
    return labels[intensity];
  }

  getIntensityClass(intensity: TrainingIntensity): string {
    return `intensity-${intensity.toLowerCase()}`;
  }

  trackBySessionId(_index: number, session: TrainingSession): number {
    return session.id;
  }
}
