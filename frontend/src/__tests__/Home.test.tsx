import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/link', () => ({ __esModule: true, default: ({ children, ...props }: any) => <a {...props}>{children}</a> }));
jest.mock('next/router', () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock('@/lib/api', () => ({
  __esModule: true,
  default: { get: jest.fn().mockResolvedValue({ data: [] }) },
}));

import HomePage from '@/pages/index';

describe('HomePage', () => {
  it('renders System Overview heading', async () => {
    render(<HomePage />);
    expect(screen.getByText('System Overview')).toBeInTheDocument();
  });

  it('renders sidebar brand', () => {
    render(<HomePage />);
    expect(screen.getByText('SYNTHWAVE')).toBeInTheDocument();
  });
});