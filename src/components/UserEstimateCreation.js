import React, { useState } from 'react';
import { generateUniqueId } from '../utils/helpers';

const UserEstimateCreation = ({ templates, estimates, setEstimates, currentUser, isDarkMode }) => {
  const [estimateName, setEstimateName] = useState('');
  const [estimateDate, setEstimateDate] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState('');

  const handleAddItem = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedItems([...selectedItems, { ...template, itemId: generateUniqueId() }]);
    }
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(selectedItems.filter(item => item.itemId !== itemId));
  };

  const handleCreateEstimate = () => {
    if (!estimateName.trim() || !estimateDate || selectedItems.length === 0) {
      setMessage('Por favor, completa el nombre, la fecha y agrega al menos un ítem.');
      return;
    }

    let totalCost = 0;
    let totalProfit = 0;
    let totalAmount = 0;

    const itemsForEstimate = selectedItems.map(item => {
      const cost = item.quantity * item.price;
      const profit = cost * (item.profitMargin / 100);
      const total = cost + profit;

      totalCost += cost;
      totalProfit += profit;
      totalAmount += total;

      return {
        templateId: item.id,
        templateCode: item.code,
        templateDescription: item.description,
        quantity: item.quantity,
        price: item.price,
        profitMargin: item.profitMargin, // Keep for admin view
        cost: cost,
        profit: profit,
        total: total,
      };
    });

    const newEstimate = {
      id: generateUniqueId(),
      name: estimateName,
      date: estimateDate,
      items: itemsForEstimate,
      totalCost: totalCost,
      totalProfit: totalProfit,
      totalAmount: totalAmount,
      createdAt: new Date().toISOString(),
      createdBy: currentUser.username
    };

    setEstimates([...estimates, newEstimate]);
    setMessage('Estimación creada con éxito.');
    setEstimateName('');
    setEstimateDate('');
    setSelectedItems([]);
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
      <h2 className={`text-3xl font-bold mb-6 text-center ${textColor}`}>Crear Nueva Estimación</h2>

      <div className={`mb-8 p-6 ${listItemBorder} rounded-xl ${sectionBg}`}>
        <h3 className={`text-2xl font-semibold mb-4 ${subTextColor}`}>Detalles de la Estimación</h3>
        <input
          type="text"
          placeholder="Nombre de la Estimación"
          className={`w-full px-4 py-2 mb-4 ${inputBorder} rounded-lg focus:outline-none focus:ring-2 ${inputFocusRing} transition-all duration-300 text-lg ${isDarkMode ? 'bg-gray-600 text-gray-100' : 'bg-white text-gray-800'}`}
          value={estimateName}
          onChange={(e) => setEstimateName(e.target.value)}
        />
        <input
          type="date"
          className={`w-full px-4 py-2 mb-4 ${inputBorder} rounded-lg focus:outline-none focus:ring-2 ${inputFocusRing} transition-all duration-300 text-lg ${isDarkMode ? 'bg-gray-600 text-gray-100' : 'bg-white text-gray-800'}`}
          value={estimateDate}
          onChange={(e) => setEstimateDate(e.target.value)}
        />

        <h4 className={`text-xl font-semibold mb-3 mt-6 ${subTextColor}`}>Agregar Ítems de Plantilla</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {templates.map(template => (
            <div key={template.id} className={`p-3 ${listItemBorder} rounded-lg ${listItemBg} shadow-sm flex flex-col justify-between`}>
              <div>
                <p className={`font-medium ${textColor}`}>{template.code}</p>
                <p className="text-sm text-gray-600">{template.description}</p>
                <p className="text-sm text-gray-600">Precio: ${template.price}</p>
              </div>
              <button
                onClick={() => handleAddItem(template.id)}
                className="mt-3 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all duration-300 text-sm font-semibold"
              >
                Agregar
              </button>
            </div>
          ))}
        </div>

        {selectedItems.length > 0 && (
          <div className="mt-8">
            <h4 className={`text-xl font-semibold mb-3 ${subTextColor}`}>Ítems Seleccionados</h4>
            <ul className="space-y-3 mb-4">
              {selectedItems.map(item => (
                <li key={item.itemId} className={`flex items-center justify-between p-3 ${listItemBg} ${listItemBorder} rounded-lg shadow-sm`}>
                  <span className={`text-lg ${textColor}`}>{item.code} - {item.description}</span>
                  <button
                    onClick={() => handleRemoveItem(item.itemId)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 text-sm font-semibold"
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleCreateEstimate}
          className={`w-full px-6 py-3 ${buttonBg} text-white rounded-xl transition-all duration-300 font-semibold shadow-lg mt-6`}
        >
          Generar Estimación Final
        </button>
        {message && <p className="text-center text-sm text-gray-600 mt-2">{message}</p>}
      </div>

      <div>
        <h3 className={`text-2xl font-semibold mb-4 ${subTextColor}`}>Mis Estimaciones</h3>
        <ul className="space-y-3">
          {estimates.filter(e => e.createdBy === currentUser.username).map(estimate => (
            <li key={estimate.id} className={`p-4 ${listItemBg} ${listItemBorder} rounded-lg shadow-sm`}>
              <p className={`text-lg font-medium ${textColor}`}>{estimate.name} (Fecha: {new Date(estimate.date).toLocaleDateString()})</p>
              <p className="text-sm text-gray-600">Total: ${estimate.totalAmount.toFixed(2)}</p>
              <p className="text-xs text-gray-500">Creada el: {new Date(estimate.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserEstimateCreation;