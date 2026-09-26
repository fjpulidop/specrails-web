import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { DemoVideo } from '@/components/DemoVideo';

const preference = vi.hoisted(() => ({ reduced: false }));
vi.mock('@/hooks/useReducedMotion', () => ({ useReducedMotion: () => preference.reduced }));
let intersect: IntersectionObserverCallback;
const observer = { observe: vi.fn(), disconnect: vi.fn() };
beforeEach(() => {
  preference.reduced = false;
  vi.clearAllMocks();
  vi.stubGlobal('IntersectionObserver', vi.fn(function (callback: IntersectionObserverCallback) { intersect = callback; return observer; }));
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

it('plays only when visible, pauses out of view and disconnects on unmount', async () => {
  const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
  const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  const { container, unmount } = render(<DemoVideo label="Workflow demo" srcBase="/demos/workflow" poster="/poster.png" ready glow aspectRatio="16 / 9" />);
  const video = container.querySelector('video')!;
  expect(observer.observe).toHaveBeenCalledWith(video);
  expect(play).not.toHaveBeenCalled();
  expect([...video.querySelectorAll('source')].map(source => source.getAttribute('src'))).toEqual(['/demos/workflow.webm', '/demos/workflow.mp4']);
  expect(video).toHaveAttribute('poster', '/poster.png');
  await act(async () => intersect([{ isIntersecting: true } as IntersectionObserverEntry], observer as unknown as IntersectionObserver));
  expect(play).toHaveBeenCalledTimes(1);
  expect(screen.queryByText('Demo video')).not.toBeInTheDocument();
  act(() => intersect([{ isIntersecting: false } as IntersectionObserverEntry], observer as unknown as IntersectionObserver));
  expect(pause).toHaveBeenCalledTimes(1);
  unmount(); expect(observer.disconnect).toHaveBeenCalledTimes(1);
});
it('keeps the play affordance when browser autoplay is rejected', async () => {
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockRejectedValue(new Error('Autoplay denied'));
  render(<DemoVideo label="Demo" srcBase="/clip" ready placeholderText="Preview" />);
  await act(async () => intersect([{ isIntersecting: true } as IntersectionObserverEntry], observer as unknown as IntersectionObserver));
  expect(screen.getByText('Preview')).toBeInTheDocument();
});
it('honors reduced motion with the screenshot and never starts an observer', () => {
  preference.reduced = true;
  const { container } = render(<DemoVideo label="Static preview" poster="/poster.png" srcBase="/clip" ready />);
  expect(screen.getByRole('img', { name: 'Static preview' })).toHaveAttribute('src', '/poster.png');
  expect(container.querySelector('video')).toBeNull(); expect(observer.observe).not.toHaveBeenCalled();
});
it.each([false, true])('uses an honest placeholder when no clip source exists (ready=%s)', ready => {
  const { container } = render(<DemoVideo label="Pending" ready={ready} icon={() => <span>Workflow icon</span>} />);
  expect(screen.getByText('Workflow icon')).toBeInTheDocument();
  expect(screen.getByText('Demo video')).toBeInTheDocument();
  expect(container.querySelector('video')).toBeNull();
});
it('supports a placeholder without an optional icon', () => {
  render(<DemoVideo label="Pending" />);
  expect(screen.getByText('Demo video')).toBeInTheDocument();
});
