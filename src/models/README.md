# 📁 Models

Esta carpeta define las clases que representan las entidades centrales del sistema: Cliente, Propuesta, Proyecto y Finanzas. Cada clase modela la estructura de datos que luego se almacena en la base MongoDB y valida su integridad antes de ser usada o persistida.

---

## 📦 Dependencias

* **`mongodb`**: Se importa `ObjectId` para gestionar referencias y claves primarias compatibles con MongoDB.

---

## 📄 `Cliente.js`

Modelo de entidad **Cliente**, define a la persona que solicita proyectos. Atributos principales:

* `nombre`, `cedula`, `telefono`, `correo`: Datos básicos del cliente.
* `propuestas`: Array con IDs de propuestas asociadas.
* `proyectos`: Array con IDs de proyectos asociados.
* `pagos`: Array con registros financieros relacionados.
* `deuda`: Número total de deuda.
* `estado`: Booleano (activo/inactivo).

⚠️ Valida campos obligatorios, tipos de datos y formato de correo electrónico

---

## 📄 `Propuesta.js`

Modelo de entidad **Propuesta**, documento que representa una oferta comercial enviada al cliente:

* `nombrepropuesta`, `descripcion`, `precio`: Información general.
* `plazos`: Rango de fechas de vigencia (`[fechaInicial, fechaFinal]`).
* `estado`: Estado de la propuesta (`pendiente`, `aceptada`, etc.).
* `cliente`: ID del cliente al que pertenece.

Incluye validaciones estrictas de tipo, estructura y consistencia de datos

---

## 📄 `Proyecto.js`

Modelo **Proyecto** generado a partir de una propuesta aceptada:

* `nombredelproyecto`: Título del proyecto.
* `descripcion`: Lista de descripciones del alcance.
* `propuesta`: Objeto con la propuesta aceptada (embebido).
* `entregables`: Array de objetos con entregables del proyecto.
* `contratos`: Objeto con los detalles del contrato.
* `estado`: `activo`, `pausado`, `finalizado`, `cancelado`.
* `cliente`: ID del cliente al que pertenece.
* `estadoDeCuenta`: ID del estado financiero asociado (puede ser `null`).

Valida todos los campos al crear una instancia. Los estados válidos están definidos explícitamente.

---

## 📄 `Finanza.js`

Modelo **Finanza** (estado de cuenta del cliente con un proyecto):

* `idCliente`, `idProyecto`: Referencias a las entidades respectivas.
* `deudaActual`, `valorDisponible`: Información económica.
* `abonos`, `costos`: Listas de pagos y egresos.
* `estado`: Activo o inactivo.

Valida consistencia y tipos de cada propiedad al construir el objeto.

---

## 🛡️ Validación

Cada clase ejecuta su validación de forma automática al instanciarse, lanzando errores en caso de datos incorrectos. Esto garantiza integridad desde el inicio del flujo de trabajo, antes de interactuar con la base de datos.
