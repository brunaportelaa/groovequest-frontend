import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ApiError } from '../../../../core/models/api-error.model';
import {
  CoachingInsight,
  Dashboard,
  SkillProgression,
} from '../../../../core/models/dashboard.model';

import {
  formatSkill,
} from '../../../../core/utils/training-session-presentation';

import { DanceSkill } from '../../../../core/models/training-session.model';
import { ApiErrorService } from '../../../../core/services/api-error.service';
import { DashboardService } from '../../../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit {
  isLoading = false;
  dashboard: Dashboard | null = null;
  apiError: ApiError | null = null;

  readonly formatSkill = formatSkill;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly apiErrorService: ApiErrorService,
  ){}

  ngOnInit(): void {
    this.loadDashboard()
  }

  loadDashboard(): void {
    this.isLoading = true;
    this.apiError = null;

    this.dashboardService.getDashboard().subscribe({
      next: (dashboard) => {
        this.dashboard = dashboard;
        this.isLoading = false;
      },
      error: (error) => {
        this.apiError = this.apiErrorService.toApiError(error);
        this.isLoading = false;
      }
    })
  }

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

  getTotalHours(totalMinutes: number): number {
    return Math.round((totalMinutes / 60) * 10) / 10;
  }

  getSkillProgressPercent(skill: SkillProgression): number {
    const currentLevelXp = skill.totalXp;
    const xpToNextLevel = skill.xpToNextLevel;
    const totalNeededForCurrentStep = currentLevelXp + xpToNextLevel;

    if (totalNeededForCurrentStep <= 0) {
      return 0;
    }

    return Math.round((currentLevelXp / totalNeededForCurrentStep) * 100);
  }

  getDistributionPercent(totalMinutes: number, dashboard: Dashboard): number {
    const totalRecentMinutes = dashboard.recentTrainingDistribution.reduce(
      (sum, item) => sum + item.totalMinutes,
      0,
    )

    if (totalRecentMinutes === 0) {
      return 0;
    }

    return Math.round((totalMinutes / totalRecentMinutes) * 100);
  }

  getInsightClass(insight: CoachingInsight): string {
    return `insight-${insight.type.toLowerCase().replaceAll('_', '-')}`;
  }

  trackBySkill(_index: number, item: { skill: DanceSkill }): DanceSkill {
    return item.skill;
  }

  trackByInsight(index: number, insight: CoachingInsight): string {
    return `${insight.type}-${index}`;
  }
  

}
