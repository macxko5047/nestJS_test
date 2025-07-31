import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API NestJS')
    .setDescription('The API test by mk 007')
    .setVersion('1.0')
    // เพิ่ม security แบบ apiKey
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
        description: 'API Key',
      },
      'api-key', // <-- ชื่อ security (ใช้อะไรก็ได้)
    )
    // .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  // แสดงลิงก์หลังจากแอป start
  console.log(
    '\x1b[36m%s\x1b[0m',
    `🚀 API Docs: http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}
bootstrap();
