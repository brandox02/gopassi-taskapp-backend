# NestJS with Prisma and PostgreSQL Docker Setup

This project provides a complete Dockerized setup for a NestJS application with
Prisma ORM and PostgreSQL database.

## Prerequisites

- Docker installed
- Docker Compose installed
- Node.js (for local development)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/brandox02/gopassi-taskapp-backend
cd gopassi-taskapp-backend
```

### 2. Set up environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit the .env file with your actual credentials:

```bash
nano .env  # or use your preferred editor
```

### 3. Install dependencies

```bash
yarn install
```

### 4. Start the services

```bash
docker-compose up -d
```

This will start:

- PostgreSQL database on port 5432
- NestJS application on port 3000

### 5. Apply database migrations

After the containers are running, apply the Prisma migrations:

```bash
docker-compose exec app yarn prisma migrate dev
```

### 6. Generate Prisma client

```bash
docker-compose exec app yarn prisma generate
```

### 7. Access the application

The NestJS application will be available at: http://localhost:3000

## Development Workflow

#### Running the application in development mode

The docker-compose setup is already configured for development with
hot-reloading. Just:

```bash
docker-compose up -d
```

Then visit http://localhost:3000
