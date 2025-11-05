TPFinal API
API para la gestión de productos de una tienda. Desarrollada con Node.js, Express y MongoDB Atlas como Trabajo Práctico Final del curso de Backend de UTN.
Esquema de la Base de Datos
Colección: products
{
  _id: ObjectId,
  name: String,              // Nombre del producto (requerido)
  description: String,       // Descripción del producto
  costPrice: Number,         // Precio de costo (requerido, mínimo 0)
  profitRate: Number,        // Margen de ganancia (requerido, mínimo 0)
  stock: Number,             // Cantidad en stock (requerido, mínimo 0)
  status: String,            // "AVAILABLE"|"NOT AVAILABLE"|"DISCONTINUED"
  highlighted: Boolean,      // Producto destacado (default: false)
  category: ObjectId,        // Referencia a la colección categories
  createdAt: Date,          // Fecha de creación (automático)
  updatedAt: Date           // Fecha de actualización (automático)
}
Colección: category
{
  _id: ObjectId,
  name: String,              	// Nombre de la categoría (requerido, único)
  registrationDate: String,     	// Fecha y hora de registro de Categoría
  createdAt: Date,          	// Fecha de creación (automático)
  updatedAt: Date           	// Fecha de actualización (automático)
}


Tecnologías Utilizadas
Backend
-	Node.js (v18+) - Entorno de ejecución
-	Express.js (v5.1.0) - Framework web
-	MongoDB (v6.20.0) - Base de datos NoSQL
-	Mongoose (v8.19.2) - ODM para MongoDB
Autenticación y Seguridad
-	bcrypt (v6.0.0) - Encriptación de contraseñas
-	jsonwebtoken (v9.0.2) - Generación y validación de tokens JWT
-	express-session (v1.18.2) - Gestión de sesiones
Utilidades
-	cors (v2.8.5) - Manejo de CORS
-	body-parser (v2.2.0) - Parseo de JSON
-	dotenv (v17.2.3) - Variables de entorno
Desarrollo
-	nodemon (v3.1.10) - Auto-reload en desarrollo
Instrucciones para Correr el Proyecto
1.	Clonar el repositorio
git clone <url-del-repositorio>
cd tp-final

2.	Instalar dependencias
npm install

3.	Configurar variables de entorno
Env
PORT=3000
MONGODB_URI=mongodb+srv://gabogaleano_db_user:3aQ2DHvlOqzwoLnT@cluster0.dn6zawy.mongodb.net/TPFinal?appName=Cluster0
SECRET=”secret”

*Nota: Reemplaza <usuario> y <password> con tus credenciales de MongoDB Atlas.

4.	Ejecutar el proyecto

Modo desarrollo (con auto-reload):
npm run dev

Modo producción:
npm start

*El servidor estará disponible en: http://localhost:3000

Endpoints Disponibles
Productos
Método	Endpoint	Descripción
GET		api/products/status		Filtrar estados.
POST		api/products/			Crear un nuevo producto.
GET		api/products/			Listar todos los productos.
POST		api/products/name		Buscar producto por nombre.
GET		api/products/:id		Obtener un producto por ID
PUT		api/products/update/:id	Actualizar dato de un producto.
DELETE		api/products/:id		Eliminar un producto.

Categorías
Método	Endpoint			Descripción
GET		api/category/			Listar todas las categorías.
POST		api/category/			Crear una nueva categoría.
DELETE		api/category/:id		Eliminar una categoría.

Autenticación de usuario
Método		Endpoint		Descripción
POST			api/users/		Crear un nuevo usuario.
GET			api/users/		Listar usuarios por email.
DELETE			api/users/:id		Borrar un usuario.
PUT			api/users/:id		Actualizar un usuario.
POST			api/users/login	Validar usuario (Se obtiene token JWT).



Ejemplos de Datos Mock (JSON)
-	Crear Producto (POST /api/products/)
{
  "name": "Comederos Medianos",
  "description": "Comederos personalizados con el nombre de tu mascota en plástico resistente",
  "costPrice": 1500,
  "profitRate": 2,
  "stock": 25,
  "status": "AVAILABLE",
  "highlighted": true,
  "category": "673a1b2c3d4e5f6a7b8c9d0e"
}
-	Actualizar Producto (PUT /api/products/update/:id)
{
  "stock": 30,
  "costPrice": 1600,
  "status": "AVAILABLE"
}
-	Crear Categoría (POST /api/category/)
{
  "name": "Alimentos",
  "description": "Alimentos balanceados y premios para mascotas"
}




-	Registrar Usuario (POST /api/users/)
{
  "email": "juan.perez@example.com",
  "password": "MiPassword123!",
}
-	Login (POST /api/users/login)
{
  "email": "juan.perez@example.com",
  "password": "MiPassword123!"
}
Notas Importantes
Estados de Producto
Los valores válidos para el campo status son:
•	AVAILABLE - Producto disponible
•	NOT AVAILABLE - Sin stock
•	DISCONTINUED – Descontinuado



Contacto
Trabajo Práctico Final - UTN Backend
Gabriel Galeano
11-6031-7829
gabogaleano@gmail.com
Año: 2025
