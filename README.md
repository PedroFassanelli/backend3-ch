# 🐶 AdoptMe - Backend

Entrega correspondiente a la entrega N°1 del Proyecto Final.

---

## 📌 Descripción

En esta entrega se desarrolló un nuevo router bajo la ruta base:

- `/api/mocks`

El mismo permite:

- Generar mascotas mockeadas.
- Generar usuarios mockeados con formato tipo documento Mongo.
- Generar e insertar datos mockeados en la base de datos.

El proyecto está desarrollado con:

- Node.js  
- Express  
- MongoDB (Mongoose)  
- Arquitectura DAO + Repository  

---

## 🚀 Instalación

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

Servidor disponible en:

http://localhost:8080

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

Curso Backend