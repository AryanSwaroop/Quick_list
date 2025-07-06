
import React, { useState, useEffect, useMemo } from 'react';
import { LogOut, Plus, Filter as FilterIcon, Search as SearchIcon } from 'lucide-react';
import TaskForm from './TaskForm.tsx';
import TaskList from './TaskList.tsx';
import TaskFilter from './TaskFilter.tsx';
import { Task, FilterType, PriorityType } from '../types/Task';
import { loadTasks, saveTasks } from '../utils/localStorage';
import { filterAndSortTasks } from '../utils/taskSort';
import TaskSearchBar from './TaskSearchBar';

interface TaskDashboardProps {
  user: string;
  onLogout: () => void;
}

const TaskDashboard: React.FC<TaskDashboardProps> = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (taskData: { title: string; description: string; priority?: PriorityType; dueDate?: string }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date().toISOString(),
      priority: taskData.priority,
      dueDate: taskData.dueDate,
    };
    setTasks(prev => [newTask, ...prev]);
    setShowTaskForm(false);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = useMemo(() => filterAndSortTasks(tasks, { filter, priorityFilter, search }), [tasks, filter, priorityFilter, search]);

  const taskCounts = useMemo(() => ({
    all: filteredTasks.length,
    completed: filteredTasks.filter(t => t.completed).length,
    pending: filteredTasks.filter(t => !t.completed).length,
  }), [filteredTasks]);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Task Tracker</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user}!</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowTaskForm(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 font-medium shadow-md"
          >
            <Plus size={20} />
            Add New Task
          </button>
        </div>

        {/* Search and Priority Filter */}
        <TaskSearchBar
          search={search}
          setSearch={setSearch}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />

        {/* Task Form Modal */}
        {showTaskForm && (
          <TaskForm
            onSubmit={addTask}
            onCancel={() => setShowTaskForm(false)}
          />
        )}

        {/* Filter Tabs */}
        <TaskFilter
          currentFilter={filter}
          onFilterChange={setFilter}
          taskCounts={taskCounts}
        />

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          onUpdate={updateTask}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
};

export default TaskDashboard;
