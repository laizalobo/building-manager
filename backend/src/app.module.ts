import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { DatabaseModule } from './database/database.module';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationModule } from './notifications/notifications.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [NotificationModule, DatabaseModule, UsersModule, AuthModule],
  controllers: [NotificationsController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
