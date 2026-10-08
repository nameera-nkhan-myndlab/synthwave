import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/link', () => ({ __esModule: true, default: ({ children, ...props }: any) => <a {...props}>{children}</a> }));
jest.mock('next/router', () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock('@/lib/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn().mockResolvedValue({ data: [] }),
    post: jest.fn().mockResolvedValue({ data: { id: 1, name: 'A', email: 'a@b.com', message: 'hi', createdAt: '2024-01-01' } }),
  },
}));

import MessagesPage from '@/pages/messages';

describe('MessagesPage', () => {
  it('renders heading', () => {
    render(<MessagesPage />);
    expect(screen.getByText('Transmissions')).toBeInTheDocument();
  });

  it('renders contact form', () => {
    render(<MessagesPage />);
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
  });
});