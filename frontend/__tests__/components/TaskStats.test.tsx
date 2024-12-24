import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskStats } from '@/app/components/TaskStats';
import { Task } from '@/app/types/task';

describe('TaskStats', () => {
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
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      status: 'IN_PROGRESS',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '1',
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Description 3',
      status: 'DONE',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '1',
    },
  ];

  it('displays correct task counts', () => {
    render(<TaskStats tasks={mockTasks} />);
    
    const countElements = screen.getAllByText('1');
    expect(countElements).toHaveLength(3);
  });

  it('displays all status categories', () => {
    render(<TaskStats tasks={mockTasks} />);
    
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });
});