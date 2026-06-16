export type TrainingIntensity = 'LOW' | 'MEDIUM' | 'HIGH';

export type DanceSkill =
    | 'FLEXIBILITY'
    | 'HIP_HOP'
    | 'JAZZ_FUNK'
    | 'HOUSE'
    | 'PERFORMANCE'
    | 'FOUNDATION'
    | 'MUSICALITY'
    | 'CHOREO'
    | 'COMPETITION'

export interface TrainingSession {
    id: number;
    date: string;
    durationMinutes: number;
    intensity: TrainingIntensity;
    skill: DanceSkill;
    notes: string | null;
    xpGained: number;
}