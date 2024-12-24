export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export type CreateTaskDTO = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;
export type UpdateTaskDTO = Partial<CreateTaskDTO>;