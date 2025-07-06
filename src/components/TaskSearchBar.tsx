import React from 'react';
import { Filter as FilterIcon, Search as SearchIcon } from 'lucide-react';
import { PriorityType } from '../types/Task';

interface TaskSearchBarProps {
  search: string;
  setSearch: (s: string) => void;
  priorityFilter: 'all' | PriorityType;
  setPriorityFilter: (p: 'all' | PriorityType) => void;
}

const TaskSearchBar: React.FC<TaskSearchBarProps> = ({ search, setSearch, priorityFilter, setPriorityFilter }) => (
  <div className="flex flex-col md:flex-row gap-3 mb-6 items-center">
    <div className="relative w-full md:w-1/2">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search tasks..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
      />
    </div>
    <div className="flex items-center gap-2">
      <FilterIcon className="text-gray-400" size={18} />
      <select
        value={priorityFilter}
        onChange={e => setPriorityFilter(e.target.value as any)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
      >
        <option value="all">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  </div>
);

export default TaskSearchBar; 