import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleadoController } from './empleado.controller.js';
import { EmpleadoService } from './empleado.service.js';
// import { AuthModule } from '../Auth/auth.module.js'; // 'Auth' con mayúscula y extensión .js
// TODO: descomentar AuthModule cuando se reactive el login/guard en EmpleadoController.

@Module({
  imports: [
    TypeOrmModule,
    // AuthModule
  ],
  controllers: [EmpleadoController],
  providers: [EmpleadoService],
})
export class EmpleadoModule {}