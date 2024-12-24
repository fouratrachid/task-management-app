import { renderHook, act } from '@testing-library/react';
import { useTaskFilters } from '@/app/hooks/useTaskFilters';
import { Task, TaskStatus } from '@/app/types/task';

describe('useTaskFilters', () => {
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
  ];

  it('returns all tasks when no filter is set', () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));
    
    expect(result.current.filteredTasks).toHaveLength(2);
    expect(result.current.statusFilter).toBeNull();
  });

  it('filters tasks by status', () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));
    
    act(() => {
      result.current.setStatusFilter('TODO' as TaskStatus);
    });
    
    expect(result.current.filteredTasks).toHaveLength(1);
    expect(result.current.filteredTasks[0].status).toBe('TODO');
  });

  it('updates filtered tasks when tasks prop changes', () => {
    const { result, rerender } = renderHook(
      ({ tasks }) => useTaskFilters(tasks),
      { initialProps: { tasks: mockTasks } }
    );
    
    const newTasks: Task[] = [...mockTasks, {
      id: '3',
      title: 'Task 3',
      description: 'Description 3',
      status: 'TODO',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '1',
    }];
    
    rerender({ tasks: newTasks });
    
    expect(result.current.filteredTasks).toHaveLength(3);
  });
});