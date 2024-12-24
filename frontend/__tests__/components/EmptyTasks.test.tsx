import { render, screen } from '@testing-library/react';
import { EmptyTasks } from '@/app/components/EmptyTasks';
import '@testing-library/jest-dom';

describe('EmptyTasks', () => {
  it('renders empty state message', () => {
    render(<EmptyTasks />);
    
    expect(screen.getByText('No tasks yet')).toBeInTheDocument();
    expect(screen.getByText('Create your first task to get started!')).toBeInTheDocument();
  });

  it('displays the clipboard icon', () => {
    render(<EmptyTasks />);
    
    const icon = screen.getByTestId('clipboard-list-icon');
    expect(icon).toBeInTheDocument();
  });
});