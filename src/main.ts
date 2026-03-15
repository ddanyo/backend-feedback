import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    const config = new DocumentBuilder()
        .setTitle('Feedbacks-system backend')
        .setDescription('The feedbacks-system-backend API description')
        .setVersion('1.0')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/swagger', app, documentFactory, {
        jsonDocumentUrl: 'swagger/json',
        swaggerOptions: {
            supportedSubmitMethods: ['get'], // Разрешает кнопку "Try it out" только для GET запросов
        },
    });

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((e) => {
    console.error('Failed to start application:', e);
    process.exit(1);
});
