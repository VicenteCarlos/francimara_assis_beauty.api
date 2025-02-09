import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/guards/jwt/jwt-auth.guard';
import { Request, Response } from 'express';
import { CreateMakeDTO } from './dtos/create-makes.dto';
import { UpdateMakeDTO } from './dtos/update-makes.dto';
import { MakeService } from './makes.service';

@Controller('/makes')
@UseGuards(JWTAuthGuard)
export class MakeController {
  constructor(private readonly makeService: MakeService) {}

  @Get('/')
  public async getAll(@Req() req: Request, @Res() res: Response) {
    const data = await this.makeService.getAll(req);

    return res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  public async getById(
    @Param(':id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return res.status(HttpStatus.OK).json({ message: 'ok' });
  }

  @Post('/')
  public async createMake(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createMakeDTO: CreateMakeDTO,
  ) {
    return res.status(HttpStatus.CREATED).json({ message: 'ok' });
  }

  @Put('/')
  public async updateMake(
    @Req() req: Request,
    @Res() res: Response,
    @Body() updateMakeDTO: UpdateMakeDTO,
  ) {
    return res.status(HttpStatus.OK).json({ message: 'ok' });
  }

  @Delete(':id')
  public async deleteMake(
    @Param(':id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return res.status(HttpStatus.OK).json({ message: 'ok' });
  }
}
