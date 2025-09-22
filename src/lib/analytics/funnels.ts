import { analytics } from './core';

export interface FunnelStep {
  event: string;
  where?: Record<string, any>;
  name?: string;
}

export interface FunnelDefinition {
  id: string;
  name: string;
  windowSec: number;
  steps: FunnelStep[];
  description?: string;
}

interface FunnelState {
  funnelId: string;
  currentStep: number;
  startTime: number;
  stepTimestamps: number[];
  completed: boolean;
}

class FunnelAnalyzer {
  private funnels: FunnelDefinition[] = [];
  private sessionStates: Map<string, FunnelState[]> = new Map();
  private enabled = false;

  constructor() {
    this.loadFunnels();
    this.setupEventListeners();

    // Listen for consent changes
    window.addEventListener('analytics:enabled', () => {
      this.enabled = true;
    });

    this.checkInitialConsent();
  }

  private checkInitialConsent() {
    try {
      const consent = localStorage.getItem('neono-consent');
      if (consent) {
        const parsed = JSON.parse(consent);
        this.enabled = parsed.analytics === true;
      }
    } catch {
      // Check for dev override
      const urlParams = new URLSearchParams(window.location.search);
      this.enabled = urlParams.get('analytics') === 'on';
    }
  }

  private async loadFunnels() {
    try {
      const { funnels } = await import('../../config/analytics/funnels');
      this.funnels = funnels;
      // Funnel definitions loaded
    } catch (error) {
      console.warn('Failed to load funnel definitions:', error);
    }
  }

  private setupEventListeners() {
    // Listen to all analytics events
    window.addEventListener('analytics:event', (event: any) => {
      if (this.enabled) {
        this.processEvent(event.detail);
      }
    });

    // Reset states on new session
    window.addEventListener('beforeunload', () => {
      this.persistStates();
    });

    // Load states on page load
    this.loadStates();
  }

  private processEvent(event: any) {
    const sessionId = analytics.getSessionId();
    
    // Get or create session states
    if (!this.sessionStates.has(sessionId)) {
      this.sessionStates.set(sessionId, []);
    }
    
    const states = this.sessionStates.get(sessionId)!;

    // Check each funnel
    for (const funnel of this.funnels) {
      this.processFunnelEvent(funnel, event, states);
    }
  }

  private processFunnelEvent(funnel: FunnelDefinition, event: any, states: FunnelState[]) {
    // Find existing state for this funnel
    let state = states.find(s => s.funnelId === funnel.id && !s.completed);
    
    // Check if event matches any step in the funnel
    for (let stepIndex = 0; stepIndex < funnel.steps.length; stepIndex++) {
      const step = funnel.steps[stepIndex];
      
      if (this.eventMatchesStep(event, step)) {
        // If no state exists and this is the first step, create it
        if (!state && stepIndex === 0) {
          state = {
            funnelId: funnel.id,
            currentStep: 0,
            startTime: event.ts,
            stepTimestamps: [event.ts],
            completed: false,
          };
          states.push(state);
          
          this.emitFunnelEvent('funnel_started', funnel, state, stepIndex);
        }
        // If state exists and this is the next expected step
        else if (state && stepIndex === state.currentStep + 1) {
          // Check if within time window
          const elapsed = event.ts - state.startTime;
          if (elapsed <= funnel.windowSec * 1000) {
            state.currentStep = stepIndex;
            state.stepTimestamps.push(event.ts);
            
            // Check if this is the last step
            if (stepIndex === funnel.steps.length - 1) {
              state.completed = true;
              this.emitFunnelEvent('funnel_completed', funnel, state, stepIndex);
            } else {
              this.emitFunnelEvent('funnel_advanced', funnel, state, stepIndex);
            }
          } else {
            // Timeout - reset funnel state
            this.resetFunnelState(states, funnel.id);
            
            // If this was the first step, start a new funnel
            if (stepIndex === 0) {
              const newState = {
                funnelId: funnel.id,
                currentStep: 0,
                startTime: event.ts,
                stepTimestamps: [event.ts],
                completed: false,
              };
              states.push(newState);
              this.emitFunnelEvent('funnel_started', funnel, newState, stepIndex);
            }
          }
        }
        // If we're at step 0 and there's an existing state, reset and start over
        else if (stepIndex === 0) {
          this.resetFunnelState(states, funnel.id);
          
          const newState = {
            funnelId: funnel.id,
            currentStep: 0,
            startTime: event.ts,
            stepTimestamps: [event.ts],
            completed: false,
          };
          states.push(newState);
          this.emitFunnelEvent('funnel_started', funnel, newState, stepIndex);
        }
        
        break; // Only match one step per event
      }
    }

    // Cleanup old incomplete states (older than any funnel window)
    this.cleanupOldStates(states);
  }

  private eventMatchesStep(event: any, step: FunnelStep): boolean {
    // Check event name
    if (event.name !== step.event) {
      return false;
    }

    // Check conditions
    if (step.where) {
      for (const [key, expectedValue] of Object.entries(step.where)) {
        const actualValue = event.props[key] || event[key];
        
        if (typeof expectedValue === 'string' && expectedValue.startsWith('/') && expectedValue.endsWith('/')) {
          // Regex pattern
          const regex = new RegExp(expectedValue.slice(1, -1));
          if (!regex.test(String(actualValue))) {
            return false;
          }
        } else if (actualValue !== expectedValue) {
          return false;
        }
      }
    }

    return true;
  }

  private emitFunnelEvent(eventType: string, funnel: FunnelDefinition, state: FunnelState, stepIndex: number) {
    const step = funnel.steps[stepIndex];
    const duration = state.stepTimestamps.length > 1 ? 
      state.stepTimestamps[state.stepTimestamps.length - 1] - state.startTime : 0;

    analytics.track(eventType as any, {
      funnel_id: funnel.id,
      funnel_name: funnel.name,
      step_index: stepIndex,
      step_name: step.name || `Step ${stepIndex + 1}`,
      step_event: step.event,
      total_steps: funnel.steps.length,
      duration_ms: duration,
      session_id: analytics.getSessionId(),
    });

    // Emit to dev panel
    window.dispatchEvent(new CustomEvent('funnel:event', { 
      detail: { 
        type: eventType, 
        funnel, 
        state: { ...state }, 
        stepIndex 
      }
    }));
  }

  private resetFunnelState(states: FunnelState[], funnelId: string) {
    const index = states.findIndex(s => s.funnelId === funnelId && !s.completed);
    if (index >= 0) {
      states.splice(index, 1);
    }
  }

  private cleanupOldStates(states: FunnelState[]) {
    const now = Date.now();
    const maxWindow = Math.max(...this.funnels.map(f => f.windowSec)) * 1000;
    
    for (let i = states.length - 1; i >= 0; i--) {
      const state = states[i];
      if (!state.completed && (now - state.startTime) > maxWindow * 2) {
        states.splice(i, 1);
      }
    }
  }

  private persistStates() {
    try {
      const data: Record<string, FunnelState[]> = {};
      this.sessionStates.forEach((states, sessionId) => {
        // Only persist incomplete recent states
        const recentStates = states.filter(state => 
          !state.completed && 
          (Date.now() - state.startTime) < 24 * 60 * 60 * 1000 // 24 hours
        );
        if (recentStates.length > 0) {
          data[sessionId] = recentStates;
        }
      });
      
      localStorage.setItem('neono-funnels', JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to persist funnel states:', error);
    }
  }

  private loadStates() {
    try {
      const stored = localStorage.getItem('neono-funnels');
      if (stored) {
        const data = JSON.parse(stored);
        Object.entries(data).forEach(([sessionId, states]) => {
          this.sessionStates.set(sessionId, states as FunnelState[]);
        });
      }
    } catch (error) {
      console.warn('Failed to load funnel states:', error);
    }
  }

  // Public API
  getFunnelProgress(funnelId: string): FunnelState | null {
    const sessionId = analytics.getSessionId();
    const states = this.sessionStates.get(sessionId) || [];
    return states.find(s => s.funnelId === funnelId && !s.completed) || null;
  }

  getAllFunnelProgress(): Record<string, FunnelState | null> {
    const sessionId = analytics.getSessionId();
    const states = this.sessionStates.get(sessionId) || [];
    const progress: Record<string, FunnelState | null> = {};
    
    for (const funnel of this.funnels) {
      progress[funnel.id] = states.find(s => s.funnelId === funnel.id && !s.completed) || null;
    }
    
    return progress;
  }

  getFunnelDefinitions(): FunnelDefinition[] {
    return [...this.funnels];
  }

  // Get completion stats for dev panel
  getFunnelStats(): Record<string, any> {
    const stats: Record<string, any> = {};
    
    this.sessionStates.forEach((states) => {
      states.forEach(state => {
        if (!stats[state.funnelId]) {
          stats[state.funnelId] = {
            started: 0,
            completed: 0,
            avgDuration: 0,
            stepDropoff: new Array(this.funnels.find(f => f.id === state.funnelId)?.steps.length || 0).fill(0),
          };
        }
        
        const funnelStats = stats[state.funnelId];
        funnelStats.started++;
        
        if (state.completed) {
          funnelStats.completed++;
          const duration = state.stepTimestamps[state.stepTimestamps.length - 1] - state.startTime;
          funnelStats.avgDuration = (funnelStats.avgDuration * (funnelStats.completed - 1) + duration) / funnelStats.completed;
        } else {
          // Track where users drop off
          funnelStats.stepDropoff[state.currentStep]++;
        }
      });
    });
    
    return stats;
  }

  // Force trigger a funnel step for testing
  triggerStep(funnelId: string, stepIndex: number, props: Record<string, any> = {}) {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('triggerStep only available in development');
      return;
    }

    const funnel = this.funnels.find(f => f.id === funnelId);
    if (!funnel || stepIndex >= funnel.steps.length) {
      console.warn('Invalid funnel or step index');
      return;
    }

    const step = funnel.steps[stepIndex];
    const fakeEvent = {
      name: step.event,
      props: { ...props, ...(step.where || {}) },
      ts: Date.now(),
      path: window.location.pathname,
    };

    this.processEvent(fakeEvent);
  }

  // Clear all funnel states (for testing)
  clearStates() {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('clearStates only available in development');
      return;
    }

    this.sessionStates.clear();
    localStorage.removeItem('neono-funnels');
  }
}

// Initialize funnel analyzer
export const funnelAnalyzer = new FunnelAnalyzer();

// Development helpers
if (process.env.NODE_ENV === 'development') {
  (window as any).__funnelAnalyzer = funnelAnalyzer;
}