
import express from 'express';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';
import { connectDB } from './config/configDB.mjs';
import paisesRoutes from './routes/paisesRoutes.mjs';
import methodOverride from 'method-override';
import dotenv from "dotenv";

//asegura que process.env.MONGO_URI y process.env.PORT estén disponibles
dotenv.config();  

// Configurar __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para soportar PUT y DELETE vía formularios
app.use(methodOverride('_method'));

// Variables locales por defecto en las vistas
app.use((req, res, next) => {
  res.locals.errores = [];
  res.locals.pais = {};
  next();
});

// Configuración del motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuración de express-ejs-layouts
app.use(expressEjsLayouts);
app.set('layout', 'layout');

// Ruta raíz
app.get('/', (req, res) => {
  res.render('index');
});

// Rutas de la API
app.use('/', paisesRoutes);

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Arrancar servidor solo después de conectar a MongoDB
(async () => {
  try {
    await connectDB(); // espera a que la DB esté lista

    // Importar y ejecutar cron después de conectar a la DB
    import('./cron/cronActualizarPaises.mjs');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en: http://localhost:${PORT}/`);
    });
  } catch (err) {
    console.error('No se pudo iniciar el servidor, error al conectar DB:', err);
  }
})();

