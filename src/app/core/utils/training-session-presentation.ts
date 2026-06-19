import {
  DanceSkill,
  TrainingIntensity,
} from '../models/training-session.model';

export const TRAINING_INTENSITY_OPTIONS: TrainingIntensity[] = [
  'LOW',
  'MEDIUM',
  'HIGH',
];

export const DANCE_SKILL_OPTIONS: DanceSkill[] = [
  'HIP_HOP',
  'JAZZ_FUNK',
  'HOUSE',
  'PERFORMANCE',
  'FLEXIBILITY',
  'FOUNDATION',
  'MUSICALITY',
  'CHOREO',
  'COMPETITION',
];

export const DANCE_SKILL_LABELS: Record<DanceSkill, string> = {
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

export const DANCE_SKILL_ICONS: Record<DanceSkill, string> = {
  HIP_HOP: '🧢',
  JAZZ_FUNK: '💅',
  HOUSE: '🏠',
  PERFORMANCE: '🎭',
  FLEXIBILITY: '🤸',
  FOUNDATION: '🧱',
  MUSICALITY: '🎵',
  CHOREO: '🌀',
  COMPETITION: '🏆',
};

export const TRAINING_INTENSITY_LABELS: Record<TrainingIntensity, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

export function formatSkill(skill: DanceSkill | null): string {
  if (!skill) {
    return 'No skill yet';
  }

  return DANCE_SKILL_LABELS[skill];
}

export function getSkillIcon(skill: DanceSkill): string {
  return DANCE_SKILL_ICONS[skill];
}

export function formatIntensity(intensity: TrainingIntensity): string {
  return TRAINING_INTENSITY_LABELS[intensity];
}

export function getIntensityClass(intensity: TrainingIntensity): string {
  return `intensity-${intensity.toLowerCase()}`;
}