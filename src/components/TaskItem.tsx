
import React, { useState } from 'react';
import { Edit2, Trash2, Calendar, Check, Flag } from 'lucide-react';
/**
 * @typedef {import('../types/Task').Task} Task
 * @typedef {import('../types/Task').PriorityType} PriorityType
 * @param {{
 *   task: Task,
 *   onUpdate: (id: string, updates: Partial<Task>) => void,
 *   onDelete: (id: string) => void,
 *   onToggleComplete: (id: string) => void,
 *   isLast: boolean
 * }} props
 */
const TaskItem = ({
  task,
  onUpdate,
  onDelete,
  onToggleComplete,
  isLast
}) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = (updates) => {
    onUpdate(task.id, updates);
    setShowEditForm(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <div className={`p-4 hover:bg-gray-50 transition-colors duration-200 ${isLast ? '' : 'border-b border-gray-100'}`}>
        <div className="flex items-start gap-4">
          {/* Completion Checkbox */}
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-indigo-400'
            }`}
          >
            {task.completed && <Check size={16} />}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-semibold mb-2 ${
              task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`text-sm mb-3 ${
                task.completed ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            )}

            <div className="flex items-center text-xs text-gray-500 gap-4 mt-2">
              <Calendar size={14} className="mr-1" />
              Created {formatDate(task.createdAt)}
              {task.dueDate && (
                <span className="flex items-center ml-4">
                  <Calendar size={14} className="mr-1 text-indigo-400" />
                  Due {formatDate(task.dueDate)}
                </span>
              )}
              {task.priority && (
                <span className={`flex items-center ml-4 gap-1 font-semibold ${
                  task.priority === 'high' ? 'text-red-600' : task.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  <Flag size={14} />
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEditForm(true)}
              className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
              title="Edit task"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Form Modal */}
      {showEditForm && (
        <TaskForm
          onSubmit={handleEdit}
          onCancel={() => setShowEditForm(false)}
          initialData={{ title: task.title, description: task.description, priority: task.priority, dueDate: task.dueDate }}
          mode="edit"
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Delete Task</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;
