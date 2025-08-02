# CLI

**menu.js** -> Creacion y estructuracion de los menus en metodos que podran ser llamados a futuro en otros modulos, incluye el GUI para el usuario.

## Lista de funciones

## **async function  menuPrincipal()**
Acceso principal al sistema, incluye el uso de chalk para mejorar la visual en consola, contiene las siguientes opciones en forma de lista:
- **Menu de Gestion de Administrador (Developer):** Para acceder al sistema principal de gestion de clientes,propuestas,proyectos y finanzas
- **Menu de Gestion de Cliente:** Para que el cliente pueda accerder a su registro personal de informacion almacenada en la base de datos
- **Salir del sistema de gestion:** Detiene y cierra la ejecucion del programa


## **async function gestorAdministrador()**
Menu de acceso del administrador, incluye el despliege de las siguientes opciones:
- **Gestion de Clientes:** Para accerder a las opciones que esten relacionadas con un cliente en espeficico
- **Gestion de Propuestas:** Para acceder a las opciones que esten relacionadas con el manejo de propuestas
- **Gestion de Proyectos:** Para acceder a las opciones relacionadas con proyectos
- **Gestion de Finanzas:** Para accerder a las opciones relacionadas con estados de cuenta ingresos y egresos

## **async function gestorClientes()**
Acceso al CRUD de clientes , despliega las siguientes opciones:
- **Registrar Cliente:** Ejecutar el registro del cliente.
- **Modificar Cliente:** Permite editar y actualizar la informacion del cliente.
- **Listar Cliente:** Permite detallar los distintos clientes de la base de datos.
- **Cambiar estado de Cliente:** Permite modificar solo el parametro estado.

## **async function gestorFinanzas()**
Despliegue de opciones de gestion de fiananzas:
- **Listar estados de cuenta:** Muestra todos los movimientos financieros
- **Hacer abono:** Permite agregar un abono a un proyecto preexistente
- **Registrar salida:**: Permite registrar un egreso
- **Volvera al menu anterior**:

## **async function gestorPropuestas()**
Despliege del menu para la gestion de propuestas
- **Crear Propuesta:** Accede a las opciones de creacion de propuesta
- **Modificar Propuesta** Permite acceder a las opciones de modificacion de la propuesta 
- **Listar Propuesta** Lista todas las propuestas dispoibles
- **Cambiar Estado Propuesta** Cambia los estados de una propuesta
- **Volver al menu anterior** 

## **async function gestorProyectos**
Menu para iniciar CRUD de un proyecto
- **Crear Proyecto:** Inica el prompt para iniciar el proyecto
- **Listar Proyectos:** Lista todos los proyectos disponibles de momento
- **Actualizar Proyectos:** Actualiza un proyecto en especifico
- **Volver al menu anterior:**

## **async function actualizacionProyectos()**
Menu para actualizar datos internos del objeto proyecto
- **Agregar Entregables**: Añade entregables a un proyecto en especifico
- **Actualizar estado**: Actualiza el estado de un entregable
- **Actualizar Fecha Final** :Actualiza la fecha de un entregable
- **Volver al menu anterior**:


## **async function gestorCliente()**
Menu para interaccion con un cliente en especifico en el que prodra visualizas todos los datos relacionados con el con las siguientes opciones.

- **Ver Proyectos**: Lista todas las propuestas del cliente
- **Ver propuestas**: Lista todos los proyectos del cliente
- **Ver Estado financiero** Lista el estado financiero del cliente
- **Ver datos personales** Lista informacion personal del cliente
--**Salir del sistema de gestion: ""Menu Principal Gestor"**

## **async function esperarTecla()**

Funcion auxiliar para la espera de un input en consola con la finalidad de transicionar de menus a menus o como un placer holder para funcionalidades a desarrollar