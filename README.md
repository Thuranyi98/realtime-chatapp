# RealTime Chat App

Full-stack technical assessment project with a Node.js backend and Next.js frontend.

## Stack

- Backend: Node.js, Express, Prisma, MySQL, Socket.IO, JWT, bcryptjs
- Frontend: Next.js (App Router), TypeScript, Tailwind CSS, Socket.IO client
- Docs: OpenAPI (Swagger JSON + Swagger UI)

## Repository Layout

- `backend/` Express API, Prisma schema, Socket.IO server, Swagger files
- `frontend/` Next.js UI, API client layer, socket integration, component tests

## Backend

### Features

- JWT auth (`/api/auth/login`, `/api/auth/register`)
- Role-based access (`ADMIN`, `USER`)
- Room creation and message history (cursor-compatible pagination shape)
- Realtime messaging and typing indicators via Socket.IO
- Swagger docs served from separate `swagger/` folder

### Key Folders

- `backend/src/controllers/`
- `backend/src/services/`
- `backend/src/repositories/`
- `backend/src/middlewares/`
- `backend/src/sockets/`
- `backend/prisma/`
- `backend/swagger/`

### Environment

Create `backend/.env` from `backend/.env.example`.

Required values:

- `DATABASE_URL=mysql://user:password@localhost:3306/realtime_chat`
- `JWT_SECRET=your_secret`
- `JWT_EXPIRES_IN=1d`
- `PORT=4000`

### Run Backend

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

### Swagger

- UI: `http://localhost:4000/api-docs`
- OpenAPI JSON: `http://localhost:4000/api-docs/openapi.json`

## Frontend

### Features

- Login and signup pages
- Admin sidebar with presence state
- User admin-selector in message composer
- Connection status indicator
- Notifications (dropdown + browser notifications + toast)
- Conversation theme switcher per user/role

### Environment (Frontend)

Use `NEXT_PUBLIC_APP_ENV` to switch environments:

- `local`
- `staging`
- `production`

Optional URL overrides:

- `NEXT_PUBLIC_API_URL_LOCAL`
- `NEXT_PUBLIC_API_URL_STAGING`
- `NEXT_PUBLIC_API_URL_PRODUCTION`
- `NEXT_PUBLIC_SOCKET_URL_LOCAL`
- `NEXT_PUBLIC_SOCKET_URL_STAGING`
- `NEXT_PUBLIC_SOCKET_URL_PRODUCTION`

If not set, defaults fall back to `http://localhost:4000`.

### Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Testing

Frontend includes focused unit tests for main components.

Run:

```bash
cd frontend
npm test
```

Current tested components:

- `ChatHeader`
- `ConnectionStatus`
- `MessageList`

## Build

### Backend

```bash
cd backend
npm run build
```

### Frontend

```bash
cd frontend
npm run build
```

## Docker

Run the full stack (MySQL + backend + frontend):

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000`
- Swagger UI: `http://localhost:4000/api-docs`
- MySQL: `localhost:3306`

Stop and remove containers:

```bash
docker compose down
```

Reset database volume:

```bash
docker compose down -v
```

