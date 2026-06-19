import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
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

import {
  DANCE_SKILL_OPTIONS,
  TRAINING_INTENSITY_OPTIONS,
  formatIntensity,
  formatSkill,
} from '../../../../core/utils/training-session-presentation';

import { ApiError } from '../../../../core/models/api-error.model';
import { ApiErrorService } from '../../../../core/services/api-error.service';
import { TrainingSessionService } from '../../../../core/services/training-session.service';

@Component({
  selector: 'app-session-form-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './session-form-page.component.html',
  styleUrl: './session-form-page.component.scss'
})
export class SessionFormPageComponent implements OnInit {

  // ---------------------------------------------------------------------------
  // Component state
  // ---------------------------------------------------------------------------

  isSaving = false;
  isLoading = false;
  apiError: ApiError | null = null;
  sessionId: number | null = null;

  // ---------------------------------------------------------------------------
  // Select options
  // ---------------------------------------------------------------------------

  readonly intensityOptions = TRAINING_INTENSITY_OPTIONS;
  readonly skillOptions = DANCE_SKILL_OPTIONS;

  readonly formatSkill = formatSkill;
  readonly formatIntensity = formatIntensity;

  // ---------------------------------------------------------------------------
  // Reactive form
  // ---------------------------------------------------------------------------

  readonly form = this.formBuilder.nonNullable.group({
    date: [this.getTodayAsInputDate(), Validators.required],
    durationMinutes: [45, [Validators.required, Validators.min(1)]],
    intensity: ['MEDIUM' as TrainingIntensity, Validators.required],
    skill: ['FOUNDATION' as DanceSkill, Validators.required],
    notes:['', Validators.maxLength(500)],
  });

  // ---------------------------------------------------------------------------
  // Construction
  // ---------------------------------------------------------------------------

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly trainingSessionService: TrainingSessionService,
    private readonly apiErrorService: ApiErrorService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  // ---------------------------------------------------------------------------
  // Lifecycle hooks
  // ---------------------------------------------------------------------------

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if(!idParam) {
      return;
    }

    this.sessionId = Number(idParam);
    this.loadSessionForEdit(this.sessionId);

  }

  // ---------------------------------------------------------------------------
  // Derived state
  // ---------------------------------------------------------------------------

  get isEditMode(): boolean {
    return this.sessionId !== null;
  }

  // ---------------------------------------------------------------------------
  // Form submission (public actions)
  // ---------------------------------------------------------------------------

  save(): void {
    // Forces validation messages to show if the form is invalid when the user tries to submit
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isEditMode && this.sessionId !== null) {
      this.updateSession();
    } else {
      this.createSession();
    }
  }

  // ---------------------------------------------------------------------------
  // API operations
  // ---------------------------------------------------------------------------

  private createSession(): void {
    this.isSaving = true;
    this.apiError = null;

    const request = this.buildCreateRequest();

    this.trainingSessionService.create(request).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigateByUrl('/sessions');
      },
      error: (error) => {
        this.apiError = this.apiErrorService.toApiError(error);
        this.isSaving = false;
      },
    });
  }

  private updateSession(): void {
    this.isSaving = true;
    this.apiError = null;

    const request = this.buildUpdateRequest();

    this.trainingSessionService.update(this.sessionId!, request).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigateByUrl('/sessions');
      },
      error: (error) => {
        this.apiError = this.apiErrorService.toApiError(error);
        this.isSaving = false;
      },
    });
  }

  private loadSessionForEdit(id: number): void {
    this.isLoading = true;
    this.apiError = null;

    this.trainingSessionService.findById(id).subscribe({
      next: (session) => {
        this.form.patchValue({
          date: session.date,
          durationMinutes: session.durationMinutes,
          intensity: session.intensity,
          skill: session.skill,
          notes: session.notes ?? '',
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.apiError = this.apiErrorService.toApiError(error);
        this.isLoading = false;
      },
    });
  }

  // ---------------------------------------------------------------------------
  // Request builders
  // ---------------------------------------------------------------------------

  private buildCreateRequest(): CreateTrainingSessionRequest {
    const formValue = this.form.getRawValue();

    return {
      date: formValue.date,
      durationMinutes: formValue.durationMinutes,
      intensity: formValue.intensity,
      skill: formValue.skill,
      notes: this.normalizeNotes(formValue.notes),
    };
  }

  private buildUpdateRequest(): CreateTrainingSessionRequest {
    const formValue = this.form.getRawValue();

    return {
      date: formValue.date,
      durationMinutes: formValue.durationMinutes,
      intensity: formValue.intensity,
      skill: formValue.skill,
      notes: this.normalizeNotes(formValue.notes),
    };
  }

  // ---------------------------------------------------------------------------
  // Internal utilities
  // ---------------------------------------------------------------------------

  private normalizeNotes(notes: string): string | null {
    const trimmed = notes.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  private getTodayAsInputDate(): string {
    return new Date().toISOString().slice(0, 10);
  }
}
