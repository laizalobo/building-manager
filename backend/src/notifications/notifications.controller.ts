import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ParamId } from 'src/param/ParamId';
import {
  NotificationDeleteDto,
  NotificationDto,
  NotificationUpdateDto,
} from './notification.dto';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getNotifications() {
    return this.notificationsService.getNotifications();
  }

  @Get('/user/:id')
  async getNotificationsByUser(@Param() param: ParamId) {
    return this.notificationsService.getNotificationsByUser(param.id);
  }

  @Get(':id')
  async getNotificationById(@Param() param: ParamId) {
    const notification = await this.notificationsService.getNotificationById(
      param.id,
    );

    if (!notification) {
      throw new NotFoundException('Notificação não encontrada');
    }

    return notification;
  }

  @Post()
  @ApiBody({ type: NotificationDto })
  async saveNotification(@Body() notification: NotificationDto) {
    return this.notificationsService.saveNotification(notification);
  }

  @Put(':id')
  @ApiBody({ type: NotificationUpdateDto })
  async updateNotification(
    @Param() param: ParamId,
    @Body() notification: NotificationUpdateDto,
  ) {
    return this.notificationsService.updateNotification(param.id, notification);
  }

  @Delete(':id')
  async deleteNotification(
    @Body() notificationDeleteDto: NotificationDeleteDto,
  ) {
    return this.notificationsService.deleteNotification(notificationDeleteDto);
  }
}
