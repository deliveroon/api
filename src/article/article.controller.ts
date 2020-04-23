import { Controller, Get, Delete, Post, Body, Put, Param, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import { getRepository } from "typeorm";
import { Article } from "../entities/article";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('article')
export class ArticleController {

    constructor(){}

    @UseGuards(JwtAuthGuard)
    @Get()
    private async getArticles() : Promise<Article[]>{
        const articleRepository = getRepository(Article);
        const articles = await articleRepository.find();
        return articles;
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    private async createArticle(@Body() article: Article) : Promise<Article>{

        if(! article.name) throw new HttpException("Nom manquant", HttpStatus.INTERNAL_SERVER_ERROR)
        if(! article.description) throw new HttpException("Description manquante", HttpStatus.INTERNAL_SERVER_ERROR)
        if(! article.price) throw new HttpException("Prix manquant", HttpStatus.INTERNAL_SERVER_ERROR)
        if(! article.photo) throw new HttpException("Photo manquante", HttpStatus.INTERNAL_SERVER_ERROR)

        const articleRepository = getRepository(Article);
        return await articleRepository.save(article)
    }
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    private async deleteArticle(@Param('id') id : number): Promise<Article>{
        const articleRepository = getRepository(Article);
        const article = await articleRepository.findOne(id);
        if(!article) throw new HttpException('Article not found', HttpStatus.INTERNAL_SERVER_ERROR);
        return articleRepository.remove(article);      
        
    }
}
