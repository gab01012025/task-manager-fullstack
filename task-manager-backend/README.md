# Task Manager API

API RESTful para gestão de tarefas com autenticação JWT.

## Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT para autenticação
- Joi para validação
- Jest para testes
- Docker

## Endpoints

### Auth
```
POST /api/auth/register  - Criar conta
POST /api/auth/login     - Login (retorna JWT)
```

### Tasks (requer autenticação)
```
GET    /api/tasks        - Listar tarefas
POST   /api/tasks        - Criar tarefa
PUT    /api/tasks/:id    - Atualizar tarefa
DELETE /api/tasks/:id    - Deletar tarefa
```

## Rodar localmente

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Rodar testes
npm test

# Iniciar servidor
npm start
```

## Docker

```bash
docker-compose up -d
```

## Variáveis de ambiente

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-secret-key
```

## Autor

Gabriel Barreto - [GitHub](https://github.com/gab01012025)
