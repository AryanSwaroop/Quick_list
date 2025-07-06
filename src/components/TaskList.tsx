
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TaskItem from './TaskItem';
/**
 * @typedef {import('../types/Task').Task} Task
 * @typedef {(id: string, updates: Partial<Task>) => void} OnUpdateFn
 * @typedef {(id: string) => void} OnDeleteFn
 * @typedef {(id: string) => void} OnToggleCompleteFn
 */

/**
 * @param {{
 *   tasks: Task[],
 *   onUpdate: OnUpdateFn,
 *   onDelete: OnDeleteFn,
 *   onToggleComplete: OnToggleCompleteFn
 * }} props
 */
const TaskList = ({ tasks, onUpdate, onDelete, onToggleComplete }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks found</h3>
        <p className="text-gray-500">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div>
        <AnimatePresence>
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 500, damping: 40, duration: 0.3 }}
            >
              <TaskItem
                task={task}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
                isLast={index === tasks.length - 1}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskList;
