// import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';

describe('ItemMasterController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/item-master (POST)', () => {
    return request(app.getHttpServer())
      .post('/item-master')
      .send({ item_code: 'B001', description: 'API test' })
      .expect(201)
      .expect(res => {
        expect(res.body).toHaveProperty('item_code', 'B001');
      });
  });

  it('/item-master (GET)', () => {
    return request(app.getHttpServer())
      .get('/item-master')
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body.data || res.body)).toBe(true);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
