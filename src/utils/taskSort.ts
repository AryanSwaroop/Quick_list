import { Task, FilterType, PriorityType } from '../types/Task';

interface TaskSortOptions {
  filter: FilterType;
  priorityFilter: 'all' | PriorityType;
  search: string;
}

export function filterAndSortTasks(tasks: Task[], options: TaskSortOptions): Task[] {
  const { filter, priorityFilter, search } = options;
  return tasks
    .filter(task => {
      let matchesFilter = true;
      switch (filter) {
        case 'completed':
          matchesFilter = task.completed;
          break;
        case 'pending':
          matchesFilter = !task.completed;
          break;
        default:
          matchesFilter = true;
      }
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
      if (search && !(task.title.toLowerCase().includes(search.toLowerCase()) || (task.description && task.description.toLowerCase().includes(search.toLowerCase())))) return false;
      return matchesFilter;
    })
    .sort((a, b) => {
      // 1. Not completed first
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      // 2. Priority (high > medium > low)
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority || 'medium'];
      const bPriority = priorityOrder[b.priority || 'medium'];
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      // 3. Date (newest first)
      if (a.createdAt !== b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      // 4. Alphabetical
      return a.title.localeCompare(b.title);
    });
} 