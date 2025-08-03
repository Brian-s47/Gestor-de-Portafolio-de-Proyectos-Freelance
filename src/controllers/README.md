# 📁 controllers

Esta carpeta contiene los controladores del sistema, que gestionan el flujo de navegación entre los menús y las acciones disponibles tanto para administradores como para clientes. Cada archivo representa un menú funcional con opciones que invocan servicios o acciones específicas.

## 📆 Dependencias

Los controladores hacen uso de varias librerías y módulos para interactuar con la consola, validar datos y conectarse a la base de datos:

* **`inquirer`**: Librería que permite generar preguntas interactivas en la línea de comandos.
* **`lodash`**: Utilidades para manipulación de datos, aunque su uso es limitado en los controladores.
* **`cli/menus.js`**: Define los menús interactivos que disparan las funciones controladoras.
* **`services/*.js`**: Encapsulan la lógica de negocio para clientes, propuestas, proyectos y finanzas.
* **`models/*.js`**: Modelos de datos utilizados para la estructura de los objetos (por ejemplo, `Cliente`, `Propuesta`).
* **`utils/validadores.js`**: Contiene funciones para validar datos de entrada como textos, números o correos electrónicos.

---

## 📌 Estructura General

Cada controlador está asociado a un menú interactivo definido en `cli/menus.js` y se comunica con los servicios correspondientes para realizar acciones como registrar, listar, modificar o eliminar datos del sistema.

---

## 📄 `administradorControler.js`

### 🧽 Función Principal:

```js
gestionAdministrador(db)
```

Controlador principal del menú de **Administrador**. Permite navegar hacia los submenús de:

* Gestión de clientes
* Propuestas
* Proyectos
* Finanzas

Cada opción invoca al controlador correspondiente de la carpeta `administrador/`.

## 📄 `clienteControler.js`

### 🧽 Función Principal:

```js
gestionCliente(db, idCliente)
```

Controlador principal del menú de **Cliente**. Requiere el `idCliente` para filtrar la información correspondiente. Ofrece opciones para:

* Ver proyectos asociados
* Ver propuestas recibidas
* (Pendiente) Ver estado financiero
* Ver información personal

---

## 📂 Subcarpeta `administrador/`

Contiene controladores específicos utilizados dentro del menú de administrador:

---

### 📄 `clientesControler.js`

### 🧽 Función Principal:

```js
controlerClientes(db)
```

Permite al administrador gestionar los clientes del sistema:

* Registrar cliente
* Modificar datos
* Listar clientes
* Cambiar estado (activo/inactivo)

Internamente utiliza `inquirer` para capturar datos y valida campos como cédula, correo, nombre y teléfono.

Valida los objetos para que sean correctamente enviados a la base de datos

---

### 📄 `controlerPropuestas.js`

### 🧽 Función Principal:

```js
controlerPropuestas(db)
```

Maneja las **propuestas comerciales** del sistema. Opciones disponibles:

* Crear nueva propuesta
* Modificar propuesta existente
* Listar propuestas registradas
* Cambiar su estado (ej. enviada, aceptada, rechazada)

---

### 📄 `controlerProyectos.js`

### 🧽 Función Principal:

```js
controlerProyectos(db)
```

Permite administrar **proyectos** activos. Opciones disponibles:

* Crear proyecto
* Listar proyectos
* Actualizar proyecto seleccionado:

  * Entregables
  * Estado del proyecto
  * Fecha final
  * Modificación de entregables

Usa un submenú de actualización para gestionar estas acciones de forma separada.

---

### 📄 `controlerFinanzas.js`

### 🧽 Función Principal:

```js
controlerFinanzas(db)
```

Controlador de la gestión financiera del sistema. Funcionalidades:

* Listar estados de cuenta activos
* Registrar abonos (pagos de clientes)
* Agregar egresos (costos)
* Volver al menú anterior

Utiliza `inquirer` para selección de finanzas y validación de montos o descripciones.

---

### 📄 `controlerContratos.js`

### 🧽 Función Principal:

```js
controlerContratos()
```

Interfaz básica (en desarrollo) para manejar **contratos**:

* Crear contrato (pendiente)
* Listar contratos (pendiente)

Actualmente solo muestra mensajes simulados para los menús.

---

## 🔁 Flujo del sistema

Cada controlador es invocado desde los menús principales y funciona como intermediario entre el usuario y los servicios (`services/`) del sistema. Captura entradas, valida datos y asegura que se ejecuten las acciones correctas según el rol del usuario (administrador o cliente).
