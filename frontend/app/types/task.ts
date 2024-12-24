export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  createdAt: Date;
  updatedAt: Date;
  userId: string; // Add userId field
}

export type CreateTaskDTO = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;
export type UpdateTaskDTO = Partial<CreateTaskDTO>;