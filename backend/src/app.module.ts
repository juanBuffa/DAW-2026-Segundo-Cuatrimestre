import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module.js';
import { GestionModule } from './modules/gestion/gestion.module.js';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true

  }),
    AuthModule,
    GestionModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule { }
