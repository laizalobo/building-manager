import { ClientActionFunction, redirect } from "@remix-run/react";
import { updateNotification } from "~/modules/notification/services";

export const action: ClientActionFunction = async ({ request, params }) => {
  const id = params.id;
  const formData = await request.formData();
  const message = formData.get("message")?.toString() ?? "";
  const status = formData.get("status")?.toString() ?? "";

  let toUpdate = {};
  if (message) toUpdate = { message };
  if (status) toUpdate = { status };

  await updateNotification(id ?? "", toUpdate);
  return redirect("/notification");
};
