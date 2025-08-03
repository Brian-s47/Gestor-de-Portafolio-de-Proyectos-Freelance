# 📁 Utils 

Esta carpeta agrupa funciones auxiliares y scripts de prueba que facilitan la validación de datos y la depuración del sistema. Se utilizan en distintos puntos del flujo de control, especialmente desde los servicios y controladores.

---

## 📦 Dependencias

* **`lodash`**: Utilizado para comprobaciones como vacíos o tipos.
* **`chalk`**: Estiliza mensajes de error en la terminal.
* **`dayjs`**: Gestión y validación de fechas.
* **`services/clientesService.js`**: Usado en el script de prueba para crear, listar, actualizar y eliminar clientes【135†source】.

---

## 📄 `validadores.js`

Contiene funciones reutilizables para validar entradas de texto, números, fechas y teléfonos. Estas funciones se integran con `inquirer` para mejorar la experiencia del usuario en CLI.

### Funciones principales:

* `validarTextoNoVacioNiSimbolos(input)` → Solo letras y espacios, sin símbolos【134†source】.
* `validarNumeroPositivo(input)` → Números positivos mayores a cero.
* `validarFecha(input)` → Fecha en formato `YYYY-MM-DD`, posterior al día actual.
* `validarTextoObligatorio(input)` → Campo no puede estar vacío.
* `validarTelefono(input)` → Validación de números de teléfono válidos con o sin `+`.

✅ Todas las funciones devuelven `true` si el valor es válido, o un mensaje formateado si es inválido.

---

## 📄 `ejemploCliente.js`

Script para probar manualmente las funciones del módulo `clientesService.js`:

1. Crea un cliente con datos de ejemplo.
2. Lista todos los clientes existentes.
3. Actualiza el teléfono de un cliente con ID especificado.
4. Elimina al cliente (tras un retardo de 5 segundos).

💡 Este archivo se ejecuta desde consola con:

```bash
node utils/ejemploCliente.js
```


