import { render } from 'vitest-browser-react';
import { expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Select from '../components/Select';
import { fireEvent } from '@testing-library/react';

// Mock `useSearchParams`
const setSearchParamsMock = vi.fn();
vi.mock('react-router-dom', async (importActual) => {
  const actual = await importActual<typeof import('react-router-dom')>();
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams(), setSearchParamsMock],
  };
});

// Sample Props
const sampleProps = {
  title: 'Select City',
  list: ['New York', 'Paris', 'London'],
  paramName: 'city',
  defaultValue: 'Any',
};

test('renders title and options', () => {
  const { container } = render(
    <MemoryRouter>
      <Select {...sampleProps} />
    </MemoryRouter>
  );

  expect(container.textContent).toContain('Select City');
  expect(container.textContent).toContain('Any');
  expect(container.textContent).toContain('New York');
  expect(container.textContent).toContain('Paris');
  expect(container.textContent).toContain('London');
});

test('defaults to correct value', () => {
  const { container } = render(
    <MemoryRouter>
      <Select {...sampleProps} />
    </MemoryRouter>
  );

  const select = container.querySelector('select') as HTMLSelectElement;
  expect(select.value).toBe('Any'); // Default value
});

test('updates search param when an option is selected', () => {
  const { container } = render(
    <MemoryRouter>
      <Select {...sampleProps} />
    </MemoryRouter>
  );

  const select = container.querySelector('select') as HTMLSelectElement;

  fireEvent.change(select, { target: { value: 'Paris' } });

  expect(setSearchParamsMock).toHaveBeenCalledWith(new URLSearchParams('city=Paris'));
});
