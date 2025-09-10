import { analytics } from './core';

interface FormField {
  name: string;
  type: string;
  required: boolean;
}

class FormAnalytics {
  private trackedForms = new WeakSet<HTMLFormElement>();
  private fieldTimers = new Map<string, number>();
  private formStartTimes = new Map<string, number>();
  private enabled = false;
  private reducedData = false;

  constructor() {
    this.reducedData = this.checkReducedData();
    
    if (!this.reducedData) {
      this.setupFormTracking();
      
      // Enable when analytics consent given
      window.addEventListener('analytics:enabled', () => {
        this.enabled = true;
      });

      // Check initial consent
      this.checkInitialConsent();
    }
  }

  private checkReducedData(): boolean {
    return typeof window !== 'undefined' && 
           window.matchMedia && 
           window.matchMedia('(prefers-reduced-data: reduce)').matches;
  }

  private checkInitialConsent() {
    try {
      const consent = localStorage.getItem('neono-consent');
      if (consent) {
        const parsed = JSON.parse(consent);
        this.enabled = parsed.analytics === true;
      }
    } catch {
      // Ignore
    }
  }

  private setupFormTracking() {
    if (typeof window === 'undefined') return;

    // Use delegation to handle dynamically added forms
    document.addEventListener('focusin', this.handleFieldFocus.bind(this), true);
    document.addEventListener('focusout', this.handleFieldBlur.bind(this), true);
    document.addEventListener('submit', this.handleFormSubmit.bind(this), true);
    document.addEventListener('invalid', this.handleFieldError.bind(this), true);
    
    // Track form abandonment
    window.addEventListener('beforeunload', this.handlePageUnload.bind(this));
  }

  private handleFieldFocus(e: Event) {
    if (!this.enabled) return;
    
    const field = e.target as HTMLElement;
    const form = field.closest('form');
    
    if (!this.isTrackableField(field) || !form) return;

    const fieldName = this.getFieldName(field);
    const formId = this.getFormId(form);
    
    // Track first interaction with form
    if (!this.formStartTimes.has(formId)) {
      this.formStartTimes.set(formId, Date.now());
    }
    
    // Track field focus time
    this.fieldTimers.set(fieldName, Date.now());
    
    analytics.track('form_focus', {
      form_id: formId,
      field_name: fieldName,
      field_type: this.getFieldType(field),
      field_required: this.isFieldRequired(field),
    });
  }

  private handleFieldBlur(e: Event) {
    if (!this.enabled) return;
    
    const field = e.target as HTMLElement;
    if (!this.isTrackableField(field)) return;

    const fieldName = this.getFieldName(field);
    const startTime = this.fieldTimers.get(fieldName);
    
    if (startTime) {
      const focusTime = Date.now() - startTime;
      this.fieldTimers.delete(fieldName);
      
      // Only track if focused for more than 100ms (avoid accidental focus)
      if (focusTime > 100) {
        analytics.track('form_focus', {
          field_name: fieldName,
          focus_time: focusTime,
        });
      }
    }
  }

  private handleFormSubmit(e: Event) {
    if (!this.enabled) return;
    
    const form = e.target as HTMLFormElement;
    if (!form || this.trackedForms.has(form)) return;
    
    this.trackedForms.add(form);
    const formId = this.getFormId(form);
    const startTime = this.formStartTimes.get(formId);
    
    analytics.track('form_submit', {
      form_id: formId,
      form_fields: this.getFormFields(form),
      completion_time: startTime ? Date.now() - startTime : null,
    });
    
    // Clean up
    this.formStartTimes.delete(formId);
  }

  private handleFieldError(e: Event) {
    if (!this.enabled) return;
    
    const field = e.target as HTMLElement;
    const form = field.closest('form');
    
    if (!this.isTrackableField(field) || !form) return;

    analytics.track('form_error', {
      form_id: this.getFormId(form),
      field_name: this.getFieldName(field),
      field_type: this.getFieldType(field),
      error_message: this.getFieldErrorMessage(field),
    });
  }

  private handlePageUnload() {
    if (!this.enabled) return;
    
    // Track form abandonment for forms that were started but not submitted
    this.formStartTimes.forEach((startTime, formId) => {
      analytics.track('form_abandon', {
        form_id: formId,
        time_spent: Date.now() - startTime,
      });
    });
  }

  private isTrackableField(element: HTMLElement): boolean {
    return element instanceof HTMLInputElement ||
           element instanceof HTMLTextAreaElement ||
           element instanceof HTMLSelectElement;
  }

  private getFieldName(field: HTMLElement): string {
    return (field as any).name || 
           (field as any).id || 
           field.getAttribute('data-field-name') || 
           'unnamed';
  }

  private getFieldType(field: HTMLElement): string {
    if (field instanceof HTMLInputElement) {
      return field.type;
    } else if (field instanceof HTMLTextAreaElement) {
      return 'textarea';
    } else if (field instanceof HTMLSelectElement) {
      return 'select';
    }
    return 'unknown';
  }

  private isFieldRequired(field: HTMLElement): boolean {
    return (field as any).required || field.hasAttribute('required');
  }

  private getFormId(form: HTMLFormElement): string {
    return form.id || 
           form.getAttribute('data-form-id') || 
           form.className || 
           `form-${Array.from(document.forms).indexOf(form)}`;
  }

  private getFormFields(form: HTMLFormElement): FormField[] {
    const fields: FormField[] = [];
    const elements = form.querySelectorAll('input, textarea, select');
    
    elements.forEach(element => {
      if (this.isTrackableField(element as HTMLElement)) {
        fields.push({
          name: this.getFieldName(element as HTMLElement),
          type: this.getFieldType(element as HTMLElement),
          required: this.isFieldRequired(element as HTMLElement),
        });
      }
    });
    
    return fields;
  }

  private getFieldErrorMessage(field: HTMLElement): string {
    // Look for common error message patterns
    const form = field.closest('form');
    const fieldName = this.getFieldName(field);
    
    // Check for ARIA describedby
    const describedBy = field.getAttribute('aria-describedby');
    if (describedBy) {
      const errorElement = document.getElementById(describedBy);
      if (errorElement && errorElement.textContent) {
        return errorElement.textContent.trim();
      }
    }
    
    // Check for next sibling error message
    const nextElement = field.nextElementSibling;
    if (nextElement && nextElement.classList.contains('error')) {
      return nextElement.textContent?.trim() || 'error';
    }
    
    // Check for validation message
    if ('validationMessage' in field) {
      return (field as any).validationMessage || 'validation_error';
    }
    
    return 'unknown_error';
  }

  // Manual tracking for custom forms
  trackForm(form: HTMLFormElement) {
    if (this.trackedForms.has(form)) return;
    
    const formId = this.getFormId(form);
    this.formStartTimes.set(formId, Date.now());
  }
}

// Global form analytics
export const formAnalytics = new FormAnalytics();