import {
  ClientActionFunction,
  redirect,
  useActionData,
} from "@remix-run/react";
import NotificationForm from "~/modules/notification/page/NotificationForm";
import { saveNotification } from "~/modules/notification/services";

export const clientAction: ClientActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const message = formData.get("message")?.toString() ?? "";
  const response = await saveNotification(message);
  if (response?.data) {
    return redirect("/notification");
  }
  return response;
};

export default function AddNotification() {
  const actionData = useActionData();
  return <NotificationForm message={actionData?.message} />;
}
