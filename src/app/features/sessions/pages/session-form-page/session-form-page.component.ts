import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  CreateTrainingSessionRequest,
  DanceSkill,
  TrainingIntensity,
} from '../../../../core/models/training-session.model';
import { ApiError } from '../../../../core/models/api-error.model';
import { ApiErrorService } from '../../../../core/services/api-error.service';
import { TrainingSessionService } from '../../../../core/services/training-session.service';

@Component({
  selector: 'app-session-form-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './session-form-page.component.html',
  styleUrl: './session-form-page.component.scss'
})
export class SessionFormPageComponent {

  isSaving = false;
  apiError: ApiError | null = null;

  readonly intensityOptions: TrainingIntensity[] = ['LOW', 'MEDIUM', 'HIGH'];

  readonly skillOptions: DanceSkill[] = [
    'FLEXIBILITY',
    'HIP_HOP',
    'JAZZ_FUNK',
    'HOUSE',
    'PERFORMANCE',
    'FOUNDATION',
    'MUSICALITY',
    'CHOREO',
    'COMPETITION'
  ];

  readonly form = this.formBuilder.nonNullable.group({
    date: [this.getTodayAsInputDate(), Validators.required],
    durationMinutes: [45, [Validators.required, Validators.min(1)]],
    intensity: ['MEDIUM' as TrainingIntensity, Validators.required],
    skill: ['FOUNDATION' as DanceSkill, Validators.required],
    notes:['', Validators.maxLength(500)],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly trainingSessionService: TrainingSessionService,
    private readonly apiErrorService: ApiErrorService,
    private readonly router: Router
  ) {}

  save(): void {
    // Forces validation messages to show if the form is invalid when the user tries to submit
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.apiError = null;

    const formValue = this.form.getRawValue();

    const request: CreateTrainingSessionRequest = {
      date: formValue.date,
      durationMinutes: formValue.durationMinutes,
      intensity: formValue.intensity,
      skill: formValue.skill,
      notes: this.normalizeNotes(formValue.notes),
    };

    this.trainingSessionService.create(request).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigateByUrl('/sessions');
      },
      error: (error) => {
        this.apiError = this.apiErrorService.toApiError(error);
        this.isSaving = false;
      }
    });

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
    };

    return labels[skill];
  }

  formatIntensity(intensity: TrainingIntensity): string {
    const labels: Record<TrainingIntensity, string> = {
      LOW: 'Low',
      MEDIUM: 'Medium',
      HIGH: 'High',
    };

    return labels[intensity];
  }

  private normalizeNotes(notes: string): string | null {
    const trimmed = notes.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  private getTodayAsInputDate(): string {
    return new Date().toISOString().slice(0, 10);
  }
}
