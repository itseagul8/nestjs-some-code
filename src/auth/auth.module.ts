import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret:'5E0B2F0D4CAEDD314984768EE5E1AF65',
      signOptions:{expiresIn:'24h'
      }})],
  providers: [AuthService,UsersService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
