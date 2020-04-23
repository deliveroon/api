import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';


async function bootstrap() {
  const fs = require('fs');
  const keyFile  = fs.readFileSync(__dirname + '/ssl/key.pem');
  const certFile = fs.readFileSync(__dirname + '/ssl/certificate.pem');

  const app = await NestFactory.create(AppModule, {httpsOptions: {
    key: keyFile,
    cert: certFile,
  }});
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.enableCors();
  await app.listen(50001);
}
bootstrap();
