import * as React from "react";
import { toast } from '@/hooks/use-toast';

export interface OptimisticState<T> {
  data: T;
  isLoading: boolean;
  error: string | null;
}

export interface OptimisticActions<T> {
  execute: (
    action: () => Promise<T>,
    optimisticUpdate?: (current: T) => T,
    options?: OptimisticOptions
  ) => Promise<void>;
  reset: () => void;
  setData: (data: T) => void;
}

export interface OptimisticOptions {
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  revertOnError?: boolean;
}

/**
 * Hook for optimistic UI updates
 * Immediately updates the UI, then reverts on error
 */
export function useOptimistic<T>(
  initialData: T
): [OptimisticState<T>, OptimisticActions<T>] {
  const [state, setState] = useState<OptimisticState<T>>({
    data: initialData,
    isLoading: false,
    error: null
  });

  const execute = useCallback(async (
    action: () => Promise<T>,
    optimisticUpdate?: (current: T) => T,
    options: OptimisticOptions = {}
  ) => {
    const {
      successMessage,
      errorMessage,
      onSuccess,
      onError,
      revertOnError = true
    } = options;

    // Store original data for potential revert
    const originalData = state.data;
    
    try {
      // Apply optimistic update immediately
      if (optimisticUpdate) {
        setState(prev => ({
          ...prev,
          data: optimisticUpdate(prev.data),
          isLoading: true,
          error: null
        }));
      } else {
        setState(prev => ({
          ...prev,
          isLoading: true,
          error: null
        }));
      }

      // Execute the actual action
      const result = await action();
      
      // Update with real result
      setState(prev => ({
        ...prev,
        data: result,
        isLoading: false,
        error: null
      }));

      // Success feedback
      if (successMessage) {
        toast({
          title: "Success",
          description: successMessage,
        });
      }

      onSuccess?.();

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'An error occurred';
      
      // Revert optimistic update on error
      if (revertOnError && optimisticUpdate) {
        setState(prev => ({
          ...prev,
          data: originalData,
          isLoading: false,
          error: errorMsg
        }));
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMsg
        }));
      }

      // Error feedback
      const displayError = errorMessage || errorMsg;
      toast({
        title: "Error",
        description: displayError,
        variant: "destructive",
      });

      onError?.(error instanceof Error ? error : new Error(errorMsg));
    }
  }, [state.data]);

  const reset = useCallback(() => {
    setState({
      data: initialData,
      isLoading: false,
      error: null
    });
  }, [initialData]);

  const setData = useCallback((data: T) => {
    setState(prev => ({
      ...prev,
      data,
      error: null
    }));
  }, []);

  const actions: OptimisticActions<T> = {
    execute,
    reset,
    setData
  };

  return [state, actions];
}

/**
 * Specialized hook for form submissions with optimistic updates
 */
export function useOptimisticForm<T>(
  initialData: T,
  submitFn: (data: T) => Promise<T>
) {
  const [state, actions] = useOptimistic(initialData);

  const submit = useCallback(async (
    formData: Partial<T>,
    options?: OptimisticOptions
  ) => {
    const optimisticUpdate = (current: T) => ({ ...current, ...formData });
    
    await actions.execute(
      () => submitFn({ ...state.data, ...formData }),
      optimisticUpdate,
      {
        successMessage: "Changes saved successfully",
        errorMessage: "Failed to save changes",
        ...options
      }
    );
  }, [state.data, submitFn, actions]);

  return {
    ...state,
    submit,
    reset: actions.reset,
    setData: actions.setData
  };
}

/**
 * Hook for optimistic list operations (add, remove, update)
 */
export function useOptimisticList<T extends { id: string | number }>(
  initialItems: T[]
) {
  const [state, actions] = useOptimistic(initialItems);

  const addItem = useCallback(async (
    item: Omit<T, 'id'>,
    createFn: (item: Omit<T, 'id'>) => Promise<T>,
    options?: OptimisticOptions
  ) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticItem = { ...item, id: tempId } as T;
    
    await actions.execute(
      async () => {
        const newItem = await createFn(item);
        return state.data.map(i => i.id === tempId ? newItem : i);
      },
      (current) => [...current, optimisticItem],
      {
        successMessage: "Item added successfully",
        ...options
      }
    );
  }, [state.data, actions]);

  const removeItem = useCallback(async (
    id: string | number,
    deleteFn: (id: string | number) => Promise<void>,
    options?: OptimisticOptions
  ) => {
    await actions.execute(
      async () => {
        await deleteFn(id);
        return state.data.filter(item => item.id !== id);
      },
      (current) => current.filter(item => item.id !== id),
      {
        successMessage: "Item removed successfully",
        ...options
      }
    );
  }, [state.data, actions]);

  const updateItem = useCallback(async (
    id: string | number,
    updates: Partial<T>,
    updateFn: (id: string | number, updates: Partial<T>) => Promise<T>,
    options?: OptimisticOptions
  ) => {
    await actions.execute(
      async () => {
        const updatedItem = await updateFn(id, updates);
        return state.data.map(item => item.id === id ? updatedItem : item);
      },
      (current) => current.map(item => 
        item.id === id ? { ...item, ...updates } : item
      ),
      {
        successMessage: "Item updated successfully",
        ...options
      }
    );
  }, [state.data, actions]);

  return {
    items: state.data,
    isLoading: state.isLoading,
    error: state.error,
    addItem,
    removeItem,
    updateItem,
    reset: actions.reset
  };
}