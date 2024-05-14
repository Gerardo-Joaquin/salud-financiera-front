import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportToCsv(data: any[], filename: string) {
    // Extraer las claves del primer objeto para los encabezados del CSV
    const headers = Object.keys(data[0]);
    // Crear una matriz para almacenar los datos en formato CSV
    const csvData = [];
    // Agregar los encabezados a la matriz de datos CSV
    csvData.push(headers.join(','));
    // Iterar sobre cada objeto de la data y agregar sus valores al CSV
    data.forEach(item => {
      const row = headers.map(header => item[header]);
      csvData.push(row.join(','));
    });
    // Crear el contenido CSV
    const csvContent = "data:text/csv;charset=utf-8," + csvData.join('\n');
    // Crear el enlace de descarga
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    // Agregar el enlace al DOM y simular el clic para descargar el archivo CSV
    document.body.appendChild(link);
    link.click();
    // Eliminar el enlace del DOM después de la descarga
    document.body.removeChild(link);
  }
}
