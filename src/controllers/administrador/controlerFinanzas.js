import { gestorFinanzas, esperarTecla } from '../../cli/menus.js';
import { registrarAbono, agregarCosto, listarFinanzas, obtenerFinanzas } from '../../services/finanzasService.js';
import inquirer from 'inquirer';

async function controlerFinanzas(db) {
    let salir = false;
    const collection = db.collection('estadoDeCuenta');

    console.clear();

    while (!salir) {
        const opcion = await gestorFinanzas(db);

        switch (opcion) {
            case '1': // Listar estados de cuenta
                console.clear();
                const activas = await listarFinanzas(db);
                if (!activas ||activas.length === 0) {
                    console.log('⚠️ No hay estados de cuenta.');
                } else {
                    // activas.forEach((f, i) => {
                    //     console.log(`${i + 1}. ${f.nombreCliente} - ${f.nombreProyecto} | Deuda: $${f.deudaActual} | Disponible: $${f.valorDisponible}`);
                    // });
                }
                await esperarTecla();
                break;

            case '2':
                const finanzasAbono = await obtenerFinanzas(db); // finanzas con nombres de cliente/proyecto

                if (!finanzasAbono || finanzasAbono.length === 0) {
                    console.log('⚠️ No hay estados de cuenta activos para abonar.');
                    await esperarTecla();
                    break;
                }

                const { seleccionAbono } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'seleccionAbono',
                        message: 'Seleccione una finanza activa:',
                        choices: finanzasAbono.map(f => ({
                            name: `${f.nombreProyecto} - ${f.nombreCliente} (Deuda: $${f.deudaActual})`,
                            value: f._id.toString()
                        }))
                    }
                ]);

                const { montoAbono } = await inquirer.prompt([
                    {
                        name: 'montoAbono',
                        message: '💰 Monto del abono:',
                        validate: input => !isNaN(input) && Number(input) > 0 ? true : 'Debe ser un número positivo.'
                    }
                ]);

                const { descripcion } = await inquirer.prompt([
                    {
                        name: 'descripcion',
                        message: 'Ingrese una descripcion del abono',
                        validate: input => input && input.trim().length > 0 ? true : 'La descripción no puede estar vacía.'
                    }
                ]);

                try {
                    console.log(seleccionAbono)
                    const resultado = await registrarAbono(db, seleccionAbono, parseFloat(montoAbono),descripcion);
                    console.log(`✅ Abono de $${resultado.monto} registrado.`);
                    console.log(`🔁 Deuda restante: $${resultado.nuevaDeuda}`);
                    console.log(`📦 Estado actual: ${resultado.nuevoEstado ? 'Activo' : 'Pagado'}`);
                } catch (error) {
                    console.error('❌ Error al hacer el abono:', error.message,error);
                }

                await esperarTecla();
                break;

            case '3': // Agregar egreso
                console.clear();
                const finanzasEgreso = (await obtenerFinanzas(db)).filter(f => f.valorDisponible > 0);
                if (finanzasEgreso.length === 0) {
                    console.log('⚠️ No hay estados de cuenta con saldo disponible para egresos..');
                    await esperarTecla();
                    break;
                }

                const { seleccionEgreso } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'seleccionEgreso',
                        message: 'Seleccione un estado de cuenta activo:',
                        choices: finanzasEgreso.map((f, i) => ({
                            name: `${f.nombreCliente} - ${f.nombreProyecto} (Deuda: $${f.deudaActual}, Disponible: $${f.valorDisponible})`,
                            value: f.idProyecto
                        }))
                    }
                ]);

                const { descripcionEgreso, valorEgreso } = await inquirer.prompt([
                    { name: 'descripcionEgreso', message: '📝 Descripción del egreso:' },
                    {
                        name: 'valorEgreso',
                        message: '💸 Valor del egreso:',
                        validate: input => !isNaN(input) && Number(input) > 0 ? true : 'Debe ser un número positivo.'
                    }
                ]);

                await agregarCosto(collection, seleccionEgreso, {
                    descripcion: descripcionEgreso,
                    valor: parseFloat(valorEgreso)
                });
                await esperarTecla();
                break;

            case '4':
                salir = true;
                console.clear();
                console.log('🔙 Volviendo al menú anterior...');
                break;
        }
    }

}

export { controlerFinanzas };

