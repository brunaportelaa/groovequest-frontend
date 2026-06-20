import { Component, OnInit } from '@angular/core';

import { ApiError } from '../../../../core/models/api-error.model';
import { RecentTrainingDistribution } from '../../../../core/models/dashboard.model';
import { ApiErrorService } from '../../../../core/services/api-error.service';
import { DashboardService } from '../../../../core/services/dashboard.service';
import {
  formatSkill,
  getSkillIcon,
} from '../../../../core/utils/training-session-presentation';

@Component({
  selector: 'app-analytics-page',
  imports: [],
  templateUrl: './analytics-page.component.html',
  styleUrl: './analytics-page.component.scss'
})
export class AnalyticsPageComponent implements OnInit {
    isLoading = false;
  apiError: ApiError | null = null;
  distribution: RecentTrainingDistribution[] = [];

  readonly formatSkill = formatSkill;
  readonly getSkillIcon = getSkillIcon;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly apiErrorService: ApiErrorService,
  ) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.isLoading = true;
    this.apiError = null;

    this.dashboardService.getDashboard().subscribe({
      next: (dashboard) => {
        this.distribution = dashboard.recentTrainingDistribution;
        this.isLoading = false;
      },
      error: (error) => {
        this.apiError = this.apiErrorService.toApiError(error);
        this.isLoading = false;
      }
    });
  }

  getTotalRecentMinutes(): number {
      return this.distribution.reduce(
        (total, item) => total + item.totalMinutes,
        0,
      )
  }

  getTotalRecentSessions(): number {
    return this.distribution.reduce(
      (total, item) => total + item.sessionsCount,
      0,
    )
  }

  getDistributionPercent(item: RecentTrainingDistribution): number {
    const totalRecentMinutes = this.getTotalRecentMinutes();

    if (totalRecentMinutes === 0){
      return 0;
    }

    return Math.round((item.totalMinutes / totalRecentMinutes) * 100);
  }
  
   trackBySkill(
      _index: number,
      item: RecentTrainingDistribution,
    ): string {
      return item.skill;
    }

}
