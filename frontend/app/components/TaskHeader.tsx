'use client';

import { TaskDialog } from './TaskDialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { LogOut } from 'lucide-react';

interface TaskHeaderProps {
  onCreateTask: () => void;
}

export function TaskHeader({ onCreateTask }: TaskHeaderProps) {
  const { user, signOut } = useAuth();

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">Task Management</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {user}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <TaskDialog onSubmit={onCreateTask} />
        <Button variant="outline" onClick={signOut} size="icon">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}