import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@/lib/api', () => ({
  __esModule: true,
  default: { post: jest.fn() },
}));

jest.mock('lucide-react', () => ({
  MessageCircle: (props: any) => <span data-testid="msg-icon" {...props} />,
  X: (props: any) => <span data-testid="x-icon" {...props} />,
  Send: (props: any) => <span data-testid="send-icon" {...props} />,
  Loader2: (props: any) => <span data-testid="loader-icon" {...props} />,
}));

import ChatWidget from '@/components/ChatWidget';
import apiClient from '@/lib/api';

describe('ChatWidget', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders FAB and opens panel on click', () => {
    render(<ChatWidget />);
    const fab = screen.getByLabelText('Open AI Chat');
    expect(fab).toBeInTheDocument();
    fireEvent.click(fab);
    expect(screen.getByText(/SYNTH_AI/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter transmission...')).toBeInTheDocument();
  });

  it('sends message and displays reply', async () => {
    (apiClient.post as jest.Mock).mockResolvedValue({ data: { reply: 'Hello operator!' } });
    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText('Open AI Chat'));
    const input = screen.getByPlaceholderText('Enter transmission...');
    fireEvent.change(input, { target: { value: 'Hi there' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => expect(screen.getByText('Hello operator!')).toBeInTheDocument());
  });

  it('shows error message on API failure', async () => {
    (apiClient.post as jest.Mock).mockRejectedValue(new Error('fail'));
    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText('Open AI Chat'));
    const input = screen.getByPlaceholderText('Enter transmission...');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => expect(screen.getByText(/Signal disrupted/)).toBeInTheDocument());
  });
});