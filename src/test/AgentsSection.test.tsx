import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AgentsSection from '@/components/AgentsSection';
import { AGENTS } from '@/data/agents';

vi.mock('@/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({ ref: { current: null }, isVisible: true }),
}));

const CORE_AGENTS = AGENTS.filter((a) => a.core);

const renderSection = () =>
  render(
    <MemoryRouter>
      <AgentsSection />
    </MemoryRouter>,
  );

describe('AgentsSection', () => {
  it('shows updated intro copy mentioning the core agents', () => {
    renderSection();
    expect(
      screen.getByText(/Three agents are core and always run/i),
    ).toBeInTheDocument();
  });

  it('renders one "core" badge per core agent in the data', () => {
    renderSection();
    // Three agents are flagged core in the data: Architect, Developer, Reviewer.
    expect(CORE_AGENTS).toHaveLength(3);
    const badges = screen.getAllByText('core', { selector: 'span' });
    expect(badges).toHaveLength(CORE_AGENTS.length);
  });

  it('renders a clickable card for every core agent', () => {
    renderSection();
    for (const agent of CORE_AGENTS) {
      // Anchor on the start of the accessible name so "Reviewer" does not also
      // match "Frontend Reviewer" / "Backend Reviewer" cards.
      expect(
        screen.getByRole('button', { name: new RegExp(`^${agent.name}\\b`, 'i') }),
      ).toBeInTheDocument();
    }
  });

  it('surfaces the Developer note in the detail drawer', async () => {
    const user = userEvent.setup();
    renderSection();

    // Developer note text lives in the per-agent drawer, opened by clicking the card.
    await user.click(
      screen.getByRole('button', { name: /^Developer\b/i }),
    );

    const drawer = await screen.findByRole('dialog');
    expect(within(drawer).getByText(/Dynamically dispatched/i)).toBeInTheDocument();
  });

  it('surfaces the Reviewer note in the detail drawer', async () => {
    const user = userEvent.setup();
    renderSection();

    await user.click(
      screen.getByRole('button', { name: /^Reviewer\b/i }),
    );

    const drawer = await screen.findByRole('dialog');
    expect(
      within(drawer).getByText(/Sub-specializes on demand/i),
    ).toBeInTheDocument();
  });

  it('exposes a stat chip for the full agent count', () => {
    renderSection();
    expect(screen.getByText(String(AGENTS.length))).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: new RegExp(`Compare all ${AGENTS.length} agents`, 'i') }),
    ).toBeInTheDocument();
  });
});
