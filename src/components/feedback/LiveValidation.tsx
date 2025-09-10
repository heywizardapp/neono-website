import * as React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ValidationRule = {
  test: (value: string) => boolean;
  message: string;
  level?: 'error' | 'warning';
};

export interface LiveValidationProps {
  children: React.ReactElement;
  rules?: ValidationRule[];
  validateOnMount?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  showSuccess?: boolean;
  debounceMs?: number;
  className?: string;
  errorClassName?: string;
  successClassName?: string;
  messageClassName?: string;
  onValidationChange?: (isValid: boolean, errors: string[]) => void;
}

export function LiveValidation({
  children,
  rules = [],
  validateOnMount = false,
  validateOnChange = true,
  validateOnBlur = true,
  showSuccess = false,
  debounceMs = 300,
  className,
  errorClassName,
  successClassName,
  messageClassName,
  onValidationChange
}: LiveValidationProps) {
  const [value, setValue] = React.useState('');
  const [errors, setErrors] = React.useState<string[]>([]);
  const [warnings, setWarnings] = React.useState<string[]>([]);
  const [hasBeenTouched, setHasBeenTouched] = React.useState(false);
  const [showValidation, setShowValidation] = React.useState(validateOnMount);
  const debounceRef = React.useRef<NodeJS.Timeout>();

  // Validate the current value
  const validate = React.useCallback((currentValue: string) => {
    const newErrors: string[] = [];
    const newWarnings: string[] = [];

    rules.forEach(rule => {
      if (!rule.test(currentValue)) {
        if (rule.level === 'warning') {
          newWarnings.push(rule.message);
        } else {
          newErrors.push(rule.message);
        }
      }
    });

    setErrors(newErrors);
    setWarnings(newWarnings);

    const isValid = newErrors.length === 0;
    onValidationChange?.(isValid, newErrors);

    return isValid;
  }, [rules, onValidationChange]);

  // Debounced validation
  const debouncedValidate = React.useCallback((currentValue: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      validate(currentValue);
    }, debounceMs);
  }, [validate, debounceMs]);

  // Handle value changes
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (validateOnChange && (hasBeenTouched || showValidation)) {
      debouncedValidate(newValue);
    }

    // Call original onChange if it exists
    const originalOnChange = children.props.onChange;
    if (originalOnChange) {
      originalOnChange(e);
    }
  }, [validateOnChange, hasBeenTouched, showValidation, debouncedValidate, children.props.onChange]);

  // Handle blur events
  const handleBlur = React.useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHasBeenTouched(true);
    setShowValidation(true);

    if (validateOnBlur) {
      validate(e.target.value);
    }

    // Call original onBlur if it exists
    const originalOnBlur = children.props.onBlur;
    if (originalOnBlur) {
      originalOnBlur(e);
    }
  }, [validateOnBlur, validate, children.props.onBlur]);

  // Handle focus events
  const handleFocus = React.useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Call original onFocus if it exists
    const originalOnFocus = children.props.onFocus;
    if (originalOnFocus) {
      originalOnFocus(e);
    }
  }, [children.props.onFocus]);

  // Initialize value from children props
  React.useEffect(() => {
    const initialValue = children.props.value || children.props.defaultValue || '';
    setValue(initialValue);

    if (validateOnMount && initialValue) {
      validate(initialValue);
      setShowValidation(true);
    }
  }, [children.props.value, children.props.defaultValue, validateOnMount, validate]);

  // Cleanup debounce on unmount
  React.useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Determine validation state
  const hasErrors = errors.length > 0;
  const hasWarnings = warnings.length > 0;
  const isValid = !hasErrors && hasBeenTouched && value.length > 0;
  const shouldShowValidation = showValidation || hasBeenTouched;

  // Generate unique IDs for accessibility
  const inputId = children.props.id || `input-${React.useId()}`;
  const errorId = `${inputId}-error`;
  const descriptionId = `${inputId}-description`;

  // Clone children with enhanced props
  const enhancedChildren = React.cloneElement(children, {
    id: inputId,
    value: value,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    'aria-invalid': shouldShowValidation && hasErrors,
    'aria-describedby': cn(
      children.props['aria-describedby'],
      shouldShowValidation && (hasErrors || hasWarnings) ? errorId : null,
      children.props.description ? descriptionId : null
    ).trim() || undefined,
    className: cn(
      children.props.className,
      shouldShowValidation && hasErrors && errorClassName,
      shouldShowValidation && isValid && showSuccess && successClassName
    )
  });

  return (
    <div className={cn('space-y-2', className)}>
      {/* Input field */}
      {enhancedChildren}

      {/* Validation messages */}
      {shouldShowValidation && (hasErrors || hasWarnings || (showSuccess && isValid)) && (
        <div
          id={errorId}
          className={cn(
            'flex items-start gap-2 text-sm',
            messageClassName
          )}
          role={hasErrors ? 'alert' : 'status'}
          aria-live="polite"
        >
          {/* Error state */}
          {hasErrors && (
            <>
              <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                {errors.map((error, index) => (
                  <div key={index} className="text-destructive">
                    {error}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Warning state */}
          {!hasErrors && hasWarnings && (
            <>
              <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                {warnings.map((warning, index) => (
                  <div key={index} className="text-yellow-600 dark:text-yellow-400">
                    {warning}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Success state */}
          {!hasErrors && !hasWarnings && showSuccess && isValid && (
            <>
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="text-green-600 dark:text-green-400">
                Looks good!
              </div>
            </>
          )}
        </div>
      )}

      {/* Real-time validation indicators */}
      {shouldShowValidation && (
        <div className="flex gap-2 text-xs text-muted-foreground">
          {rules.map((rule, index) => {
            const isValid = rule.test(value);
            const isError = rule.level !== 'warning';
            
            return (
              <div
                key={index}
                className={cn(
                  'flex items-center gap-1 transition-colors',
                  isValid && 'text-green-500',
                  !isValid && isError && 'text-destructive',
                  !isValid && !isError && 'text-yellow-500'
                )}
              >
                <div className={cn(
                  'w-1.5 h-1.5 rounded-full transition-colors',
                  isValid && 'bg-green-500',
                  !isValid && isError && 'bg-destructive',
                  !isValid && !isError && 'bg-yellow-500'
                )} />
                <span className="sr-only">
                  {isValid ? 'Valid: ' : 'Invalid: '}{rule.message}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Common validation rules
export const validationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    test: (value) => value.trim().length > 0,
    message
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    test: (value) => value.length >= min,
    message: message || `Must be at least ${min} characters`
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    test: (value) => value.length <= max,
    message: message || `Must be no more than ${max} characters`
  }),

  email: (message = 'Please enter a valid email address'): ValidationRule => ({
    test: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    message
  }),

  phone: (message = 'Please enter a valid phone number'): ValidationRule => ({
    test: (value) => {
      const phoneRegex = /^[\+]?[(]?\d{1,4}[)]?[-\s\.]?\d{1,4}[-\s\.]?\d{1,9}$/;
      return phoneRegex.test(value.replace(/\s/g, ''));
    },
    message
  }),

  url: (message = 'Please enter a valid URL'): ValidationRule => ({
    test: (value) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message
  }),

  strongPassword: (message = 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character'): ValidationRule => ({
    test: (value) => {
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return strongPasswordRegex.test(value);
    },
    message
  }),

  numeric: (message = 'Please enter only numbers'): ValidationRule => ({
    test: (value) => /^\d+$/.test(value),
    message
  }),

  alphanumeric: (message = 'Please enter only letters and numbers'): ValidationRule => ({
    test: (value) => /^[a-zA-Z0-9]+$/.test(value),
    message
  }),

  noSpaces: (message = 'Spaces are not allowed'): ValidationRule => ({
    test: (value) => !/\s/.test(value),
    message
  }),

  custom: (testFn: (value: string) => boolean, message: string, level: 'error' | 'warning' = 'error'): ValidationRule => ({
    test: testFn,
    message,
    level
  })
};

// Hook for form-level validation
export function useFormValidation<T extends Record<string, string>>(
  initialValues: T,
  validationSchema: Record<keyof T, ValidationRule[]>
) {
  const [values, setValues] = React.useState<T>(initialValues);
  const [errors, setErrors] = React.useState<Partial<Record<keyof T, string[]>>>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = React.useCallback((name: keyof T, value: string) => {
    const fieldRules = validationSchema[name] || [];
    const fieldErrors: string[] = [];

    fieldRules.forEach(rule => {
      if (!rule.test(value) && rule.level !== 'warning') {
        fieldErrors.push(rule.message);
      }
    });

    setErrors(prev => ({
      ...prev,
      [name]: fieldErrors
    }));

    return fieldErrors.length === 0;
  }, [validationSchema]);

  const validateAll = React.useCallback(() => {
    const allErrors: Partial<Record<keyof T, string[]>> = {};
    let isValid = true;

    Object.entries(values).forEach(([name, value]) => {
      const fieldRules = validationSchema[name as keyof T] || [];
      const fieldErrors: string[] = [];

      fieldRules.forEach(rule => {
        if (!rule.test(value as string) && rule.level !== 'warning') {
          fieldErrors.push(rule.message);
        }
      });

      if (fieldErrors.length > 0) {
        allErrors[name as keyof T] = fieldErrors;
        isValid = false;
      }
    });

    setErrors(allErrors);
    return isValid;
  }, [values, validationSchema]);

  const setValue = React.useCallback((name: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      validateField(name, value);
    }
  }, [touched, validateField]);

  const setFieldTouched = React.useCallback((name: keyof T, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  }, []);

  const reset = React.useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    setValue,
    setTouched,
    validateField,
    validateAll,
    reset,
    isValid: Object.keys(errors).length === 0
  };
}