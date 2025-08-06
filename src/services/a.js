async function listarProyectos(db) {
    const proyectos = await db.collection('proyectos').find().toArray();

    if (proyectos.length === 0) {
        console.log(`⚠️ No se tienen Proyectos registrados`);
        await esperarTecla();
        return;
    }

    const titulo = chalk.bold.cyan('📋 Listado de Proyectos');
    console.log(boxen(titulo, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green',
        align: 'center'
    }));
    const linea = chalk.gray('────────────────────────────────────────────');

    // Obtener todos los clientes una vez para evitar múltiples consultas
    const clientes = await db.collection('clientes').find().toArray();

    const proyectosVisibles = proyectos.map((proyecto) => {
        const propuesta = proyecto.propuesta || {};
        const contrato = proyecto.contratos || {};

        const clienteId = contrato.cliente?.$oid || contrato.cliente || proyecto.cliente?.$oid || proyecto.cliente;
        const clienteEncontrado = clientes.find(c => c._id.toString() === clienteId?.toString());
        const clienteNombre = clienteEncontrado?.nombre || 'Desconocido';

        const fechaInicio = contrato.fecha_inicio ? dayjs(contrato.fecha_inicio).format('DD/MM/YYYY') : 'N/D';
        const fechaFin = contrato.fecha_fin ? dayjs(contrato.fecha_fin).format('DD/MM/YYYY') : 'N/D';

        return {
            Proyecto: proyecto.nombredelproyecto,
            Cliente: clienteNombre,
            Propuesta: propuesta.nombrepropuesta || propuesta.nombre || "Sin nombre",
            Precio: propuesta.precio || "No definido",
            Plazo: `${fechaInicio} - ${fechaFin}`,
            Estado: proyecto.estado,
            Presupuesto: contrato.presupuestoInicial || "No definido",
            Desarrollador: contrato.desarrollador || "Sin asignar"
        };
    });

    console.table(proyectosVisibles);
    console.log(linea);
    await esperarTecla();
};