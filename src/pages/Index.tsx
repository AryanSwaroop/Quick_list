
import React, { useState, useEffect } from 'react';
import Login from '../components/Login.tsx';
import TaskDashboard from '../components/TaskDashboard';

const Index = () => {
  const [user, setUser] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('taskTracker_user');
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (username: string) => {
    localStorage.setItem('taskTracker_user', username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('taskTracker_user');
    setUser('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user ? (
        <TaskDashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Index;
