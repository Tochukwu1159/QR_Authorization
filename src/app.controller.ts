import * as fs from 'fs';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request,Response } from 'express';
import * as qrcode from 'qrcode'
const QrCodeReader = require("qrcode-reader");
const qrCodeReader = new QrCodeReader();

@Controller('qr-code')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get('/generateCode')
  async getQrCode(@Res() res:Response) {
    const qrData = `${process.env.BASE_URL}/qr-code/movies`;
    const qrCode = await qrcode.toDataURL(qrData);
    // res.setHeader('Content-Type', 'image/png');
    res.render('qrpage', { qrCode })
  }

  @Get('/movies')
  async getMovies(@Res() res:Response) {
    const movies = JSON.parse(fs.readFileSync('src/movies.json', 'utf-8'));
    return res.render('index', { movies });
  }

  @Post('scan')
  async scanQrCode(@Body() body:any, @Res() res:any) {
    const qrCodeImageBuffer = body.qrCodeImage;

    qrCodeReader.callback = function (error, result) {
      if (error) {
        console.error(error);
      } else {
        const url = result.result;
        // Redirect to the URL embedded in the QR code
        res.redirect(url);
      }
    };

    qrCodeReader.decode(qrCodeImageBuffer);
  }
}
