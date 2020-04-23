import { Controller, Get, Delete, Post, Body, Put, Param, HttpException, HttpStatus, UseGuards, UnauthorizedException} from '@nestjs/common';
import { getRepository } from "typeorm";
import { Article } from "../entities/article";
import { Token } from "../entities/token";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import CryptoJs from 'crypto-js';

@Controller('shop')
export class ShopController {
    constructor(){}

    @Get('/:token')
    async getShop(@Param('token') token : string){
        const tokenRepository = getRepository(Token);
        const shop = await tokenRepository.find({ 
            where: {
                value: token
            },
            relations: ["country"]
        });
        if(shop.length < 1) throw new UnauthorizedException();

        const articleRepository = getRepository(Article);
        const articles: Article[] = await articleRepository.find();
        return {
            country: shop[0].country,
            articles: articles
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    private async getShops() : Promise<Token[]>{
        const tokenRepository = getRepository(Token);
        const shops = await tokenRepository.find({ relations: ["country"] });
        return shops;
    }
    @UseGuards(JwtAuthGuard)
    @Post('/:country')
    async generateToken(@Param('country') country : string){
        const type = country == 'france'? 1 : 2;
        await require('crypto').randomBytes(48, async function(err, buffer) {
            var random = buffer.toString('hex');
            const token = {
                value: random,
                country: type
            }
            const tokenRepository = getRepository(Token);
            await tokenRepository.save(token);
          });        
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    private async deleteShop(@Param('id') id : number): Promise<Token>{
        const tokenRepository = getRepository(Token);
        const token = await tokenRepository.findOne(id);
        if(!token) throw new HttpException('Token not found', HttpStatus.INTERNAL_SERVER_ERROR);
        return tokenRepository.remove(token);      
        
    } 
}
