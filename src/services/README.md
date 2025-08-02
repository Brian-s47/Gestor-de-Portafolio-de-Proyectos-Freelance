# 📁 services

Esta carpeta contiene la lógica de negocio del sistema. Aquí se definen las funciones que interactúan con la base de datos, validan modelos y procesan flujos como login, gestión de clientes, finanzas, propuestas y proyectos. Los servicios son utilizados desde los controladores (`controllers/`).

---

## 📦 Dependencias

* **`mongodb`**: Se utiliza `ObjectId` para búsquedas y actualizaciones por ID.
* **`inquirer`**: Interfaz interactiva en línea de comandos.
* **`dayjs`**, **`chalk`**, **`boxen`**: Para formato de fechas, estilos de consola y cuadros informativos.
* **`models/*.js`**: Modelos de validación de entidades.
* **`utils/validadores.js`**: Reglas de validación de campos de entrada.

---

## 🔐 Autenticación

### 📄 `loginAdmin.js`

Autentica al administrador comparando una contraseña ingresada con la variable de entorno `ADMIN_PASS`. Si la contraseña es correcta, permite el acceso al menú de administración

### 📄 `loginCliente.js`

Solicita número de cédula y busca al cliente en la colección `clientes`. Si existe, retorna su ID para continuar con las funciones del cliente.

---

## 👥 `clientesService.js`

Contiene todas las operaciones sobre clientes:

* `crearCliente(data, collection)` : Crea y valida un nuevo cliente, evitando duplicados.
* `listarClientes(collection)` : Imprime todos los clientes registrados.
* `listarDatosCliente(db, idCliente)` : Muestra detalles de un cliente específico.
* `actualizarCliente(id, nuevosDatos, collection)` : Modifica los datos del cliente con validaciones previas.
* `cambiarEstadoCliente(id, nuevoEstado, collection)` : Activa o desactiva un cliente.

---

## 💰 `finanzasService.js`

Gestiona la entidad **Finanza**:

* `crearFinanza(data, collection)` : Crea y valida una nueva entrada financiera, verificando duplicados por proyecto.
* `obtenerFinanzas(db)` : Devuelve todas las finanzas con nombre de cliente y proyecto.
* `listarFinanzas(db)` : Imprime en consola una tabla detallada de las finanzas.
* `registrarAbono(db, _id, monto, descripcion)` : Agrega un abono y ajusta la deuda.
* `agregarCosto(collection, idProyecto, costo)` : Suma un gasto al proyecto, reactivando el estado de la cuenta.

---

## 📄 `propuestasService.js`

Módulo para la gestión de propuestas comerciales:

* `crearPropuesta(db)` : Solicita datos, instancia un objeto `Propuesta`, y lo guarda.
* `listarPropuestas(db)` : Imprime todas las propuestas existentes con cliente.
* `listarPropuestasCliente(db, idCliente)` : Filtra las propuestas de un cliente.
* `modifiarPropuesta(db)` : Permite editar atributos de una propuesta, con validación.
* `cambiarEstadoPropuesta(db)` \:Cambia el estado de una propuesta (`pendiente`, `aceptada`, `rechazada`).

---

## 📄 `proyectosService.js`

Orquesta la creación, visualización y actualización de proyectos:

* `crearProyectoTransaccion(db)` : Flujo completo para convertir una propuesta aceptada en un proyecto con contrato y finanzas, en una transacción atómica.
* `seleccionarProyecto(db)` : Lista y permite seleccionar un proyecto activo.
* `insertarEntregables(id, db)` : Agrega entregables manualmente a un proyecto.
* `actualizarEntregables(id, db)` : Modifica entregables existentes (estado o link).
* `actualizarEstado(id, db)` : Cambia el estado del proyecto.
* `actualizarFechaFinal(id, db)` : Modifica la fecha final del contrato.
* `listarProyectos(db)` y `listarProyectosCliente(db, idCliente)` : Muestran tablas con detalles de cada proyecto.

---

## 🧩 Integración General

Todos los servicios son llamados desde los controladores ubicados en `controllers/`, respondiendo a entradas del usuario y manteniendo separada la lógica de negocio de la interacción.
