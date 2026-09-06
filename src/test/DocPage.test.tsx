import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, Link } from 'react-router-dom';
import DocPage from '@/pages/DocPage';
import { I18nProvider } from '@/lib/i18n';
import { loadDocContent } from '@/lib/docs-registry';
vi.mock('@/lib/docs-registry', async original => ({...await original<typeof import('@/lib/docs-registry')>(), loadDocContent: vi.fn()}));
const load = vi.mocked(loadDocContent);
function setup(path='/docs/getting-started') {
  return render(<I18nProvider><MemoryRouter initialEntries={[path]}><Link to="/docs/missions-first-mission">Switch mission</Link><Routes><Route path="/docs/:slug" element={<DocPage />} /></Routes></MemoryRouter></I18nProvider>);
}
beforeEach(()=>{window.localStorage.clear(); load.mockReset().mockResolvedValue('# Loaded article\n\n## Example\n\nCurrent content.');});
describe('DocPage',()=>{
  it('loads a valid article before displaying its text and navigation',async()=>{setup(); expect(screen.getByRole('status')).toHaveTextContent('Loading guide'); expect(await screen.findByRole('heading',{name:'Loaded article'})).toBeInTheDocument(); expect(screen.getByRole('link',{name:/Next Install and connect/i})).toHaveAttribute('href','/docs/getting-started-installing-and-first-run');});
  it('returns an index link for an unknown route without loading',()=>{setup('/docs/unknown');expect(screen.getByRole('heading',{name:'Guide not found'})).toBeInTheDocument();expect(screen.getByRole('link',{name:'Guide overview'})).toHaveAttribute('href','/docs');expect(load).not.toHaveBeenCalled();});
  it('marks an English fallback while keeping interface copy localized',async()=>{
    window.localStorage.setItem('specrails-web:language','fr');setup('/docs/pipeline-the-loop-builder');
    expect(await screen.findByRole('heading',{name:'Loaded article'})).toBeInTheDocument();
    expect(screen.getByRole('note')).toHaveTextContent('version anglaise actuelle');expect(document.querySelector('article')).toHaveAttribute('lang','en');
  });
  it('offers a working retry after an article chunk fails',async()=>{
    load.mockRejectedValueOnce(new Error('offline')); const user=userEvent.setup();setup();
    expect(await screen.findByRole('alert')).toHaveTextContent('could not be loaded');await user.click(screen.getByRole('button',{name:'Try again'}));
    expect(await screen.findByRole('heading',{name:'Loaded article'})).toBeInTheDocument();expect(load).toHaveBeenCalledTimes(2);
  });
  it('ignores an older article response after navigation',async()=>{
    let resolveOld!:(value:string)=>void;
    load.mockImplementationOnce(()=>new Promise(resolve=>{resolveOld=resolve;})).mockResolvedValueOnce('# New mission');
    const user=userEvent.setup();setup();await user.click(screen.getByRole('link',{name:'Switch mission'}));expect(await screen.findByRole('heading',{name:'New mission'})).toBeInTheDocument();
    await act(async()=>resolveOld('# Obsolete guide'));expect(screen.queryByRole('heading',{name:'Obsolete guide'})).not.toBeInTheDocument();
  });
  it('preserves a requested section after asynchronous loading',async()=>{
    const scroll=vi.spyOn(Element.prototype,'scrollIntoView');setup('/docs/getting-started#example');await screen.findByRole('heading',{name:/Example/});expect(scroll).toHaveBeenCalledWith({block:'start'});scroll.mockRestore();
  });
});
