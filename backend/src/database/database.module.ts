import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from 'src/notifications/notification.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: '@Mail5050',
      entities: [Notification, User],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
