
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  priority?: PriorityType;
  dueDate?: string;
}

export type FilterType = 'all' | 'completed' | 'pending';
export type PriorityType = 'low' | 'medium' | 'high';
