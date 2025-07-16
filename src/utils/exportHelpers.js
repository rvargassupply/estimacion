// No se pueden usar librerías externas como jspdf o xlsx.
// La exportación a PDF y Excel no es posible sin estas librerías.
// Se mantendrá el archivo para futuras implementaciones si se permite el uso de librerías.

export const exportEstimatesToPdf = (estimates, currentUser, startDate, endDate) => {
  alert("La exportación a PDF no está disponible sin librerías externas.");
  console.log("Intentando exportar a PDF:", estimates, currentUser, startDate, endDate);
};

export const exportEstimatesToExcel = (estimates, currentUser, startDate, endDate) => {
  alert("La exportación a Excel no está disponible sin librerías externas.");
  console.log("Intentando exportar a Excel:", estimates, currentUser, startDate, endDate);
};

// DONE