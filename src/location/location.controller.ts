import { Controller, Post, UseGuards, Param, UnauthorizedException, Body, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { getRepository } from 'typeorm';
import { Location } from 'src/entities/location';
import { Mission } from 'src/entities/mission';

@Controller('location')
export class LocationController {
    
    @Get(':token')
    private async getLocation(@Param('token') token : string): Promise<Location>{
        const missionRepository = getRepository(Mission);
        const mission = await missionRepository.find({ 
            where:{
                token: token
            } 
        });
        

        if(mission.length < 1) throw new UnauthorizedException();

      
        const locationRepository = getRepository(Location);
        const location = await locationRepository.find({ 
            where:{
                userId: mission[0].livreur
            } 
        }); 
        
        return location[0];
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    private async updateLocation(@Body() location: Location) : Promise<Location>{
        const locationRepository = getRepository(Location);
        return await locationRepository.save(location);
        
    }
}
