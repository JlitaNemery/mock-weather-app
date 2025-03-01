import { render } from 'vitest-browser-react';
import { expect, test, vi, Mock } from 'vitest';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import Toggle from '../components/Toggle';

// Mock useSearchParams
vi.mock('react-router-dom', async (importActual) => {
  const actual = await importActual<typeof import('react-router-dom')>();
  return {
    ...actual,
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
  };
});

test('renders title and buttons', () => {
  const { container } = render(
    <MemoryRouter>
      <Toggle title="Sort Order" optionA="asc" optionB="desc" paramName="sort" />
    </MemoryRouter>
  );

  expect(container.textContent).toContain('Sort Order');
  expect(container.textContent).toContain('asc');
  expect(container.textContent).toContain('desc');
});

test('toggles search param when clicked', () => {
  const setSearchParamsMock = vi.fn();
  (useSearchParams as unknown as Mock).mockReturnValue([new URLSearchParams('sort=asc'), setSearchParamsMock]);

  const { container } = render(
    <MemoryRouter>
      <Toggle title="Sort Order" optionA="asc" optionB="desc" paramName="sort" />
    </MemoryRouter>
  );

  const buttons = container.querySelectorAll('button');
  buttons[1].click();

  expect(setSearchParamsMock).toHaveBeenCalledWith(new URLSearchParams('sort=desc'));
});
