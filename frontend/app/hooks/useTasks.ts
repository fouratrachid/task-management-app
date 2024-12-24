'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import * as TaskAPI from '../api/tasks';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../types/task';

export function useTasks(initialTasks: Task[] = []) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const { toast } = useToast();

  const handleCreateTask = async (taskData: CreateTaskDTO) => {
    try {
      const newTask = await TaskAPI.createTask(taskData);
      setTasks([newTask, ...tasks]);
      toast({
        title: 'Success',
        description: 'Task created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create task',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateTask = async (taskId: string, taskData: UpdateTaskDTO) => {
    try {
      const updatedTask = await TaskAPI.updateTask(taskId, taskData);
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
      toast({
        title: 'Success',
        description: 'Task updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update task',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await TaskAPI.deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
      toast({
        title: 'Success',
        description: 'Task deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete task',
        variant: 'destructive',
      });
    }
  };

  return {
    tasks,
    setTasks,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
  };
}