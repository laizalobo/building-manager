import { UUID } from 'crypto';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type NotificationStatus = 'PENDING' | 'PROCESSING' | 'CONCLUDED';

@Entity({ database: 'notification' })
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id?: UUID;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  requester: User;

  @Column()
  message: string;

  @Column()
  createdAt: Date;

  @Column()
  status?: NotificationStatus;
}
