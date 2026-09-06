import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { DocsDropdown } from '@/components/DocsDropdown';
function setup() { render(<MemoryRouter><DocsDropdown /></MemoryRouter>); return userEvent.setup(); }
describe('DocsDropdown', () => {
  it('starts closed with an accessible toggle', () => { setup(); expect(screen.getByRole('button',{name:'Docs'})).toHaveAttribute('aria-expanded','false'); expect(screen.queryByRole('menu')).not.toBeInTheDocument(); });
  it('opens a focused set of current journeys and the full index', async () => {
    const user = setup(); await user.click(screen.getByRole('button',{name:'Docs'}));
    const items = screen.getAllByRole('menuitem'); expect(items).toHaveLength(5);
    expect(screen.getByRole('menuitem',{name:/first mission/i})).toHaveAttribute('href','/docs/missions-first-mission');
    expect(screen.getByRole('menuitem',{name:'Guide overview'})).toHaveAttribute('href','/docs');
  });
  it('supports keyboard opening and escape with focus returned', async () => {
    const user = setup(); const trigger = screen.getByRole('button',{name:'Docs'}); trigger.focus();
    await user.keyboard('{Enter}'); expect(screen.getByRole('menu')).toBeInTheDocument();
    await user.keyboard('{Escape}'); expect(screen.queryByRole('menu')).not.toBeInTheDocument(); expect(trigger).toHaveFocus();
  });
  it('closes when a journey is selected', async () => {
    const user = setup(); await user.click(screen.getByRole('button',{name:'Docs'}));
    await user.click(screen.getByRole('menuitem',{name:'Guide overview'})); expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
