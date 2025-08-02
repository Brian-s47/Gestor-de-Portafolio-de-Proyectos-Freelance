# 📁 Gestor de Portafolio de Proyectos Freelance

Este módulo contiene la definición de los distintos menús de navegación utilizados en la aplicación CLI de gestión de portafolios freelance. Utiliza una interfaz visual en consola mediante las librerías `inquirer`, `chalk` y `boxen` para ofrecer una experiencia de usuario amigable y estructurada.

## 📦 Dependencias

* **inquirer**: Permite generar prompts interactivos en la línea de comandos.
* **chalk**: Proporciona estilos de color y formato en texto.
* **boxen**: Encierra texto en cajas estilizadas para una mejor presentación.

---

## 📂 Estructura del archivo `menus.js`

El archivo define diferentes funciones asíncronas que generan los menús para distintos roles y acciones del sistema.

---

## 📋 Menús Principales

```javascript
async function menuPrincipal()
```

Despliega el menú principal con las siguientes opciones:

* `Menu de Gestion de Administrador (Developer)`: Acceso completo al sistema para gestionar clientes, propuestas, proyectos y finanzas.
* `Menu de Gestion de Cliente`: Acceso restringido para que el cliente visualice su información personal, financiera y proyectos asociados.
* `Salir del sistema de gestion`: Finaliza la ejecución del sistema.

---

## 👨‍💼 Menú Administrador

```javascript
async function gestorAdministrador()
```

Permite al administrador acceder a los siguientes submenús:

* `Gestion de Clientes`: Registro, modificación y listado de clientes.
* `Gestion de Propuestas`: Creación y edición de propuestas comerciales.
* `Gestion de Proyectos`: Administración del ciclo de vida de proyectos.
* `Gestion de Finanzas`: Control financiero, incluyendo ingresos y egresos.
* `Salir al menú principal`: Retorna al menú principal del sistema.

---

## 👥 Menú de Gestión de Clientes

```javascript
async function gestorClientes()
```

Opciones CRUD relacionadas con los clientes:

* `Registrar Cliente`: Permite dar de alta un nuevo cliente en el sistema.
* `Modificar Cliente`: Edita los datos existentes de un cliente.
* `Listar Cliente`: Muestra una lista de todos los clientes registrados.
* `Cambiar Estado Cliente`: Cambia el estado activo/inactivo del cliente.
* `Volver al menú anterior`: Regresa al menú del administrador.

---

## 💰 Menú de Gestión Financiera

```javascript
async function gestorFinanzas()
```

Permite visualizar y gestionar la información financiera:

* `Listar estados de cuenta`: Muestra un resumen financiero de cada cliente.
* `Hacer abono`: Registra pagos realizados por parte del cliente.
* `Registrar salida`: Permite registrar egresos financieros.
* `Volver al menú anterior`: Regresa al menú del administrador.

---

## 📟 Menú de Gestión de Propuestas

```javascript
async function gestorPropuestas()
```

Permite al administrador manejar propuestas enviadas a clientes:

* `Crear Propuesta`: Permite crear una nueva propuesta comercial.
* `Modificar Propuesta`: Edita los detalles de una propuesta existente.
* `Listar Propuestas`: Muestra un listado general de las propuestas.
* `Cambiar Estado de Propuesta`: Actualiza el estado de una propuesta.
* `Volver al menú anterior`: Regresa al menú del administrador.

---

## 🚧 Menú de Gestión de Proyectos

```javascript
async function gestorProyectos()
```

Facilita la gestión de proyectos registrados en el sistema:

* `Crear Proyecto`: Inicia un nuevo proyecto con datos asociados.
* `Listar Proyectos`: Muestra una lista de todos los proyectos.
* `Actualizar Proyectos`: Permite modificar información de proyectos.
* `Volver al menú anterior`: Regresa al menú del administrador.

```javascript
async function actualizacionProyectos()
```

Submenú específico para actualizar atributos de un proyecto:

* `Agregar Entregables`: Añade entregables nuevos a un proyecto existente.
* `Actualizar Estado`: Cambia el estado de avance del proyecto.
* `Actualizar Fecha Final`: Modifica la fecha de finalización prevista.
* `Actualizar Entregables`: Edita los entregables previamente registrados.
* `Volver al menú anterior`: Retorna al menú anterior de gestión de proyectos.

---

## 🧑‍💼 Menú Cliente

```javascript
async function gestorCliente()
```

Menú dirigido a los clientes para visualizar su información:

* `Ver Proyectos`: Muestra los proyectos en los que está involucrado.
* `Ver Propuestas`: Muestra las propuestas que se le han enviado.
* `Ver Estado Financiero`: Visualiza su estado de cuenta y pagos.
* `Ver Datos Personales`: Muestra la información registrada del cliente.
* `Salir al menú principal`: Regresa al menú principal del sistema.

---

## ⌨️ Funciones Auxiliares

```javascript
async function esperarTecla()
```

Espera una acción del usuario (Enter) antes de continuar. Es útil como pausa entre transiciones de menú o pasos secuenciales.

---

## 📌 Uso Recomendado

Este módulo debe importarse en el archivo principal de la CLI y las funciones se deben encadenar lógicamente según el flujo del sistema, facilitando la navegación entre menús y la gestión de información del portafolio freelance.
