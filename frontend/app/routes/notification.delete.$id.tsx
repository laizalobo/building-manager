import {
  ClientActionFunction,
  json,
  redirect,
  useActionData,
  useParams,
  useRouteLoaderData,
} from "@remix-run/react";
import DeleteConfirmation from "~/modules/notification/page/DeleteConfirmation";
import { removeNotification } from "~/modules/notification/services";
import { UserNotification } from "~/modules/notification/types";

export const clientAction: ClientActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const notificationId = formData.get("notificationId")?.toString() ?? "";
  const requesterId = formData.get("requesterId")?.toString() ?? "";
  const result = await removeNotification(notificationId, requesterId);

  if (result.success) {
    return redirect("/notification");
  }
  return json(result);
};

export default function DeleteNotification() {
  const params = useParams<{ id: string }>();
  const action = useActionData<{ message: string }>();
  const notifications = useRouteLoaderData<{ data: UserNotification[] }>(
    "routes/notification"
  );
  const notification = notifications?.data?.find(
    (item) => item.id === params.id
  );

  return (
    <DeleteConfirmation notification={notification} message={action?.message} />
  );
}
