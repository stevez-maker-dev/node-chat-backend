# node-chat-backend

API RESTful desarrollada con **Node.js**, **Express** y **MongoDB** que sirve como backend para una aplicación de chat. Permite gestionar usuarios, chats y mensajes, con persistencia de datos y respuestas estandarizadas.

> Trabajo Final Integrador — Desarrollo en Node.js — Centro de e-Learning UTN BA

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv

## Estructura del proyecto

```
node-chat-backend/
├── src/
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── chatRoutes.js
│   │   └── messageRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── chatController.js
│   │   └── messageController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Chat.js
│   │   └── Message.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── authMiddleware.js
│   ├── config/
│   │   └── db.js
│   │   └── enviroment.js
│   └── app.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/stevez-maker-dev/node-chat-backend.git
cd node-chat-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Creá un archivo `.env` en la raíz del proyecto, tomando como referencia `.env.example`:

```
MONGODB_URI=tu_connection_string_de_mongodb_atlas
PORT=3000
JWT_SECRET=un_texto_secreto_largo_y_dificil_de_adivinar
```

### 4. Ejecutar el servidor

Modo desarrollo (con reinicio automático via nodemon):

```bash
npm run dev
```

El servidor va a levantar en `http://localhost:3000` (o el puerto que hayas definido en `.env`).

## Formato de respuesta estandarizado

Todas las respuestas de la API siguen el mismo formato:

```json
{
  "success": true,
  "data": {},
  "message": "Descripción de lo ocurrido"
}
```

- `success`: booleano que indica si la operación fue exitosa
- `data`: el recurso solicitado/creado, o `null` en caso de error
- `message`: mensaje descriptivo del resultado

## Endpoints
 
> 🔒 Todas las rutas de `/api/users`, `/api/chats` y `/api/messages` requieren autenticación. Hay que enviar el token JWT obtenido en el login como header:
> ```
> Authorization: Bearer <token>
> ```
> Las únicas rutas públicas son `/api/auth/register` y `/api/auth/login`.

### Auth — `/api/auth`
 
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registra un nuevo usuario (hashea el password con bcrypt) |
| POST | `/api/auth/login` | Autentica un usuario y devuelve un token JWT |
 
**POST `/api/auth/register`**
 
Request:
```json
{
  "username": "sebas91",
  "email": "sebas@test.com",
  "password": "123456"
}
```
 
Response `201`:
```json
{
  "success": true,
  "data": {
    "_id": "66f1a2b3c4d5e6f7a8b9c0d1",
    "username": "sebas91",
    "email": "sebas@test.com",
    "createdAt": "2026-07-20T12:00:00.000Z",
    "updatedAt": "2026-07-20T12:00:00.000Z"
  },
  "message": "Usuario creado exitosamente"
}
```
 
**POST `/api/auth/login`**
 
Request:
```json
{
  "username": "sebas91",
  "password": "123456"
}
```
 
Response `200`:
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "66f1a2b3c4d5e6f7a8b9c0d1",
      "username": "sebas91",
      "email": "sebas@test.com",
      "createdAt": "2026-07-20T12:00:00.000Z",
      "updatedAt": "2026-07-20T12:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Usuario autenticado exitosamente"
}
```
 
Response `401` (credenciales inválidas, mensaje genérico por seguridad):
```json
{
  "success": false,
  "data": null,
  "message": "Credenciales inválidas"
}
```
 
---

### Users — `/api/users` 🔒
 
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/users` | Lista todos los usuarios |
| DELETE | `/api/users/:id` | Elimina un usuario por ID |
 
**GET `/api/users`**
 
Response `200`:
```json
{
  "success": true,
  "data": [ /* array de usuarios */ ],
  "message": "Usuarios obtenidos exitosamente"
}
```
 
**DELETE `/api/users/:id`**
 
Response `200`:
```json
{
  "success": true,
  "data": { /* usuario eliminado */ },
  "message": "Usuario eliminado exitosamente"
}
```
 
Response `404` (si el ID no existe):
```json
{
  "success": false,
  "data": null,
  "message": "Usuario no encontrado"
}
```
 
---

### Chats — `/api/chats`

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/chats` | Crea un nuevo chat entre participantes existentes |
| GET | `/api/chats` | Lista todos los chats (con datos de participantes) |

**POST `/api/chats`**

Request:
```json
{
  "participants": ["66f1a2b3c4d5e6f7a8b9c0d1", "66f1b3c4d5e6f7a8b9c0d2e3"]
}
```

Response `201`:
```json
{
  "success": true,
  "data": {
    "_id": "66f1c4d5e6f7a8b9c0d3e4f5",
    "participants": ["66f1a2b3c4d5e6f7a8b9c0d1", "66f1b3c4d5e6f7a8b9c0d2e3"],
    "createdAt": "2026-07-20T12:05:00.000Z"
  },
  "message": "Chat creado exitosamente"
}
```

Response `400` (si algún participante no existe):
```json
{
  "success": false,
  "data": null,
  "message": "Algunos usuarios no existen"
}
```

**GET `/api/chats`**

Response `200` (los participantes vienen con sus datos, gracias a `populate`):
```json
{
  "success": true,
  "data": [
    {
      "_id": "66f1c4d5e6f7a8b9c0d3e4f5",
      "participants": [
        { "_id": "66f1a2b3c4d5e6f7a8b9c0d1", "username": "sebas91", "email": "sebas@test.com" },
        { "_id": "66f1b3c4d5e6f7a8b9c0d2e3", "username": "ana22", "email": "ana@test.com" }
      ],
      "createdAt": "2026-07-20T12:05:00.000Z"
    }
  ],
  "message": "Chats obtenidos exitosamente"
}
```

---

### Messages — `/api/messages`

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/messages` | Envía un mensaje asociado a un chat y un usuario |
| GET | `/api/messages/:chatId` | Recupera el historial de mensajes de un chat, ordenado cronológicamente |

**POST `/api/messages`**

Request:
```json
{
  "chatId": "66f1c4d5e6f7a8b9c0d3e4f5",
  "userId": "66f1a2b3c4d5e6f7a8b9c0d1",
  "content": "Hola, ¿cómo andás?"
}
```

Response `201`:
```json
{
  "success": true,
  "data": {
    "_id": "66f1d5e6f7a8b9c0d4e5f6a7",
    "chatId": "66f1c4d5e6f7a8b9c0d3e4f5",
    "userId": "66f1a2b3c4d5e6f7a8b9c0d1",
    "content": "Hola, ¿cómo andás?",
    "createdAt": "2026-07-20T12:10:00.000Z"
  },
  "message": "Mensaje enviado exitosamente"
}
```

Response `404` (si el chat o el usuario no existen):
```json
{
  "success": false,
  "data": null,
  "message": "Chat no encontrado"
}
```

**GET `/api/messages/:chatId`**

Response `200` (ordenado del mensaje más viejo al más nuevo, con datos del remitente):
```json
{
  "success": true,
  "data": [
    {
      "_id": "66f1d5e6f7a8b9c0d4e5f6a7",
      "chatId": "66f1c4d5e6f7a8b9c0d3e4f5",
      "userId": { "_id": "66f1a2b3c4d5e6f7a8b9c0d1", "username": "sebas91", "email": "sebas@test.com" },
      "content": "Hola, ¿cómo andás?",
      "createdAt": "2026-07-20T12:10:00.000Z"
    }
  ],
  "message": "Mensajes obtenidos exitosamente"
}
```

## Conexión con el frontend (React)

El backend está preparado para ser consumido por un cliente React (u otro framework) mediante peticiones HTTP estándar. Ejemplo de consumo con `fetch`:

```javascript
// 1. Login para obtener el token
const loginResponse = await fetch("http://localhost:3000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: "sebas91", password: "123456" })
});
const { data } = await loginResponse.json();
const { token } = data;
 
// 2. Usar el token en requests a rutas protegidas
const chatsResponse = await fetch("http://localhost:3000/api/chats", {
  headers: { "Authorization": `Bearer ${token}` }
});
const { success, data: chats, message } = await chatsResponse.json();
```

Como todas las respuestas siguen el formato `{ success, data, message }`, el frontend puede manejar de forma consistente tanto los casos de éxito como los de error, verificando el flag `success` antes de usar `data`.

**CORS:** si el frontend corre en un origen distinto (por ejemplo `http://localhost:5173` con Vite), puede ser necesario habilitar el middleware `cors` en el backend para permitir las peticiones cross-origin.

## Despliegue

*(Pendiente — se va a desplegar en Render/Railway y se actualizará este enlace)*

## Autor

Sebastián — [GitHub](https://github.com/sebastevez91)