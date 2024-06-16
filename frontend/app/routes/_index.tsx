import {
  ClientActionFunction,
  json,
  redirect,
  useActionData,
} from "@remix-run/react";
import LoginForm from "~/modules/login/pages/LoginForm";
import { login } from "~/modules/login/services";
import { getCurrentUser } from "~/modules/user/helpers";

export const clientAction: ClientActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const { message, data } = await login(
    email?.toString(),
    password?.toString()
  );

  if (data) {
    sessionStorage.setItem("user", JSON.stringify(data));
    return json({ data });
  }

  return json({ message }, { status: 401 });
};

export function clientLoader() {
  const user = getCurrentUser();
  if (user) {
    return redirect("/notification");
  }
  return "";
}

export default function Index() {
  const response = useActionData<{ message: string }>();
  return <LoginForm message={response?.message} />;
}
