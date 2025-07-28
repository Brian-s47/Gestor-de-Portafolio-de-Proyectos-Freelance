# Gestor de Portafolio de Proyectos Freelance

## 🧩 Descripción del Proyecto

Aplicación de línea de comandos (CLI) desarrollada en Node.js que permite a freelancers gestionar su portafolio profesional de manera ordenada. La herramienta ofrece funcionalidades para controlar clientes, propuestas, proyectos, contratos, entregables y finanzas.

Este repositorio contiene la estructura base del proyecto, configurada para facilitar el desarrollo ordenado desde el primer Sprint.

---

## 📋 Tablero SCRUM (Gestión del Proyecto)

Puedes visualizar el seguimiento de tareas, historias de usuario y avances del proyecto en nuestro tablero Scrum en GitHub Projects:

🔗 [Acceder al tablero del proyecto](https://github.com/users/Brian-s47/projects/19/views/1)


## ⚙️ Instalación y Ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Brian-s47/Gestor-de-Portafolio-de-Proyectos-Freelance
   cd Gestor-de-Portafolio-de-Proyectos-Freelance
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` con tus variables de entorno.

4. Ejecuta la aplicación:
   ```bash
   npm start
   ```

---

## 🗂 Estructura del Proyecto

```
/config         # Configuración general del proyecto
/models         # Definición de modelos de datos
/services       # Lógica de negocio
/commands       # Comandos CLI
/utils          # Funciones auxiliares
/src            # Código fuente principal
.gitignore      # Archivos y carpetas excluidas del control de versiones
app.js          # Punto de entrada del CLI
```

---

## 📦 Dependencias Iniciales

- `dotenv`: manejo de variables de entorno
- `chalk`: estilos y colores para la consola
- `inquirer`: interacción CLI con el usuario
- `boxen`: mensajes destacados en consola
- `lodash`: utilidades para manipulación de datos
- `mongodb`: conexión y operaciones con la base de datos

---

## 🧠 Consideraciones Técnicas

- Uso de estructura de carpetas clara y modular.
- Script `start` en `package.json` para facilitar la ejecución.
- Estilizado de mensajes en consola con `chalk`.
- Convenciones de commits siguiendo el formato `feat:`, `fix:`, `docs:`, etc.

---

### 🧱 Patrones de Diseño Aplicados

Este proyecto implementará los siguientes patrones de diseño para mejorar la escalabilidad, modularidad y mantenibilidad del código:

- **Factory Pattern**: Para la creación de objetos reutilizables como instancias de entidades o servicios, permitiendo la encapsulación de lógica de construcción.
- **Repository Pattern**: Para abstraer la lógica de acceso a datos y desacoplar la persistencia (MongoDB) de la lógica de negocio.
- **Command Pattern**: Para encapsular operaciones del CLI como comandos individuales, facilitando la extensión y organización de funcionalidades.
- **Singleton Pattern** *(opcional)*: Para instancias únicas como configuración global o conexión a la base de datos.

Cada patrón será aplicado de forma coherente con los principios SOLID y documentado en su respectiva sección dentro del proyecto.

---

## 👤 Créditos

Proyecto desarrollado por :

Brian Fair Suarez Porras
David Adolfo Gomez Uribe
Johan Sebastian Omaña Suarez

como parte del curso de Desarrollo Backend con Node.js.

---

## 📹 Video de Presentación

🔗 *[Por agregar en etapas futuras]*

# Gestor de Portafolio de Proyectos Freelance

## 🧩 Descripción del Proyecto

Aplicación de línea de comandos (CLI) desarrollada en Node.js que permite a freelancers gestionar su portafolio profesional de manera ordenada. La herramienta ofrece funcionalidades para controlar clientes, propuestas, proyectos, contratos, entregables y finanzas.

Este repositorio contiene la estructura base del proyecto, configurada para facilitar el desarrollo ordenado desde el primer Sprint.

---

## 📋 Tablero SCRUM (Gestión del Proyecto)

Puedes visualizar el seguimiento de tareas, historias de usuario y avances del proyecto en nuestro tablero Scrum en GitHub Projects:

🔗 [Acceder al tablero del proyecto](https://github.com/users/Brian-s47/projects/19/views/1)


## ⚙️ Instalación y Ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Brian-s47/Gestor-de-Portafolio-de-Proyectos-Freelance
   cd Gestor-de-Portafolio-de-Proyectos-Freelance
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` con tus variables de entorno.

4. Ejecuta la aplicación:
   ```bash
   npm start
   ```

---

## 🗂 Estructura del Proyecto

```
/config         # Configuración general del proyecto
/models         # Definición de modelos de datos
/services       # Lógica de negocio
/commands       # Comandos CLI
/utils          # Funciones auxiliares
/src            # Código fuente principal
.gitignore      # Archivos y carpetas excluidas del control de versiones
app.js          # Punto de entrada del CLI
```

---

## 📦 Dependencias Iniciales

- `dotenv`: manejo de variables de entorno
- `chalk`: estilos y colores para la consola
- `inquirer`: interacción CLI con el usuario
- `boxen`: mensajes destacados en consola
- `lodash`: utilidades para manipulación de datos
- `mongodb`: conexión y operaciones con la base de datos

---

## 🧠 Consideraciones Técnicas

- Uso de estructura de carpetas clara y modular.
- Script `start` en `package.json` para facilitar la ejecución.
- Estilizado de mensajes en consola con `chalk`.
- Convenciones de commits siguiendo el formato `feat:`, `fix:`, `docs:`, etc.

---

### 🧱 Patrones de Diseño Aplicados

Este proyecto implementará los siguientes patrones de diseño para mejorar la escalabilidad, modularidad y mantenibilidad del código:

- **Factory Pattern**: Para la creación de objetos reutilizables como instancias de entidades o servicios, permitiendo la encapsulación de lógica de construcción.
- **Repository Pattern**: Para abstraer la lógica de acceso a datos y desacoplar la persistencia (MongoDB) de la lógica de negocio.
- **Command Pattern**: Para encapsular operaciones del CLI como comandos individuales, facilitando la extensión y organización de funcionalidades.
- **Singleton Pattern** *(opcional)*: Para instancias únicas como configuración global o conexión a la base de datos.

Cada patrón será aplicado de forma coherente con los principios SOLID y documentado en su respectiva sección dentro del proyecto.

---

## 👤 Créditos

Proyecto desarrollado por :

Brian Fair Suarez Porras
David Adolfo Gomez Uribe
Johan Sebastian Omaña Suarez

como parte del curso de Desarrollo Backend con Node.js.

---

## 📹 Video de Presentación

🔗 *[Por agregar en etapas futuras]*
