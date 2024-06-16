import { RequestService } from "~/modules/api";
import { ActionLoaderResponse } from "~/modules/share/types";
import { getCurrentUser } from "~/modules/user/helpers";
import { UserNotification } from "../types";

const requestService = RequestService();

export const getNotifications = async (
  userId: string
): Promise<ActionLoaderResponse<UserNotification[]>> => {
  try {
    const path = userId ? `/user/${userId}` : "";
    const data = (
      await requestService.get<UserNotification[]>(`/notifications${path}`)
    ).data;

    return { data };
  } catch (error) {
    return { message: "Erro ao requisitar as solicitações" };
  }
};

export const saveNotification = async (message: string) => {
  const requester = getCurrentUser();
  try {
    const notification = await requestService.post("notifications", {
      requester,
      message,
    });
    if (notification) {
      return { data: notification };
    }
  } catch (error) {
    return {
      message: "Não foi possível registrar a notificação",
    };
  }
};

export const updateNotification = async (
  id: string,
  notification: Partial<UserNotification>
) => {
  try {
    await requestService.put(`notifications/${id}`, notification);
    return { message: "Notificação atualizada" };
  } catch (error) {
    return { message: "Erro ao atualizar a notificação" };
  }
};

export const removeNotification = async (
  notificationId: string,
  requesterId: string
) => {
  try {
    await requestService.delete(`notifications/${notificationId}`, {
      data: {
        notificationId,
        requesterId,
      },
    });
    return { message: "Notificação removida", success: true };
  } catch (error) {
    return { message: "Erro ao deletar a notificação", success: false };
  }
};
