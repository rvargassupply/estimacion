import React from 'react';

const LayoutHeader = ({ currentUser, onLogout, onNavigate, currentPage, isDarkMode, toggleDarkMode }) => {
  const headerBg = isDarkMode ? 'bg-gray-900' : 'bg-indigo-700';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-white';
  const navLinkColor = isDarkMode ? 'text-gray-400 hover:text-white' : 'text-indigo-200 hover:text-white';
  const activeNavLinkColor = isDarkMode ? 'text-white border-b-2 border-white' : 'text-white border-b-2 border-white';
  const userNameColor = isDarkMode ? 'text-gray-300' : 'text-indigo-100';

  return (
    <header className={`${headerBg} shadow-md py-4 px-6 flex justify-between items-center rounded-b-2xl`}>
      <h1 className={`text-3xl font-extrabold ${textColor}`}>Rvargas Supply</h1>
      <nav className="flex items-center space-x-6">
        {currentUser.role === 'admin' && (
          <>
            <button
              onClick={() => onNavigate('userManagement')}
              className={`text-lg font-medium ${currentPage === 'userManagement' ? activeNavLinkColor : navLinkColor} transition-colors`}
            >
              Usuarios
            </button>
            <button
              onClick={() => onNavigate('templateManagement')}
              className={`text-lg font-medium ${currentPage === 'templateManagement' ? activeNavLinkColor : navLinkColor} transition-colors`}
            >
              Plantillas
            </button>
            <button
              onClick={() => onNavigate('estimateCreation')}
              className={`text-lg font-medium ${currentPage === 'estimateCreation' ? activeNavLinkColor : navLinkColor} transition-colors`}
            >
              Estimaciones
            </button>
            <button
              onClick={() => onNavigate('reports')}
              className={`text-lg font-medium ${currentPage === 'reports' ? activeNavLinkColor : navLinkColor} transition-colors`}
            >
              Reportes
            </button>
          </>
        )}
        {currentUser.role === 'user' && (
          <button
            onClick={() => onNavigate('estimateCreation')}
            className={`text-lg font-medium ${currentPage === 'estimateCreation' ? activeNavLinkColor : navLinkColor} transition-colors`}
          >
            Mis Estimaciones
          </button>
        )}
        <span className={`text-lg font-semibold ${userNameColor}`}>Hola, {currentUser.username}</span>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 font-semibold shadow-md"
        >
          {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
        <button
          onClick={onLogout}
          className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold shadow-md"
        >
          Salir
        </button>
      </nav>
    </header>
  );
};

export default LayoutHeader;