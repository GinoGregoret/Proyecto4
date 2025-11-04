# Proyecto4 - Sistema de Gestión de Stock

Aplicación full-stack para gestión de productos con autenticación de usuarios.

## Características

- Backend con Express.js y MySQL
- Frontend con React + Vite + Tailwind CSS
- Autenticación JWT
- CRUD de productos
- Rutas protegidas
- Validación de formularios

## Requisitos Previos

- Node.js >= 14
- MySQL >= 8.0
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/GinoGregoret/Proyecto4.git
cd Proyecto4
```

2. Instalar dependencias (backend y frontend):
```bash
npm run install:all
```

3. Configurar base de datos:
   - Crear base de datos MySQL:
   ```sql
   CREATE DATABASE stock_utn;
   ```
   - Copiar `.env.example` a `.env` en la carpeta `back` y configurar las variables:
   ```
   NAME_DB=stock_utn
   USER_DB=root
   PASS_DB=tu_password
   HOST_DB=localhost
   PORT_DB=3306
   DIALECT_DB=mysql
   JWT_SECRET=tu_secreto
   PORT=3000
   ```

4. Iniciar la aplicación:
```bash
npm run dev
```

La aplicación estará disponible en:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Estructura del Proyecto

```
├── back/               # Backend con Express
│   ├── config/        # Configuración de DB
│   ├── middleware/    # Middleware JWT
│   ├── models/       # Modelos Sequelize
│   ├── routes/       # Rutas de la API
│   └── server.mjs    # Servidor Express
├── front/             # Frontend con React
│   ├── src/          # Código fuente
│   ├── components/   # Componentes React
│   └── contexts/     # Contextos (Auth)
└── package.json      # Scripts principales
```

## API Endpoints

### Autenticación
- POST `/api/auth/register` - Registro de usuario
- POST `/api/auth/login` - Login (devuelve JWT)
- GET `/api/auth/verify-token` - Verificar token JWT

### Productos (requieren autenticación)
- GET `/api/productos` - Listar productos
- POST `/api/productos` - Crear producto
- PUT `/api/productos/:id` - Actualizar producto
- DELETE `/api/productos/:id` - Eliminar producto

## Scripts Disponibles

- `npm run dev` - Inicia backend y frontend en modo desarrollo
- `npm run install:all` - Instala dependencias en todos los proyectos