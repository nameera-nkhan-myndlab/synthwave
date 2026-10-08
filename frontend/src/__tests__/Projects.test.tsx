import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/link', () => ({ __esModule: true, default: ({ children, ...props }: any) => <a {...props}>{children}</a> }));
jest.mock('next/router', () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock('@/lib/api', () => ({
  __esModule: true,
  default: { get: jest.fn().mockResolvedValue({ data: [{ id: 1, title: 'TestProj', description: 'desc', featured: true, sortOrder: 0, projectSkills: [{ id: 1, skill: { id: 1, name: 'Python', category: 'language' } }] }] }) },
}));

import ProjectsPage from '@/pages/projects';

describe('ProjectsPage', () => {
  it('renders heading', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('Constructs Database')).toBeInTheDocument();
  });
});