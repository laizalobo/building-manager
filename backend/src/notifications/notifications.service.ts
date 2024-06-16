import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID, randomUUID } from 'crypto';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { NotificationDeleteDto, NotificationDto } from './notification.dto';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getNotificationById(id: UUID) {
    return this.notificationRepository
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.requester', 'user')
      .where({ id })
      .getOne();
  }

  removeRequesterPassword(notifications: Notification[]) {
    return notifications.map((notification) => ({
      ...notification,
      requester: {
        ...notification.requester,
        password: undefined,
      },
    }));
  }

  async getNotifications() {
    const notifications = await this.notificationRepository
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.requester', 'user')
      .addSelect(['user.id', 'user.name', 'user.email', 'user.type'])
      .getMany();

    return this.removeRequesterPassword(notifications);
  }

  async getNotificationsByUser(userId: string) {
    const notifications = await this.notificationRepository
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.requester', 'user')
      .addSelect(['user.id', 'user.name', 'user.email', 'user.type'])
      .where('user.id = :userId', { userId })
      .getMany();

    return this.removeRequesterPassword(notifications);
  }

  async saveNotification(notification: NotificationDto) {
    return this.notificationRepository.save({
      ...notification,
      status: 'PENDING',
      createdAt: new Date(),
      id: randomUUID(),
    });
  }

  async initNotification(id: UUID) {
    await this.notificationRepository.update({ id }, { status: 'PROCESSING' });
    return 'Notificação iniciada';
  }

  async finishNotification(id: UUID) {
    await this.notificationRepository.update({ id }, { status: 'CONCLUDED' });
    return 'Notificação finalizada';
  }

  async updateNotification(id: string, notification: Partial<Notification>) {
    await this.notificationRepository.update(id, { ...notification });
    return 'Notificação atualizada';
  }

  async deleteNotification({
    notificationId,
    requesterId,
  }: NotificationDeleteDto) {
    const notification = await this.getNotificationById(notificationId);
    if (
      notification.status === 'CONCLUDED' ||
      notification.requester.id === requesterId
    ) {
      this.notificationRepository.delete(notificationId);
      return 'Notificação removida';
    }
    return 'A notificação não está concluída ou foi feito por outra pessoa';
  }
}
