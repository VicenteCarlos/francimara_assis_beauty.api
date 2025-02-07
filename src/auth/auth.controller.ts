import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserLoginDTO, UserRegisterDTO } from './dtos/user.dto';
import { HashPipe } from 'src/common/pipes/password.hash';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() userLoginDto: UserLoginDTO,
  ) {
    const data = await this.authService.login(userLoginDto);

    return res.status(HttpStatus.OK).json(data);
  }

  @Post('/register')
  public async register(
    @Req() req: Request,
    @Res() res: Response,
    @Body(HashPipe) userRegisterDto: UserRegisterDTO,
  ) {
    const data = await this.authService.register(userRegisterDto)

    return res.status(HttpStatus.CREATED).json(data);
  }
}
