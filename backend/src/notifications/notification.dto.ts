import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { User } from 'src/users/user.entity';
import { NotificationStatus } from './notification.entity';

export class NotificationDto {
  @ApiProperty()
  requester: User;

  @ApiProperty()
  message: string;
}

export class NotificationUpdateDto {
  @ApiProperty()
  message?: string;

  @ApiProperty()
  status?: NotificationStatus;
}

export class NotificationDeleteDto {
  @ApiProperty()
  requesterId: UUID;

  @ApiProperty()
  notificationId: UUID;
}
