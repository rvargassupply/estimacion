import React, { useState } from 'react';

const AuthLogin = ({ onLogin, users, isDarkMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const foundUser = users.find(user => user.username === username && user.password === password);
    if (foundUser) {
      onLogin(foundUser);
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const inputBorder = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  const inputFocusRing = isDarkMode ? 'focus:ring-indigo-400' : 'focus:ring-indigo-500';
  const buttonBg = isDarkMode ? 'bg-indigo-700 hover:bg-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700';

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${bgColor}`}>
      <div className={`${cardBg} p-8 rounded-2xl shadow-2xl w-full max-w-md`}>
        <h2 className={`text-3xl font-bold text-center mb-8 ${textColor}`}>Iniciar Sesión en Rvargas Supply</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Usuario"
          className={`w-full px-5 py-3 mb-4 ${inputBorder} rounded-xl focus:outline-none focus:ring-2 ${inputFocusRing} transition-all duration-300 text-lg ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className={`w-full px-5 py-3 mb-6 ${inputBorder} rounded-xl focus:outline-none focus:ring-2 ${inputFocusRing} transition-all duration-300 text-lg ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className={`w-full ${buttonBg} text-white py-3 rounded-xl transition-all duration-300 text-lg font-semibold shadow-lg`}
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default AuthLogin;