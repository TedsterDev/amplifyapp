import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { App } from './App';

test('renders the signed-in heading', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /we now have auth!/i })
  ).toBeInTheDocument();
});

test('sign out button calls the signOut handler', async () => {
  const signOut = vi.fn();
  render(<App signOut={signOut} />);

  await userEvent.click(screen.getByRole('button', { name: /sign out/i }));

  expect(signOut).toHaveBeenCalledTimes(1);
});
