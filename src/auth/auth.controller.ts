import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enum/rol.enum';
import { Auth } from './decorators/auth.decorator';

export interface RequestWithUser extends Request{
    user:{
        email:string;
        role:string
    }
}

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService:AuthService
    ){}

    @Post()
    login(
        @Body() loginDto:LoginDto
    ){
        return this.authService.login(loginDto);
    }

    /*@Get('profile')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard,RolesGuard)
    profile(
        @Req() req: RequestWithUser,
    ){

        return this.authService.profile({
            email: req.user.email,
            role: req.user.role
        })
    }*/

    @Get('profile')
    @Auth(Role.ADMIN)
    profile(
        @Req() req: RequestWithUser,
    ){

        return this.authService.profile({
            email: req.user.email,
            role: req.user.role
        })
    }

    @Post('register')
    register(
        @Body() registerDto:RegisterDto
    ){
        return this.authService.register(registerDto);
    }
}
