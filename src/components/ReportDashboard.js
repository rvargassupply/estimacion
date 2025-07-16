import React, { useState } from 'react';
import { exportEstimatesToPdf, exportEstimatesToExcel } from '../utils/exportHelpers';

const ReportDashboard = ({ estimates, currentUser, isDarkMode }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const safeEstimates = Array.isArray(estimates) ? estimates : [];

  const filteredEstimates = safeEstimates.filter(estimate => {
    const estimateDate = new Date(estimate.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (!start || estimateDate >= start) && (!end || estimateDate <= end);
  });

  const groupedEstimates = filteredEstimates.reduce((acc, estimate) => {
    const dateKey = new Date(estimate.date).toLocaleDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(estimate);
    return acc;
  }, {});

  const calculateGlobalTotals = () => {
    let totalAmount = 0;
    let totalProfit = 0;

    filteredEstimates.forEach(estimate => {
      totalAmount += estimate.totalAmount || 0;
      if (currentUser.role === 'admin') {
        totalProfit += estimate.totalProfit || 0;
      }
    });

    return { totalAmount, totalProfit };
  };

  const { totalAmount: globalTotalAmount, totalProfit: globalTotalProfit } = calculateGlobalTotals();

  const handleExportPdf = () => {
    exportEstimatesToPdf(estimates, currentUser, startDate, endDate);
  };

  const handleExportExcel = () => {
    exportEstimatesToExcel(estimates, currentUser, startDate, endDate);
  };

  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const sectionBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-50';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const subTextColor = isDarkMode ? 'text-gray-200' : 'text-gray-700';
  const inputBorder = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  const inputFocusRing = isDarkMode ? 'focus:ring-indigo-400' : 'focus:ring-indigo-500';
  const listItemBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-50';
  const listItemBorder = isDarkMode ? 'border-gray-600' : 'border-gray-200';

  return (
    <div className={`p-6 ${cardBg} rounded-2xl shadow-xl max-w-6xl mx-auto my-8`}>
      <h2 className={`text-3xl font-bold mb-6 text-center ${textColor}`}>Reportes de Estimaciones</h2>

      <div className={`mb-8 p-6 ${listItemBorder} rounded-xl ${sectionBg}`}>
        <h3 className={`text-2xl font-semibold mb-4 ${subTextColor}`}>Filtros de Fecha</h3>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="date"
            className={`flex-1 px-4 py-2 ${inputBorder} rounded-lg focus:outline-none focus:ring-2 ${inputFocusRing} transition-all duration-300 text-lg ${isDarkMode ? 'bg-gray-600 text-gray-100' : 'bg-white text-gray-800'}`}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={`flex-1 px-4 py-2 ${inputBorder} rounded-lg focus:outline-none focus:ring-2 ${inputFocusRing} transition-all duration-300 text-lg ${isDarkMode ? 'bg-gray-600 text-gray-100' : 'bg-white text-gray-800'}`}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleExportPdf}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-semibold shadow-md"
          >
            Exportar a PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold shadow-md"
          >
            Exportar a Excel
          </button>
        </div>
      </div>

      <div className={`mb-8 p-6 ${listItemBorder} rounded-xl ${sectionBg}`}>
        <h3 className={`text-2xl font-semibold mb-4 ${subTextColor}`}>Resumen Global</h3>
        <p className={`text-xl mb-2 ${textColor}`}>Total de Estimaciones: <span className="font-bold">${globalTotalAmount.toFixed(2)}</span></p>
        {currentUser.role === 'admin' && (
          <p className={`text-xl ${textColor}`}>Ganancia Total: <span className="font-bold text-green-500">${globalTotalProfit.toFixed(2)}</span></p>
        )}
      </div>

      {Object.keys(groupedEstimates).sort((a, b) => new Date(a) - new Date(b)).map(dateKey => (
        <div key={dateKey} className={`mb-8 p-6 ${listItemBorder} rounded-xl ${cardBg} shadow-md`}>
          <h3 className={`text-2xl font-semibold mb-4 ${subTextColor}`}>Estimaciones del {dateKey}</h3>
          <ul className="space-y-4">
            {groupedEstimates[dateKey].map(estimate => (
              <li key={estimate.id} className={`p-4 ${listItemBg} ${listItemBorder} rounded-lg shadow-sm`}>
                <p className={`text-lg font-medium ${textColor} mb-1`}>{estimate.name} (Creada por: {estimate.createdBy})</p>
                <p className={`text-md ${subTextColor} mb-2`}>Total: <span className="font-semibold">${(estimate.totalAmount || 0).toFixed(2)}</span></p>
                {currentUser.role === 'admin' && (
                  <p className={`text-md ${subTextColor}`}>Ganancia: <span className="font-semibold text-green-500">${(estimate.totalProfit || 0).toFixed(2)}</span></p>
                )}
                <div className={`mt-3 border-t ${listItemBorder} pt-3`}>
                  <h4 className={`text-lg font-semibold mb-2 ${subTextColor}`}>Ítems:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
                    {Array.isArray(estimate.items) && estimate.items.map((item, index) => (
                      <li key={index}>
                        {item.templateCode} - {item.templateDescription} (Cant: {item.quantity}, Precio: ${item.price})
                        {currentUser.role === 'admin' && ` (Margen: ${item.profitMargin}%, Ganancia Ítem: $${(item.profit || 0).toFixed(2)})`}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {filteredEstimates.length === 0 && (
        <p className="text-center text-gray-400 mt-8">No hay estimaciones para los filtros seleccionados.</p>
      )}
    </div>
  );
};

export default ReportDashboard;