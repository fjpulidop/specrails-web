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

// Stub matchMedia so `prefers-color-scheme: dark` resolves to `dark`.
const stubPrefersDark = (prefersDark: boolean) => {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('dark') ? prefersDark : false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }));
};

describe('useTheme', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', makeStorage());
    delete document.documentElement.dataset.theme;
    stubPrefersDark(false);
  });

  it('defaults to the system preference (dark when the OS prefers dark)', () => {
    stubPrefersDark(true);
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
  });

  it('defaults to light when the OS prefers light and no choice is stored', () => {
    stubPrefersDark(false);
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
  });

  it('sets documentElement.dataset.theme on mount', () => {
    stubPrefersDark(true);
    renderHook(() => useTheme());
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('toggles to light', () => {
    stubPrefersDark(true);
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(result.current.theme).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('persists to localStorage', () => {
    stubPrefersDark(true);
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(localStorage.getItem('sr-theme')).toBe('light');
  });

  it('inits from localStorage, overriding the system preference', () => {
    stubPrefersDark(true);
    localStorage.setItem('sr-theme', 'light');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
  });
});
