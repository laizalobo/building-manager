import {
  ClientLoaderFunction,
  json,
  redirect,
  useLoaderData,
} from "@remix-run/react";
import NotifcationTable from "~/modules/notification/page/NotificationTable";
import { getNotifications } from "~/modules/notification/services";
import { UserNotification } from "~/modules/notification/types";
import { ActionLoaderResponse } from "~/modules/share/types";
import { getCurrentUser } from "~/modules/user/helpers";

const data = [
  {
    apNumber: "AP001",
    message: "Message 1",
    createdAt: "2024-06-01 12:34",
    status: "Active",
  },
  {
    apNumber: "AP002",
    message: "Message 2",
    createdAt: "2024-06-02 08:45",
    status: "Inactive",
  },
  {
    apNumber: "AP003",
    message: "Message 3",
    createdAt: "2024-06-03 14:23",
    status: "Pending",
  },
  {
    apNumber: "AP004",
    message: "Message 4",
    createdAt: "2024-06-04 09:12",
    status: "Completed",
  },
];

export const clientLoader: ClientLoaderFunction = async () => {
  const user = getCurrentUser();
  if (!user) {
    return redirect("/");
  }

  const isUser = user?.type === "USER";

  const response = await getNotifications(isUser ? user?.id : "");
  return json(response);
};

export default function Notifications() {
  const response = useLoaderData<ActionLoaderResponse<UserNotification[]>>();
  return <NotifcationTable data={response?.data ?? []} />;
}
