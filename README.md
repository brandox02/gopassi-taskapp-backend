## GoPassi TaskApp Backend - NestJS + Prisma + PostgreSQL

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

Crear archivo `.env` y copiar dentro de este, el contenido del ya existente
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
