import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { Cache } from '../../../../database/model/cache';
import { Helper } from '../../../../utils/';

const { generateKey } = Helper;

describe('[GET] /cache/:key', () => {
  it('should not return cache if key doesnt exist in db', async () => {
    const key = generateKey();
    const response = await request(app).get(`/api/v1/cache/${key}`).send();

    expect(response.body.cache).toBe(undefined);
    expect(response.body.key).toBeDefined();
  });

  it('return cach if key exists', async () => {
    // const key = generateKey();

    const resp = await request(app)
      .post('/api/v1/cache')
      .send({
        team: 'Arsenal',
        country: 'England',
      })
      .expect(201);

    const response = await request(app)
      .get(`/api/v1/cache/${resp.body.cache.key}`)
      .send();

    expect(response.body.cache).toBeDefined();
    expect(response.body.cache.key).toEqual(resp.body.cache.key);
    expect(response.body.cache.data.team).toEqual(resp.body.cache.data.team);
  });
});

describe('[GET] /cache', () => {
  it('should return an error if no record is found', async () => {
    const response = await request(app).get('/api/v1/cache').send();

    expect(response.body.errors[0].message).toBe('No records found');
  });

  it('should return all records keys', async () => {
    const first = await request(app)
      .post('/api/v1/cache')
      .send({
        team: 'Arsenal',
        country: 'England',
      })
      .expect(201);
    await request(app)
      .post('/api/v1/cache')
      .send({
        team: 'Bayern Munchen',
        country: 'Germany',
      })
      .expect(201);

    const response = await request(app)
      .get(`/api/v1/cache/`)
      .send()
      .expect(200);

    expect(response.body.keys.length).toEqual(2);
  });
});

describe('[POST]/cache', () => {
  it('should return an error if request body attributes are missing', async () => {
    const response = await request(app)
      .post('/api/v1/cache')
      .send({
        team: 'Arsenal',
      })
      .expect(400);

    expect(response.body.errors[0].message).toBe(
      'A valid cache item team country is required'
    );
  });

  it('should successfully create record', async () => {
    const response = await request(app)
      .post('/api/v1/cache')
      .send({
        team: 'Arsenal',
        country: 'England',
      })
      .expect(201);

    expect(response.body.cache.data.team).toEqual('Arsenal');
  });

  describe('[PUT]/cache', () => {
    it('should return an error if request body attributes are missing', async () => {
      const first = await request(app)
        .post('/api/v1/cache')
        .send({
          team: 'Arsenal',
          country: 'England',
        })
        .expect(201);

      const response = await request(app)
        .put('/api/v1/cache')
        .send({
          key: first.body.cache.key,
          team: 'Bayern Munchen',
        })
        .expect(400);

      expect(response.body.errors[0].message).toBe(
        'A valid cache item team country is required'
      );
    });

    it('should successfully update record', async () => {
      const first = await request(app)
        .post('/api/v1/cache')
        .send({
          team: 'Arsenal',
          country: 'England',
        })
        .expect(201);

      const response = await request(app)
        .put('/api/v1/cache')
        .send({
          key: first.body.cache.key,
          team: 'Bayern Munchen',
          country: 'Germany',
        })
        .expect(200);

      expect(response.body.cache.data.team).toEqual('Bayern Munchen');
    });
  });

  describe('[Delete] /cache/:key', () => {
    it('should return an error if key doesnt exist', async () => {
      const key = generateKey();
      const first = await request(app)
        .post('/api/v1/cache')
        .send({
          team: 'Arsenal',
          country: 'England',
        })
        .expect(201);

      const response = await request(app)
        .delete(`/api/v1/cache/${key}`)
        .send()
        .expect(404);

      expect(response.body.errors[0].message).toBe(
        'Item specified for delete not found'
      );
    });

    it('should successfully delete record', async () => {
      const first = await request(app)
        .post('/api/v1/cache')
        .send({
          team: 'Arsenal',
          country: 'England',
        })
        .expect(201);

      const response = await request(app)
        .delete(`/api/v1/cache/${first.body.cache.key}`)
        .send()
        .expect(200);

      expect(response.body.cache.data.team).toEqual('Arsenal');
    });
  });

  describe('[Delete] /cache', () => {
    it('should return an empty array on delete all', async () => {
      const key = generateKey();
      const first = await request(app)
        .post('/api/v1/cache')
        .send({
          team: 'Arsenal',
          country: 'England',
        })
        .expect(201);

      const response = await request(app)
        .delete(`/api/v1/cache/`)
        .send()
        .expect(200);
      expect(response.body.caches).toEqual([]);
      expect(response.body.caches.length).toEqual(0);
    });
  });
});
