import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./saas-ledger/supabase', () => ({
  APP_URL: 'https://saas-operating-ledger.onrender.com',
  supabase: {
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: jest.fn(() => ({ data: { subscription: { unsubscribe: jest.fn() } } })),
    },
  },
}));

test('renders the SaaS Operating Ledger sign-in screen', async () => {
  render(<App />);
  await waitFor(() => expect(screen.getByText(/welcome back/i)).toBeInTheDocument());
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});
