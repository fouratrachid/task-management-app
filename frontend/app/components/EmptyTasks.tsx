import { ClipboardList } from 'lucide-react';

export function EmptyTasks() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 rounded-lg border-2 border-dashed">
      <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" data-testid="clipboard-list-icon" />
      <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
      <p className="text-muted-foreground">
        Create your first task to get started!
      </p>
    </div>
  );
}