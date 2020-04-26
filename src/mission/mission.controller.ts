import { Controller, Get, Post, Body, Put, Delete, Param, HttpStatus, HttpException, UseGuards, UnauthorizedException } from '@nestjs/common';
import { getRepository } from "typeorm";
import { Mission } from "../entities/mission";
import { Article } from "../entities/article";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MissionArticles } from 'src/entities/missionArticles';
import { Token } from 'src/entities/token';


@Controller('/mission')
export class MissionController {

    constructor(){

    }

    @UseGuards(JwtAuthGuard)
    @Get()
    private async getMissions() : Promise<Mission[]>{
        const missionRepository = getRepository(Mission);
        const missions = await missionRepository.find({  relations: ["statut"] });
        return missions;
    }
    @Get(':token')
    private async getMissionsByToken(@Param('token') token: string) : Promise<Mission>{
        const missionRepository = getRepository(Mission);
        const mission = await missionRepository.find({ select: ["id", "statut"], relations: ["statut"], order: {
            statut: "ASC"
        }, where: {
            token: token
        },  }, );
        if (mission.length < 1) throw new UnauthorizedException();
        return mission[0];
    }
    @Post(':token')
    private async createMission(@Param('token') token : string,@Body() mission: Mission) : Promise<Mission>{
        const tokenRepository = getRepository(Token);
        const shop = await tokenRepository.find({ 
            where: {
                value: token
            },
            relations: ["country"]
        });
        if(shop.length < 1) throw new UnauthorizedException();
        const missionRepository = getRepository(Mission);
        mission.token = require('rand-token').generate(50);
        
        return await missionRepository.save(mission);
        
    }
    @Post('article/:token')
    private async createMissionArticle(@Param('token') token : string, @Body() missionArticles: MissionArticles) : Promise<MissionArticles>{
        const tokenRepository = getRepository(Token);
        const shop = await tokenRepository.find({ 
            where: {
                value: token
            },
            relations: ["country"]
        });
        if(shop.length < 1) throw new UnauthorizedException();

        const missionArticlesRepository = getRepository(MissionArticles);

        return await missionArticlesRepository.save(missionArticles);
    }
    @UseGuards(JwtAuthGuard)
    @Get('articles/:id')
    private async getMissionArticle(@Param('id') id : number) : Promise<Article[]>{
        var articleList: Article[] = new Array();
        const missionArticlesRepository = getRepository(MissionArticles);
        const articleRepository = getRepository(Article);
        const missionArticles =  await missionArticlesRepository.find({where:{
            mission: id
        }});
        for(let key in missionArticles){
            articleList.push(await articleRepository.findOne({ where: {
                id: missionArticles[key].article
            } }));
            articleList[key].quantity = missionArticles[key].quantity
            
        }
        return articleList;
    }
    @UseGuards(JwtAuthGuard)
    @Put()
    private async updateMission(@Body() mission: Mission) : Promise<Mission>{
        const missionRepository = getRepository(Mission);
        return await missionRepository.save(mission);
    }

    @Put(':token')
    private async annulerMission(@Param('token') token : string) : Promise<Mission>{
        const missionRepository = getRepository(Mission);
        const mission = await missionRepository.find({
            where: {
                token: token
            }
        })[0];
        return mission;
        if (!mission) throw new UnauthorizedException();

        mission.status = {
            id: 4,
            name: 'ANNULE'
        };
        return await missionRepository.save(mission);
    }
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    private async deleteMission(@Param('id') id : number): Promise<Mission>{
        const missionRepository = getRepository(Mission);
        const mission = await missionRepository.findOne(id);
        if(!mission) throw new HttpException('Mission not found', HttpStatus.INTERNAL_SERVER_ERROR);
        return missionRepository.remove(mission);      
        
    }

}
