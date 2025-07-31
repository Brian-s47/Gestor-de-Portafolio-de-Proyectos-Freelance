import { gestorFinanzas, esperarTecla } from '../../cli/menus.js';
import { listarClientes } from '../../services/clientesService.js';
import { agregarAbono, agregarCosto, listarFinanzas } from '../../services/finanzasService.js';
import inquirer from 'inquirer';

async function controlerFinanzas(db) {
    let salir = false;
    const collection = db.collection('estadoDeCuenta');

    console.clear();

    while (!salir) {
        const opcion = await gestorFinanzas();

        switch (opcion) {
            case '1': // Listar finanzas activas
                console.clear();
                const activas = await listarFinanzas(db);
                if (activas.length === 0) {
                    console.log('⚠️ No hay estados de cuenta.');
                } else {
                    activas.forEach((f, i) => {
                        console.log(`${i + 1}. ${f.nombreCliente} - ${f.nombreProyecto} | Deuda: $${f.deudaActual} | Disponible: $${f.valorDisponible}`);
                    });
                }
                await esperarTecla();
                break;

            case '2': // Hacer abono
                console.clear();
                const finanzasAbono = await obtenerFinanzasActivasConNombres(db);
                if (finanzasAbono.length === 0) {
                    console.log('⚠️ No hay estados de cuenta activos para abonar.');
                    await esperarTecla();
                    break;
                }

                const { seleccionAbono } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'seleccionAbono',
                        message: 'Seleccione una finanza activa:',
                        choices: finanzasAbono.map((f, i) => ({
                            name: `${f.nombreCliente} - ${f.nombreProyecto} (Deuda: $${f.deudaActual})`,
                            value: f.idProyecto
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

                await agregarAbono(collection, seleccionAbono, parseFloat(montoAbono));
                await esperarTecla();
                break;

            case '3': // Agregar egreso
                console.clear();
                const finanzasEgreso = await obtenerFinanzasActivasConNombres(collection);
                if (finanzasEgreso.length === 0) {
                    console.log('⚠️ No hay estados de cuenta activos para agregar egresos.');
                    await esperarTecla();
                    break;
                }

                const { seleccionEgreso } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'seleccionEgreso',
                        message: 'Seleccione un estado de cuenta activo:',
                        choices: finanzasEgreso.map((f, i) => ({
                            name: `${f.nombreCliente} - ${f.nombreProyecto} (Deuda: $${f.deudaActual})`,
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

    client.close();
}

export { controlerFinanzas };
