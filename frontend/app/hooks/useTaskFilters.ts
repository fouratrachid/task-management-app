'use client';

import { useState, useMemo } from 'react';
import { Task, TaskStatus } from '../types/task';

export function useTaskFilters(tasks: Task[]) {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | null>(null);

  const filteredTasks = useMemo(() => {
    if (!statusFilter) return tasks;
    return tasks.filter((task) => task.status === statusFilter);
  }, [tasks, statusFilter]);

  return {
    filteredTasks,
    statusFilter,
    setStatusFilter,
  };
}