import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Notification } from './notification.entity';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [TypeOrmModule.forFeature([Notification]), NotificationsService],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationModule {}
