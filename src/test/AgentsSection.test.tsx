import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AgentsSection from '@/components/AgentsSection';

vi.mock('@/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({ ref: { current: null }, isVisible: true }),
}));

describe('AgentsSection', () => {
  it('shows updated intro copy mentioning core agents', () => {
    render(<MemoryRouter><AgentsSection /></MemoryRouter>);
    expect(screen.getByText(/Three agents are core and always run/i)).toBeInTheDocument();
  });

  it('renders exactly three Core badges', () => {
    render(<MemoryRouter><AgentsSection /></MemoryRouter>);
    const badges = screen.getAllByText('Core');
    expect(badges).toHaveLength(3);
  });

  it('shows Developer note text', () => {
    render(<MemoryRouter><AgentsSection /></MemoryRouter>);
    expect(screen.getByText(/Dynamically dispatched/i)).toBeInTheDocument();
  });

  it('shows Reviewer note text', () => {
    render(<MemoryRouter><AgentsSection /></MemoryRouter>);
    expect(screen.getByText(/Sub-specializes on demand/i)).toBeInTheDocument();
  });
});
