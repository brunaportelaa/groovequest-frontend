import { Component, OnInit } from '@angular/core';

import { ApiError } from '../../../../core/models/api-error.model';
import { SkillProgression } from '../../../../core/models/dashboard.model';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { ApiErrorService } from '../../../../core/services/api-error.service';
import {
  formatSkill,
  getSkillIcon,
} from '../../../../core/utils/training-session-presentation';


@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [],
  templateUrl: './skills-page.component.html',
  styleUrl: './skills-page.component.scss'
})
export class SkillsPageComponent implements OnInit {
    isLoading = false;
  apiError: ApiError | null = null;
  skills: SkillProgression[] = [];

  // Expose shared presentation helpers to the template.
  readonly formatSkill = formatSkill;
  readonly getSkillIcon = getSkillIcon;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly apiErrorService: ApiErrorService,
  ) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.isLoading = true;
    this.apiError = null;

    this.dashboardService.getDashboard().subscribe({
      next: (dashboard) => {
        this.skills = dashboard.skillProgression;
        this.isLoading = false;
      },
      error: (error) => {
        this.apiError = this.apiErrorService.toApiError(error);
        this.isLoading = false;
      }
    })
  }

  getTotalSkillXp(): number {
    return this.skills.reduce((total, skill) => total + skill.totalXp, 0);
  }

  getHighestLevel(): number {
    if (this.skills.length === 0) {
      return 0;
    }

    return Math.max(...this.skills.map((skill) => skill.level));
  }

  getStrongestSkill(): SkillProgression | null {
    if (this.skills.length === 0) {
      return null;
    }

    return this.skills.reduce((strongestSkill, currentSkill) => {
      return currentSkill.totalXp > strongestSkill.totalXp
        ? currentSkill
        : strongestSkill;
    });
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

  trackBySkill(_index: number, skill: SkillProgression): string {
    return skill.skill;
  }

  

}
