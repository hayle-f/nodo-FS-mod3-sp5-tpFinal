# Dashboard de Países – TP Final Sprint 5

## 📌 Descripción

Este proyecto es una aplicación full stack realizada como trabajo final del Sprint 5 del Módulo 3 de Node.js, de la Diplomatura en Diseño Web Full Stack con JavaScript del Nodo Tecnológico de Catamarca.

La aplicación consume datos de países desde una API externa, almacena los datos filtrados en MongoDB y los presenta en un dashboard dinámico, donde se puede buscar, filtrar, ordenar y explorar detalles de cada país.

---

## 🎯 Objetivos del Proyecto

- Construir una aplicación web full stack utilizando Node.js, Express y MongoDB.
- Consumir datos desde la API RESTCountries y filtrar solo los países que hablen español.
- Limpiar y normalizar los datos recibidos, eliminando campos innecesarios y agregando información propia (ej. “creador”).
- Persistir los datos filtrados en MongoDB, asegurando integridad y validaciones.
- Implementar un dashboard interactivo que muestre los países con opciones de búsqueda, filtrado y ordenamiento.
- Permitir operaciones CRUD completas: agregar, editar y eliminar países desde la interfaz.
- Garantizar validaciones robustas en backend y mostrar mensajes claros en frontend para datos inválidos.
- Proporcionar una interfaz amigable con layout consistente, navbar, footer y formularios ergonómicos.

---

## 🛠️ Tecnologías utilizadas

- Node.js → entorno de ejecución para JavaScript en el backend.
- Express.js → framework web para manejar rutas, middlewares y controladores.
- RESTCountries API → fuente de datos externa utilizada para obtener información de países.
- MongoDB → base de datos NoSQL para almacenar la información de países.
- Mongoose → ODM para definir esquemas y realizar operaciones sobre MongoDB.
- EJS → motor de plantillas para renderizar vistas dinámicas en el frontend.
- Express EJS Layouts → gestión de plantillas maestras y layouts en las vistas.
- Axios → cliente HTTP para consumir la API externa.
- Express Validator → middleware para validar datos en formularios y peticiones.
- Method-Override → permite usar métodos HTTP como PUT y DELETE desde formularios HTML.
- Node-Cron → programación de tareas periódicas (actualización automática de datos)
- HTML5, CSS y JS → tecnologías base para la construcción del frontend.
- Git & GitHub → control de versiones y alojamiento del repositorio.

---

## 🧱 Estructura del Proyecto

```
📁 config/                     # Configuraciones generales del proyecto
   └─ configDB.mjs              # Configuración de la conexión a MongoDB

📁 controllers/                 # Lógica de negocio de la app
   └─ paisesController.mjs      # Controlador principal de países: maneja requests y responses del CRUD

📁 cron/                        # Node-cron
   └─ cronActualizarPaises.mjs  # logica que actualiza automáticamente los países cada X horas

📁 models/                      # Modelos de datos (Mongoose)
   └─ paisModel.mjs             # Modelo País: esquema y validaciones de MongoDB

📁 public/                      # Recursos estáticos accesibles desde el navegador
   📁 css/
   │   └─ styles.css            # Estilos CSS del frontend
   📁 imgs/
   │   └─ logonode.svg          # Logo e imágenes del proyecto
   📁 js/
       ├─ filtros.js            # Lógica de filtros y búsqueda en el dashboard
       └─ mensajes-error.js     # Manejo de mensajes de error en frontend

📁 repositories/                # Capa de acceso a datos
   ├─ IRepository.mjs           # Interface genérica de repositorio
   └─ paisesRepository.mjs      # Implementación del repositorio para países (CRUD DB)

📁 routes/                      # Definición de rutas de la aplicación
   └─ paisesRoutes.mjs          # Rutas para listado, agregar, editar y eliminar países

📁 seed/                        # Scripts de inicialización de datos
   └─ cargarPaises.mjs          # Carga inicial de países desde API RESTCountries a MongoDB

📁 services/                    # Lógica de servicios y APIs externas
   ├─ paisesAPIService.mjs      # Servicio que consume RESTCountries API y devuelve datos filtrados
   └─ paisesService.mjs         # Servicio que maneja operaciones internas sobre los países

📁 validations/                 # Validaciones de datos
   ├─ paisesError.mjs           # Mensajes de error personalizados
   ├─ paisesValidations.mjs     # Validaciones de campos de formularios (backend)
   └─ transformarDatos.mjs      # Funciones para limpiar y transformar datos antes de guardarlos

📁 views/                        # Vistas EJS de la aplicación
   ├─ acercaDe.ejs               # Página de información general del proyecto
   ├─ confirmarEliminacion.ejs   # Modal de confirmación para eliminar país
   ├─ crearPais.ejs             # Formulario para agregar país
   ├─ dashboard.ejs             # Tabla de países con filtros y totales
   ├─ editarPais.ejs            # Formulario para editar país existente
   ├─ index.ejs                 # Landing / página principal
   ├─ infoPais.ejs              # Página de información detallada de un país
   ├─ layout.ejs                # Layout base de todas las vistas (navbar + footer)
   📁 partials/                  # Partes reutilizables de las vistas
       ├─ footer.ejs            # Footer global
       ├─ formPais.ejs          # Formulario parcial usado en crear y editar país
       ├─ modalinfoPais.ejs     # Modal con información completa del país
       └─ navbar.ejs            # Barra de navegación global

📄 app.mjs                      # Servidor principal Express + configuración de middlewares
📄 package.json                  # Dependencias y scripts del proyecto
📄 package-lock.json             # Lockfile de dependencias
📄 README.md                     # Documentación del proyecto
📄 .env                          # ⚠️ Variables de entorno 
📄 .gitignore                    # Archivos/carpetas a ignorar por git (incluye .env y node_modules/)
```

---

## 🚀 Instalación y Puesta en Marcha

1. **Clonar el repositorio**
```bash
git clone https://github.com/hayle-f/nodo-FS-mod3-sp5-tpFinal.git
cd nodo-FS-mod3-sp5-tpFinal
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
- Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:
```bash
PORT=3000
MONGO_URI=<TU_URI_DE_MONGODB>
```

4. **Cargar datos iniciales en MongoDB**
- Ejecutar el script que obtiene los países desde la API y los guarda en la base de datos:
```bash
node seed/cargarPaises.mjs
```

5. **Ejecutar el servidor**
```bash
node app.mjs
```

6. **Abrir la aplicación en el navegador**
- Ir a [http://localhost:3000/](http://localhost:3000) para acceder.
---

**Haylén Ferrario**    
🔗 [GitHub](https://github.com/hayle-f/nodo-FS-mod3-sp5-tpFinal)
