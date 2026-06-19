import { DanceSkill } from './training-session.model';

export type CoachingInsightType =
    | 'NEGLECTED_SKILL'
    | 'TRAINING BALANCE'
    | 'CONSISTENCY';

export interface SkillProgression {
    skill: DanceSkill;
    totalXp: number;
    level: number;
    xpToNextLevel: number;
}

export interface RecentTrainingDistribution {
    skill: DanceSkill;
    sessionsCount: number;
    totalMinutes: number;
}

export interface CoachingInsight {
    type: CoachingInsightType;
    message: string;
}

export interface Dashboard {
    totalXp: number;
    dancerLevel: number;
    totalTrainingMinutes: number;
    sessionsCount: number;
    topSkill: DanceSkill | null;
    skillProgression: SkillProgression[];
    recentTrainingDistribution: RecentTrainingDistribution[];
    neglectedSkills: DanceSkill[];
    coachingInsights: CoachingInsight[];
}