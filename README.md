# Quick start 🔥

> hacer clone del repositorio

```
git clone git@github.com:Lucia1000/App_Notas.git
```

> abrir carpeta "App_Notas" con Visual Studio

```
cd App_Notas
code ./App_Notas
```

> en la terminal del VS :

```
npm install
```

> crear una base de datos vacía de mysql con el nombre que queráis

> renombrar el .env.example a .env y rellenad todos los campos con vuestros datos

❗ _en mysql_database deberéis poner la base de datos que habéis creado_

> crear las tablas

```
npm run initDB
```

> insertar datos en las tablas

```
npm run populateDB
```

> una vez hecho todo esto, solo quedaría iniciar el proyecto

```
npm run dev
```

> si quieres probarlo, importa la colección de postman de la carpeta "docs" 😄

# BASE DE DATOS 💾

## TABLAS 📊:

1. ### USERS 👤:

   - id
   - email \*
   - password \*
   - name
   - registrationCode

2. ### NOTES 📝:
   - id
   - title \*
   - text \*
   - category \*
   - image
   - status
   - user_id

## API 📚:

- POST /users

  - Registra un usuario
  - Body (JSON):

    - email \*
    - password \*
    - name

  - Retorna el id del usuario registrado
  - Envía email de confirmación con código de registro

- GET /users/activate/:registrationCode

  - Activa un usuario
  - Retorna un mensaje indicando que el usuario se ha activado

- POST /login

  - Loguea un usuario
  - Body(JSON):
    - email \*
    - password \*
  - Retorna un JWT token

- POST /notes

  - Se necesita autenticación
  - Body (form-data):
    - title \*
    - text \*
    - category (Robótica, Arquitectura, Urbanismo)\*
    - image
    - status (private, public)
  - Retorna los datos de la nota creada

- PUT /notes/:notesId

  - Se necesita autenticación
  - Body (JSON):
    - title
    - text
    - category (Robótica, Arquitectura, Urbanismo)
  - Retorna un mensaje indicando que la entrada se ha modificado correctamente

- GET / notes

  - Se necesita autenticación
  - Muestra las notas registradas por el usuario (en el listado sólo se ven los títulos)

- GET /notes/:notesId

  - Se necesita autenticación
  - Si el status es "public" no necesita autenticación.
  - Retorna la nota especificada, con sus imágenes incluídas

- DELETE / notes/ :notesId

  - Se necesita autenticación
  - Retorna un mensaje indicando que la nota especificada se ha eliminado correctamente.
