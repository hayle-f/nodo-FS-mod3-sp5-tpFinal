# Countries Dashboard with Node.js & MongoDB

##  Descripción

Aplicación full stack (MVC) construida con Node.js y MongoDB que permite explorar, filtrar y administrar información de países mediante un dashboard interactivo. Incluye operaciones CRUD, validaciones robustas y consumo de datos desde una API externa para poblar la base de datos.

---

## Funcionalidades principales

- Aplicación **full stack (MVC)** con Node.js, Express y MongoDB  
- **Consumo de datos** desde la API RESTCountries para poblar la base de datos  
- **Limpieza y normalización** de datos, agregando información propia  
- **CRUD completo**: agregar, editar, eliminar y ver detalles de países  
- **Búsqueda, filtros y ordenamiento** en el dashboard  
- **Validaciones robustas** en backend y frontend  
- **Actualización automática** de datos desde la API  
- **Interfaz amigable y consistente** (navbar, footer, formularios)  

---

## 🛠️ Tecnologías utilizadas

- **Node.js** → entorno de ejecución para el backend  
- **Express.js** → framework para manejar rutas, middlewares y controladores  
- **RESTCountries API** → fuente de datos externa para obtener información de países  
- **MongoDB** → base de datos NoSQL  
- **Mongoose** → ODM para definir esquemas y manejar operaciones sobre MongoDB  
- **EJS + HTML5, CSS3, JS** → renderizado de vistas dinámicas y frontend  
- **Axios** → cliente HTTP para consumo de la API externa  
- **Express Validator** → middleware para validar datos en formularios y peticiones  
- **Method-Override** → permite usar PUT y DELETE desde formularios HTML  
- **Node-Cron** → programación de tareas periódicas (actualización automática) 

---

## 🗂️ Estructura del proyecto

- **config/** → configuración de la conexión a MongoDB (`configDB.mjs`)  
- **controllers/** → lógica de negocio y manejo de peticiones, controlando CRUD y rutas (`paisesController.mjs`)  
- **services/** → servicios internos y consumo de APIs externas (`paisesAPIService.mjs`, `paisesService.mjs`)  
- **repositories/** → acceso a datos y operaciones sobre MongoDB (`paisesRepository.mjs`)  
- **routes/** → definición de rutas de la aplicación (`paisesRoutes.mjs`)  
- **seed/** → scripts para poblar la base de datos con información inicial (`cargarPaises.mjs`)  
- **validations/** → validaciones de datos y mensajes de error personalizados (`paisesValidations.mjs`, `paisesError.mjs`)  
- **views/** → vistas EJS y plantillas para el frontend (`dashboard.ejs`, `editarPais.ejs`, `partials/`)  
- **public/** → recursos estáticos (CSS, JS, imágenes, logos)  
- `app.mjs` → servidor principal, configuración de middlewares y arranque del proyecto  
- `package.json` → dependencias, scripts y configuración general del proyecto  
- `.env` → variables de entorno necesarias para la ejecución  
- `.gitignore` → archivos y carpetas ignoradas por Git

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
