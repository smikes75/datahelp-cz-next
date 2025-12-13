'use client';

/**
 * Hook pro automaticke ukladani do localStorage
 * Uklada data kazdych X sekund pokud doslo ke zmene
 */

import { useState, useEffect, useCallback, useRef } from 'react';

interface AutosaveOptions {
  key: string;           // Unikatni klic pro localStorage
  interval?: number;     // Interval v ms (default 30s)
  enabled?: boolean;     // Povolit autosave
}

interface AutosaveReturn<T> {
  data: T;
  setData: (data: T | ((prev: T) => T)) => void;
  lastSaved: Date | null;
  hasUnsavedChanges: boolean;
  clearSaved: () => void;
  restoreFromSaved: () => boolean;
  hasSavedData: boolean;
}

export function useAutosave<T>(
  initialData: T,
  options: AutosaveOptions
): AutosaveReturn<T> {
  const { key, interval = 30000, enabled = true } = options;

  const [data, setDataInternal] = useState<T>(initialData);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [hasSavedData, setHasSavedData] = useState(false);

  const initialDataRef = useRef(initialData);
  const dataRef = useRef(data);

  // Update ref when data changes
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  // Check for saved data on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem(`autosave_${key}`);
    setHasSavedData(!!saved);
  }, [key]);

  // Set data and mark as unsaved
  const setData = useCallback((newData: T | ((prev: T) => T)) => {
    setDataInternal(prev => {
      const value = typeof newData === 'function'
        ? (newData as (prev: T) => T)(prev)
        : newData;
      return value;
    });
    setHasUnsavedChanges(true);
  }, []);

  // Save to localStorage
  const saveToLocalStorage = useCallback(() => {
    if (typeof window === 'undefined' || !enabled) return;

    try {
      const saveData = {
        data: dataRef.current,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(`autosave_${key}`, JSON.stringify(saveData));
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      setHasSavedData(true);
    } catch (error) {
      console.error('Autosave error:', error);
    }
  }, [key, enabled]);

  // Autosave interval
  useEffect(() => {
    if (!enabled || !hasUnsavedChanges) return;

    const timer = setInterval(() => {
      if (hasUnsavedChanges) {
        saveToLocalStorage();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [enabled, hasUnsavedChanges, interval, saveToLocalStorage]);

  // Save on window close
  useEffect(() => {
    if (typeof window === 'undefined' || !enabled) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        saveToLocalStorage();
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [enabled, hasUnsavedChanges, saveToLocalStorage]);

  // Clear saved data
  const clearSaved = useCallback(() => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`autosave_${key}`);
    setHasSavedData(false);
    setLastSaved(null);
  }, [key]);

  // Restore from saved data
  const restoreFromSaved = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;

    try {
      const saved = localStorage.getItem(`autosave_${key}`);
      if (!saved) return false;

      const { data: savedData, timestamp } = JSON.parse(saved);
      setDataInternal(savedData);
      setLastSaved(new Date(timestamp));
      setHasUnsavedChanges(false);
      return true;
    } catch (error) {
      console.error('Restore error:', error);
      return false;
    }
  }, [key]);

  return {
    data,
    setData,
    lastSaved,
    hasUnsavedChanges,
    clearSaved,
    restoreFromSaved,
    hasSavedData
  };
}
