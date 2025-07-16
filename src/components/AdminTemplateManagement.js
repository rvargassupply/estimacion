import React, { useState } from 'react';
import { generateUniqueId } from '../utils/helpers';

const AdminTemplateManagement = ({ templates, setTemplates, isDarkMode }) => {
  const [currentTemplate, setCurrentTemplate] = useState({
    id: null,
    code: '',
    description: '',
    quantity: '',
    price: '',
    profitMargin: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTemplate(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveTemplate = () => {
    if (!currentTemplate.code || !currentTemplate.description || !currentTemplate.quantity || !currentTemplate.price || !currentTemplate.profitMargin) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }

    const newTemplate = {
      ...currentTemplate,
      quantity: parseFloat(currentTemplate.quantity),
      price: parseFloat(currentTemplate.price),
      profitMargin: parseFloat(currentTemplate.profitMargin)
    };

    if (currentTemplate.id) {
      setTemplates(templates.map(t => t.id === newTemplate.id ? newTemplate : t));
      setMessage('Plantilla actualizada con éxito.');
    } else {
      newTemplate.id = generateUniqueId();
      setTemplates([...templates, newTemplate]);
      setMessage('Plantilla creada con éxito.');
    }
    setCurrentTemplate({ id: null, code: '', description: '', quantity: '', price: '', profitMargin: '' });
  };

  const handleEditTemplate = (template) => {
    setCurrentTemplate(template);
    setMessage('');
  };

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter(t => t.id !== id));
    setMessage('Plantilla eliminada.');
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
      <h2 className={`text-3xl font-bold mb-6 text-center ${textColor}`}>Gestión de Plantillas</h2>

      <div className={`mb-8 p-6 ${listItemBorder} rounded-xl ${sectionBg}`}>
        <h3 className={`text-2xl font-semibold mb-4 ${subTextColor}`}>{currentTemplate.id ? 'Editar Plantilla' : 'Crear Nueva Plantilla'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" name="code" placeholder="Código" value={currentTemplate.code} onChange={handleChange}
            className={`px-4 py-2 ${inputBorder} rounded-lg focus:outline-none focus:ring-2 ${inputFocusRing} transition-all duration-300 text-lg ${isDarkMode ? 'bg-gray-600 text-gray-100' : 'bg-white text-gray-800'}`} />
          <input type="text" name="description" placeholder="Descripción" value={currentTemplate.description} onChange={handleChange}
            className={`px-4 py-2 ${inputBorder} rounded-lg focus:outline-none focus:ring-2 ${inputFocusRing} transition-all duration-300 text-lg ${isDarkMode ? 'bg-gray-600 text-gray-100' : 'bg-white text-gray-800'}`} />
          <input type="number" name="quantity" placeholder="Cantidad" value={currentTemplate.quantity} onChange={handleChange}
            className={`px-4 py-2 ${inputBorder} rounded-lg focus:outline-none focus:ring-2 ${inputFocusRing} transition-all duration-300 text-lg ${isDarkMode ? 'bg-gray-600 text-gray-100' : 'bg-white text-gray-800'}`} />
          <input type="number" name="price" placeholder="Precio" value={currentTemplate.price} onChange={handleChange}
            className={`px-4 py-2 ${inputBorder} rounded-lg focus:outline-none focus:ring-2 ${inputFocusRing} transition-all duration-300 text-lg ${isDarkMode ? 'bg-gray-600 text-gray-100' : 'bg-white text-gray-800'}`} />
          <input type="number" name="profitMargin" placeholder="Margen de Ganancia (%)" value={currentTemplate.profitMargin} onChange={handleChange}
            className={`px-4 py-2 ${inputBorder} rounded-lg focus:outline-none focus:ring-2 ${inputFocusRing} transition-all duration-300 text-lg ${isDarkMode ? 'bg-gray-600 text-gray-100' : 'bg-white text-gray-800'}`} />
        </div>
        <button
          onClick={handleSaveTemplate}
          className={`w-full px-6 py-2 ${buttonBg} text-white rounded-lg transition-all duration-300 font-semibold shadow-md`}
        >
          {currentTemplate.id ? 'Actualizar Plantilla' : 'Guardar Plantilla'}
        </button>
        {message && <p className="text-center text-sm text-gray-600 mt-2">{message}</p>}
      </div>

      <div>
        <h3 className={`text-2xl font-semibold mb-4 ${subTextColor}`}>Plantillas Existentes</h3>
        <ul className="space-y-3">
          {templates.map(template => (
            <li key={template.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 ${listItemBg} ${listItemBorder} rounded-lg shadow-sm`}>
              <div className="flex-1 mb-2 sm:mb-0">
                <p className={`text-lg font-medium ${textColor}`}>{template.code} - {template.description}</p>
                <p className="text-sm text-gray-600">Cant: {template.quantity}, Precio: ${template.price}, Margen: {template.profitMargin}%</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditTemplate(template)}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all duration-300 text-sm font-semibold"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 text-sm font-semibold"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminTemplateManagement;