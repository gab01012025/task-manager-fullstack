# 🧠 Task Manager - Fullstack App

API REST completa para gerenciamento de tarefas com autenticação JWT, desenvolvida com Node.js, Express e MongoDB.

🔗 **Live Demo:** [https://gab01012025.github.io/task-manager-fullstack/](https://gab01012025.github.io/task-manager-fullstack/)

## ✨ Funcionalidades

- ✅ Registro e login de usuários (JWT)
- ✅ Senha criptografada com bcrypt
- ✅ CRUD completo de tarefas
- ✅ Rotas protegidas com middleware de autenticação
- ✅ Validação de dados com Joi
- ✅ Error handling global
- ✅ Testes automatizados com Jest
- ✅ Docker ready

## 🛠️ Tecnologias

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT + Bcrypt
- Joi (validação)
- Jest + Supertest (testes)
- Docker

**Frontend:**
- HTML5, CSS3, JavaScript

## 📁 Estrutura do Projeto

```
├── task-manager-backend/
│   ├── __tests__/           # Testes automatizados
│   ├── config/              # Configuração do banco
│   ├── controllers/         # Lógica de negócio
│   ├── middleware/          # Auth, validação, error handling
│   ├── models/              # Schemas do MongoDB
│   ├── routes/              # Rotas da API
│   ├── server.js            # Entry point
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── jest.config.js
├── docs/                    # Frontend (GitHub Pages)
└── README.md
```

## 🚀 Instalação

### Opção 1: Docker (Recomendado)

```bash
cd task-manager-backend
docker-compose up -d
```

A API estará em `http://localhost:3000`

### Opção 2: Local

```bash
cd task-manager-backend
npm install
cp .env.example .env
# Edite o .env com suas configurações
npm run dev
```

## 📡 API Endpoints

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/register` | Registrar usuário |
| POST | `/api/auth/login` | Login |

### Tarefas (requer autenticação)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/tasks` | Listar tarefas |
| POST | `/api/tasks` | Criar tarefa |
| PUT | `/api/tasks/:id` | Atualizar tarefa |
| DELETE | `/api/tasks/:id` | Deletar tarefa |

## 🧪 Testes

```bash
cd task-manager-backend
npm test
```

## 🐳 Docker

```bash
# Subir containers
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar containers
docker-compose down
```

## 📝 Exemplo de Uso

```bash
# Registrar
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"user","email":"user@email.com","password":"123456"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@email.com","password":"123456"}'

# Criar tarefa (com token)
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: <seu_token>" \
  -d '{"title":"Minha tarefa"}'
```

## 👨‍💻 Autor

**Gabriel Barreto**
- GitHub: [@gab01012025](https://github.com/gab01012025)
- LinkedIn: [Gabriel Barreto](https://linkedin.com/in/gabriel-barreto-610a72370)

## 📄 Licença

MIT License
