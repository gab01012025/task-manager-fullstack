const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const Task = require('../models/task');

let mongoServer;
let authToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  await mongoose.connect(mongoUri);

  await request(app)
    .post('/api/auth/register')
    .send({
      username: 'testuser',
      email: 'test@email.com',
      password: 'password123'
    });

  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@email.com',
      password: 'password123'
    });

  authToken = loginRes.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Task.deleteMany({});
});

describe('Task Endpoints', () => {
  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', authToken)
        .send({ title: 'Test Task' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('title', 'Test Task');
    });

    it('should fail without authentication', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test Task' });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/tasks', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/tasks')
        .set('Authorization', authToken)
        .send({ title: 'Task 1' });
      await request(app)
        .post('/api/tasks')
        .set('Authorization', authToken)
        .send({ title: 'Task 2' });
    });

    it('should get all tasks for authenticated user', async () => {
      const res = await request(app)
        .get('/api/tasks')
        .set('Authorization', authToken);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    let taskId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', authToken)
        .send({ title: 'Task to Delete' });
      taskId = res.body._id;
    });

    it('should delete a task', async () => {
      const res = await request(app)
        .delete('/api/tasks/' + taskId)
        .set('Authorization', authToken);

      expect(res.statusCode).toBe(200);
    });
  });
});
