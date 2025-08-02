# **📂 Estructura del archivo** db.js

Este módulo permite establecer y reutilizar la conexión inicial con la base de datos MongoDB, ya sea local o en MongoDB Atlas. Forma parte de la carpeta `config` del sistema.

## 📦 Dependencias

* `dotenv`: Para cargar variables de entorno desde un archivo `.env`.
* `mongodb`: Cliente oficial para conectarse a MongoDB desde Node.js.

# Listado de funciones 

## 🔧 Funciones Exportada

```javascript
async function conectarDB()
```

Establece una conexión con la base de datos MongoDB usando la URI definida en la variable de entorno `MONGO_URI`. Si ya existe una conexión global activa, la reutiliza. Muestra un mensaje en consola indicando si se conectó a una base local o a MongoDB Atlas.

* En caso de error, muestra un mensaje de error y termina la ejecución con `process.exit(1)`.

```javascript
async function obtenerDB()
```

Devuelve una instancia de la base de datos `gestordeproyectos`. Internamente llama a `conectarDB()` para asegurarse de que exista una conexión activa.&#x20;

## 🧪 Buenas Prácticas

* Usa variables de entorno para la URI de conexión.
* No expone credenciales ni datos sensibles.
* Maneja errores de conexión apropiadamente.
* Reutiliza conexiones siempre que sea posible para mejorar el rendimiento.

---

Este módulo es clave para la integridad y rendimiento del sistema al interactuar con la base de datos MongoDB.
