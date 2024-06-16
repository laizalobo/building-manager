import { UserResponse } from "~/modules/share/types";

export type NotificationStatus = "PENDING" | "PROCESSING" | "CONCLUDED";

export type UserNotification = {
  id?: string;
  requester?: UserResponse;
  message: string;
  createdAt: string;
  status: NotificationStatus;
};
