import React, { useState } from 'react';
import { generateUniqueId } from '../utils/helpers';

const AdminUserManagement = ({ users, setUsers, isDarkMode }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleAddUser = () => {
    if (newUsername.trim() === '' || newPassword.trim() === '') {
      setMessage('Por favor, completa todos los campos.');
      return;
    }
    if (users.some(user => user.username === newUsername)) {
      setMessage('El nombre de usuario ya existe.');
      return;
    }
    const newUser = { id: generateUniqueId(), username: newUsername, password: newPassword, role: 'user' };
    setUsers([...users, newUser]);
    setNewUsername('');
    setNewPassword('');
    setMessage('Usuario creado con éxito.');
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setMessage('Usuario eliminado.');
  };

  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const sectionBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-50';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const subTextColor = isDarkMode ? 'text-gray-200' : 'text-gray-700';
  const inputBorder = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  const inputFocusRing = isDarkMode ? 'focus:ring-indigo-400' : 'focus:ring-indigo-500';
  const buttonBg = isDarkMode ? 'bg-indigo-700 hover:bg-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700';
  const listItemBg = isDarkMode ? 'bg-gray-700' : 'bg-white';
  const listItemBorder = isDarkMode ? 'border-gray-600' : 'border-gray-200';

  return (
    <div className={`p-6 ${cardBg} rounded-2xl shadow-xl max-w-4xl mx-auto my-8`}>
      <h2 className={`text-3xl font-bold mb-6 text-center ${textColor}`}>Gestión de Usuarios</h2>

      <div className={`mb-8 p-6 ${listItemBorder} rounded-xl ${sectionBg}`}>
        <h3 className={`text-2xl font-semibold mb-4 ${subTextColor}`}>Crear Nuevo Usuario</h3>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Nombre de usuario"
            className={`flex-1 px-4 py-2 ${inputBorder} rounded-lg focus:outline-none focus:ring-2 ${inputFocusRing} transition-all duration-300 text-lg ${isDarkMode ? 'bg-gray-600 text-gray-100' : 'bg-white text-gray-800'}`}
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className={`flex-1 px-4 py-2 ${inputBorder} rounded-lg focus:outline-none focus:ring-2 ${inputFocusRing} transition-all duration-300 text-lg ${isDarkMode ? 'bg-gray-600 text-gray-100' : 'bg-white text-gray-800'}`}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            onClick={handleAddUser}
            className={`px-6 py-2 ${buttonBg} text-white rounded-lg transition-all duration-300 font-semibold shadow-md`}
          >
            Crear Usuario
          </button>
        </div>
        {message && <p className="text-center text-sm text-gray-600 mt-2">{message}</p>}
      </div>

      <div>
        <h3 className={`text-2xl font-semibold mb-4 ${subTextColor}`}>Usuarios Existentes</h3>
        <ul className="space-y-3">
          {users.filter(user => user.role !== 'admin').map(user => (
            <li key={user.id} className={`flex items-center justify-between p-4 ${listItemBg} ${listItemBorder} rounded-lg shadow-sm`}>
              <span className={`text-lg font-medium ${textColor}`}>{user.username}</span>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 text-sm font-semibold"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminUserManagement;