// utils/generarFactura.js
import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import { fileURLToPath } from 'url';

// Esto permite usar __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generarFacturaTXT({ cliente, proyecto, monto, descripcion, metodo = 'No especificado' }) {
  const fecha = dayjs().format('YYYY-MM-DD_HH-mm-ss');
  const nombreArchivo = `factura_${cliente}_${fecha}.txt`;
  const rutaFactura = path.join(__dirname, '..', 'facturas', nombreArchivo);

  const contenido = `
===============================
        FACTURA DE ABONO
===============================
Cliente: ${cliente}
Proyecto: ${proyecto}
Fecha: ${dayjs().format('DD/MM/YYYY HH:mm')}
Monto abonado: $${monto}
Medio de pago: ${metodo}
Descripción: ${descripcion || 'N/A'}

===============================
    ¡Gracias por su pago!
===============================
  `;

  fs.mkdirSync(path.dirname(rutaFactura), { recursive: true });
  fs.writeFileSync(rutaFactura, contenido.trim());

  console.log(`\n📄 Factura generada: ${rutaFactura}\n`);
}

export function generarFacturaCostoTXT({ cliente, proyecto, valor, descripcion, tipo = 'General' }) {
  const fecha = dayjs().format('YYYY-MM-DD_HH-mm-ss');
  const nombreArchivo = `egreso_${cliente}_${fecha}.txt`;
  const rutaFactura = path.join(__dirname, '..', 'facturas', nombreArchivo);

  const contenido = `
===============================
          COMPROBANTE DE EGRESO
===============================
Cliente: ${cliente}
Proyecto: ${proyecto}
Fecha: ${dayjs().format('DD/MM/YYYY HH:mm')}
Monto egresado: $${valor}
Tipo de gasto: ${tipo}
Descripción: ${descripcion || 'N/A'}

===============================
  Este documento respalda el egreso
===============================
  `;

  fs.mkdirSync(path.dirname(rutaFactura), { recursive: true });
  fs.writeFileSync(rutaFactura, contenido.trim());

  console.log(`\n📄 Comprobante de egreso generado: ${rutaFactura}\n`);
}

