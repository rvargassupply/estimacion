import React, { useState, useEffect } from 'react';
import AuthLogin from './components/AuthLogin';
import AdminUserManagement from './components/AdminUserManagement';
import AdminTemplateManagement from './components/AdminTemplateManagement';
import UserEstimateCreation from './components/UserEstimateCreation';
import ReportDashboard from './components/ReportDashboard';
import LayoutHeader from './components/LayoutHeader';
import { initialUsers } from './mock/users';
import { initialTemplates } from './mock/templates';
import { initialEstimates } from './mock/estimates';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // New state for dark mode

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });
  const [templates, setTemplates] = useState(() => {
    const savedTemplates = localStorage.getItem('templates');
    return savedTemplates ? JSON.parse(savedTemplates) : initialTemplates;
  });
  const [estimates, setEstimates] = useState(() => {
    const savedEstimates = localStorage.getItem('estimates');
    return savedEstimates ? JSON.parse(savedEstimates) : initialEstimates;
  });
  const [currentPage, setCurrentPage] = useState('estimateCreation'); // Default page after login

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('templates', JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem('estimates', JSON.stringify(estimates));
  }, [estimates]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setCurrentPage('userManagement');
    } else {
      setCurrentPage('estimateCreation');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('estimateCreation'); // Reset to default login view
  };

  const renderPage = () => {
    if (!currentUser) {
      return <AuthLogin onLogin={handleLogin} users={users} isDarkMode={isDarkMode} />;
    }

    switch (currentPage) {
      case 'userManagement':
        return currentUser.role === 'admin' ? <AdminUserManagement users={users} setUsers={setUsers} isDarkMode={isDarkMode} /> : <p className="text-center text-red-500 mt-8">Acceso denegado.</p>;
      case 'templateManagement':
        return currentUser.role === 'admin' ? <AdminTemplateManagement templates={templates} setTemplates={setTemplates} isDarkMode={isDarkMode} /> : <p className="text-center text-red-500 mt-8">Acceso denegado.</p>;
      case 'estimateCreation':
        return <UserEstimateCreation templates={templates} estimates={estimates} setEstimates={setEstimates} currentUser={currentUser} isDarkMode={isDarkMode} />;
      case 'reports':
        return currentUser.role === 'admin' ? <ReportDashboard estimates={estimates} currentUser={currentUser} isDarkMode={isDarkMode} /> : <p className="text-center text-red-500 mt-8">Acceso denegado.</p>;
      default:
        return <p className="text-center text-red-500 mt-8">Página no encontrada.</p>;
    }
  };

  const appBgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';

  return (
    <div className={`min-h-screen ${appBgColor}`}>
      {currentUser && (
        <LayoutHeader
          currentUser={currentUser}
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      <main className="container mx-auto p-4">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;

// DONE