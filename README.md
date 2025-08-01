## GoPassi TaskApp Backend - NestJS + Prisma + PostgreSQL

### Descripción

Backend API para aplicación de gestión de tareas, desarrollado con NestJS,
Prisma ORM y PostgreSQL. Proporciona un sistema completo de autenticación JWT y
CRUD para tareas con notificaciones en tiempo real mediante WebSockets.

### Funcionalidades principales

- **Autenticación JWT**:
  - Registro de usuarios
  - Login con credenciales
  - Protección de rutas con guards

- **Gestión de Tareas**:
  - Creación, lectura, actualización y eliminación (CRUD)
  - Marcar tareas como completadas

- **Tiempo Real**:
  - Notificaciones WebSocket para:
  - Creación de tareas `(task_created)`
  - Actualización de tareas `(task_updated)`
  - Eliminación de tareas `(task_deleted)`

- **Documentación API**:
  - Swagger UI integrado
  - Esquemas y ejemplos para todos los endpoints
  - Validación de datos con class-validator

### Tecnologías utilizadas

- **Backend**: NestJS 11
- **Base de Datos**: PostgreSQL + Prisma ORM
- **Autenticación**: JWT + Passport
- **Tiempo Real**: Socket.IO
- **Documentación**: Swagger/OpenAPI
- **Containers**: Docker + Docker Compose

### Estructura del Proyecto

```bash
backend/
├── prisma/          # Modelos y migraciones de DB
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── auth/        # Lógica de autenticación
│   ├── tasks/       # Módulo completo de tareas
│   │   ├── dto/     # Data Transfer Objects
│   │   ├── gateway/ # WebSockets
│   │   └── *.ts     # Controlador, servicio, repositorio
│   ├── users/       # Gestión de usuarios
│   └── *.ts         # Archivos principales
└── test/            # Pruebas
```

### Requisitos previos

- Docker instalado (Descargar Docker)
- Docker Compose (viene incluido con Docker Desktop)

### Configuración inicial

1. Clonar el repositorio:

```bash
git clone https://github.com/brandox02/gopassi-taskapp-backend
cd gopassi-taskapp-backend
```

2. Configurar variables de entorno:

Crear archivo `.env` y copiar dentro de este el contenido del ya existente
archivo `.env.example`

```bash
cp .env.example .env
```

Puedes editar el archivo `.env` con tus credenciales si lo requieres pero por
defecto funciona con los valores proporcionados.

### Ejecución con Docker

1. Construir y levantar los servicios:

```bash
docker-compose up -d --build
```

2. Aplicar migraciones de la base de datos:

```bash
docker-compose exec app npx prisma migrate dev
```

3. Generar cliente de Prisma:

```bash
docker-compose exec app npx prisma generate
```

### Acceder a la aplicación

- **API REST**: http://localhost:3000
- **Documentación Swagger**: http://localhost:3000/api
- **PostgreSQL**:
  - Puerto: `5432` (o el configurado)
  - Usuario: `postgres`
  - Contraseña: `postgres`

### 🛠 Comandos útiles

Ver logs de la aplicación:

```bash
docker-compose logs -f app
```

Detener los contenedores:

```bash
docker-compose down
```

Reiniciar todo el entorno:

```bash
docker-compose down && docker-compose up -d --build
```

Ejecutar tests:

```bash
docker-compose exec app yarn test
```
