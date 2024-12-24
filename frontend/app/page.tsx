'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './hooks/useAuth';
import { useTasks } from './hooks/useTasks';
import { AuthForm } from './components/AuthForm';
import * as TaskAPI from './api/tasks';
import { TaskHeader } from './components/TaskHeader';
import { TaskStats } from './components/TaskStats';
import { TaskTable } from './components/TaskTable';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const { tasks, setTasks, handleCreateTask, handleUpdateTask, handleDeleteTask } = useTasks();

  useEffect(() => {
    if (user) {
      loadTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [user, setTasks]);

  async function loadTasks() {
    try {
      const fetchedTasks = await TaskAPI.getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load tasks',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  if (authLoading || loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <TaskHeader onCreateTask={handleCreateTask} />
      <TaskStats tasks={tasks} />
      <TaskTable
        tasks={tasks}
        onEdit={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}