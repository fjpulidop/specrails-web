import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTheme } from '@/hooks/useTheme';

// Provide a real-enough localStorage shim for the test environment
const makeStorage = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
    clear: () => { store = {}; },
  };
};

describe('useTheme', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', makeStorage());
    delete document.documentElement.dataset.theme;
  });

  it('defaults to dark', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
  });

  it('sets documentElement.dataset.theme on mount', () => {
    renderHook(() => useTheme());
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('toggles to light', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(result.current.theme).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(localStorage.getItem('sr-theme')).toBe('light');
  });

  it('inits from localStorage', () => {
    localStorage.setItem('sr-theme', 'light');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
  });
});
