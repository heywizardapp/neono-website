import { analytics } from './core';

export interface ExperimentDefinition {
  active: boolean;
  variants: Record<string, number>; // variant name -> weight (0-1)
  goals: string[];
  scope?: string[]; // paths where experiment is active
  audience?: {
    newVisitors?: boolean;
    returningVisitors?: boolean;
    geoCountries?: string[];
    devices?: ('mobile' | 'tablet' | 'desktop')[];
  };
}

export type ExperimentConfig = Record<string, ExperimentDefinition>;

interface ExperimentState {
  experimentId: string;
  variant: string;
  exposureLogged: boolean;
  assignedAt: number;
}

class ABTestingFramework {
  private assignments: Map<string, ExperimentState> = new Map();
  private experiments: ExperimentConfig = {};
  private sessionId: string;

  constructor() {
    this.sessionId = analytics.getSessionId();
    this.loadExperiments();
    this.loadAssignments();
  }

  private async loadExperiments() {
    try {
      // Dynamic import to avoid blocking main thread
      const { experiments } = await import('../../config/analytics/experiments');
      this.experiments = experiments;
    } catch (error) {
      console.warn('Failed to load experiments config:', error);
    }
  }

  private loadAssignments() {
    try {
      const stored = localStorage.getItem('neono-experiments');
      if (stored) {
        const data = JSON.parse(stored);
        Object.entries(data).forEach(([key, value]) => {
          this.assignments.set(key, value as ExperimentState);
        });
      }
    } catch (error) {
      console.warn('Failed to load experiment assignments:', error);
    }
  }

  private saveAssignments() {
    try {
      const data: Record<string, ExperimentState> = {};
      this.assignments.forEach((state, key) => {
        data[key] = state;
      });
      localStorage.setItem('neono-experiments', JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save experiment assignments:', error);
    }
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  private isInAudience(experiment: ExperimentDefinition): boolean {
    if (!experiment.audience) return true;

    const { audience } = experiment;
    
    // Check visitor type
    const isNewVisitor = !localStorage.getItem('neono-returning-visitor');
    if (audience.newVisitors === true && !isNewVisitor) return false;
    if (audience.returningVisitors === true && isNewVisitor) return false;

    // Check device type
    if (audience.devices && audience.devices.length > 0) {
      const deviceType = this.getDeviceType();
      if (!audience.devices.includes(deviceType)) return false;
    }

    // Check geo (simplified - would need server-side for real geo data)
    if (audience.geoCountries && audience.geoCountries.length > 0) {
      const userLocale = navigator.language.split('-')[1];
      if (userLocale && !audience.geoCountries.includes(userLocale)) return false;
    }

    return true;
  }

  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private isInScope(experiment: ExperimentDefinition): boolean {
    if (!experiment.scope || experiment.scope.length === 0) return true;
    
    const currentPath = window.location.pathname;
    return experiment.scope.some(scopePath => {
      // Support exact match and prefix match
      return currentPath === scopePath || currentPath.startsWith(scopePath + '/');
    });
  }

  assign(experimentId: string): string {
    const experiment = this.experiments[experimentId];
    
    // Return control if experiment doesn't exist or is inactive
    if (!experiment || !experiment.active) {
      return 'control';
    }

    // Check if experiment is in scope and audience
    if (!this.isInScope(experiment) || !this.isInAudience(experiment)) {
      return 'control';
    }

    // Check for existing assignment
    const existing = this.assignments.get(experimentId);
    if (existing) {
      return existing.variant;
    }

    // Create new assignment using deterministic bucketing
    const variants = Object.keys(experiment.variants);
    if (variants.length === 0) return 'control';

    // Use session ID + experiment ID for consistent bucketing
    const bucketingSeed = this.sessionId + experimentId;
    const hash = this.hashString(bucketingSeed);
    const bucket = (hash % 10000) / 10000; // 0-1 range

    let cumulative = 0;
    let selectedVariant = 'control';

    for (const [variant, weight] of Object.entries(experiment.variants)) {
      cumulative += weight;
      if (bucket <= cumulative) {
        selectedVariant = variant;
        break;
      }
    }

    // Store assignment
    const state: ExperimentState = {
      experimentId,
      variant: selectedVariant,
      exposureLogged: false,
      assignedAt: Date.now(),
    };

    this.assignments.set(experimentId, state);
    this.saveAssignments();

    return selectedVariant;
  }

  exposure(experimentId: string, variant?: string) {
    if (!analytics.isEnabled()) return;

    const assignment = this.assignments.get(experimentId);
    const actualVariant = variant || assignment?.variant || 'control';

    // Only log exposure once per session per experiment
    if (assignment && !assignment.exposureLogged) {
      assignment.exposureLogged = true;
      this.saveAssignments();

      analytics.track('exp_exposure', {
        experiment_id: experimentId,
        variant: actualVariant,
        session_id: this.sessionId,
      });
    }
  }

  goal(goalName: string, meta: Record<string, any> = {}) {
    if (!analytics.isEnabled()) return;

    // Find experiments that include this goal
    const relevantExperiments: Array<{ id: string; variant: string }> = [];
    
    for (const [experimentId, experiment] of Object.entries(this.experiments)) {
      if (experiment.goals.includes(goalName)) {
        const assignment = this.assignments.get(experimentId);
        if (assignment && assignment.exposureLogged) {
          relevantExperiments.push({
            id: experimentId,
            variant: assignment.variant,
          });
        }
      }
    }

    // Track goal with experiment context
    analytics.track('exp_goal', {
      goal_name: goalName,
      experiments: JSON.stringify(relevantExperiments),
      ...meta,
    });
  }

  // Get current assignments for debugging
  getAssignments(): Record<string, string> {
    const result: Record<string, string> = {};
    this.assignments.forEach((state, experimentId) => {
      result[experimentId] = state.variant;
    });
    return result;
  }

  // Force assignment for testing
  forceAssignment(experimentId: string, variant: string) {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('forceAssignment only available in development');
      return;
    }

    const state: ExperimentState = {
      experimentId,
      variant,
      exposureLogged: false,
      assignedAt: Date.now(),
    };

    this.assignments.set(experimentId, state);
    this.saveAssignments();
  }

  // Clear all assignments (for testing)
  clearAssignments() {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('clearAssignments only available in development');
      return;
    }

    this.assignments.clear();
    localStorage.removeItem('neono-experiments');
  }

  // Update experiments configuration
  updateExperiments(newExperiments: ExperimentConfig) {
    this.experiments = { ...this.experiments, ...newExperiments };
  }
}

// Global instance
export const abTesting = new ABTestingFramework();

// Convenience functions
export function assign(experimentId: string): string {
  return abTesting.assign(experimentId);
}

export function exposure(experimentId: string, variant?: string): void {
  abTesting.exposure(experimentId, variant);
}

export function goal(goalName: string, meta?: Record<string, any>): void {
  abTesting.goal(goalName, meta);
}

// Mark returning visitor
if (typeof window !== 'undefined') {
  localStorage.setItem('neono-returning-visitor', 'true');
}

// Development helpers
if (process.env.NODE_ENV === 'development') {
  (window as any).__abTesting = abTesting;
}