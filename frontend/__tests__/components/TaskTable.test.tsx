import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TaskTable } from '@/app/components/TaskTable';
import { Task } from '@/app/types/task';
import '@testing-library/jest-dom';

describe('TaskTable', () => {
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: 'TODO',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '1',
    },
  ];

  const mockHandlers = {
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  it('renders task data correctly', () => {
    render(<TaskTable tasks={mockTasks} {...mockHandlers} />);
    
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('TODO')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<TaskTable tasks={mockTasks} {...mockHandlers} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    expect(mockHandlers.onDelete).toHaveBeenCalledWith('1');
  })
});