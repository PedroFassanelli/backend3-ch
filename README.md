# 🐶 AdoptMe - Backend

Proyecto Final - Backend III

---

## 📌 Descripción

API REST para gestión de adopciones de mascotas. Incluye:

- CRUD de usuarios y mascotas
- Sistema de adopciones
- Generación de datos mock
- Documentación Swagger
- Tests funcionales
- Dockerización del proyecto

El proyecto está desarrollado con:

- Node.js  
- Express  
- MongoDB (Mongoose)  
- Arquitectura DAO + Repository  
- Swagger (documentación)
- Mocha + Chai + Supertest (testing)
- Docker

---

## 🐳 Docker

### Imagen en DockerHub

La imagen del proyecto está disponible en DockerHub:

👉 **[pedrofassa19/adoptme](https://hub.docker.com/r/pedrofassa19/adoptme)**

### Construir la imagen localmente

```bash
docker build -t pedrofassa19/adoptme .
```

### Ejecutar el contenedor

La imagen ya incluye el archivo `.env` con la configuración necesaria, por lo que basta con:

```bash
docker run -p 8080:8080 pedrofassa19/adoptme
```

La aplicación estará disponible en: `http://localhost:8080`

### Descargar y ejecutar desde DockerHub

```bash
docker pull pedrofassa19/adoptme
docker run -p 8080:8080 pedrofassa19/adoptme
```

### Ejecutar tests dentro del contenedor

```bash
docker run pedrofassa19/adoptme npm test
```

---

## 🚀 Instalación local

### 1️⃣ Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd RecursosBackend-Adoptme
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar variables de entorno

Crear un archivo .env basado en el archivo .env.example.

Ejemplo:

```bash
MONGO_URL=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/adoptme
PORT=8080
```

### 4️⃣ Ejecutar el servidor

```bash
npm run dev
```

Servidor disponible en: http://localhost:8080

---

## 📖 Documentación Swagger

Una vez levantado el servidor, la documentación interactiva de la API está disponible en:

👉 **http://localhost:8080/api-docs**

Actualmente documenta el módulo de **Users** (`/api/users`).

---

## 🧪 Tests

Para ejecutar los tests funcionales del router de adopciones:

```bash
npm test
```

Los tests cubren todos los endpoints de `/api/adoptions`:
- `GET /api/adoptions` — Obtener todas las adopciones
- `GET /api/adoptions/:aid` — Obtener adopción por ID (éxito y error 404)
- `POST /api/adoptions/:uid/:pid` — Crear adopción (éxito, user no encontrado, pet no encontrada, pet ya adoptada)

---

## 📌 Endpoints del Router Mocks

Base URL

`/api/mocks`

- GET - `/api/mocks/mockingpets` - Genera un conjunto de mascotas mockeadas. No se insertan en la base de datos.

- GET - `/api/mocks/mockingusers`

  Genera 50 usuarios mockeados con:

  - Password encriptada (contraseña base: "coder123")

  - Role aleatorio entre "user" y "admin"

  - Pets como array vacío

  - Formato similar a un documento Mongo

- POST - `/api/mocks/generateData` - Genera e inserta usuarios y mascotas en la base de datos.

    Body JSON de ejemplo:

    ```bash
    {
    "users": 5,
    "pets": 10
    }
    ```

    Luego puede verificarse con:

    ```bash
    GET /api/users
    GET /api/pets
    ```

## 🧱 Arquitectura

El proyecto sigue una estructura por capas:

- Routes

- Controllers

- Repository

- DAO

- Models

## 📎 Notas

- No se incluye la carpeta node_modules.

- Las variables sensibles se gestionan mediante archivo .env.

- El proyecto está preparado para ejecutarse con MongoDB Atlas.

## 👨‍💻 Autor

**Pedro Fassanelli**

Curso Backend III