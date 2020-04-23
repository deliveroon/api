import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserController } from './user/user.controller';
import { ArticleController } from './article/article.controller';
import { MissionController } from './mission/mission.controller';

import { Article } from './entities/article'
import { Mission } from './entities/mission';
import { User } from './entities/user';
import { Usertype } from './entities/usertype';
import { Statut } from './entities/statut';
import { Token } from './entities/token';
import { Country } from './entities/country';
import { Location } from './entities/location';
import { MissionArticles } from './entities/missionArticles';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ShopController } from './shop/shop.controller';
import { LocationController } from './location/location.controller';

require('dotenv').config()

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Usertype, Article, Mission, MissionArticles, Statut, Token, Country, Location],
    synchronize: true,
  }), AuthModule, UserModule],
  controllers: [AppController, UserController, ArticleController, MissionController, ShopController, LocationController],
  providers: [AppService, UserService],
})
export class AppModule {}
