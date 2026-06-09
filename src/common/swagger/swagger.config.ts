import { INestApplication } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const config = new DocumentBuilder()
    .setTitle('Tech Store API')
    .setDescription('API do marketplace de eletrônicos')
    .setVersion('1.0.0')

    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'Bearer',
    )

    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
