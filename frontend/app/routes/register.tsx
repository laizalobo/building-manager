// app/routes/register.jsx

import {
  ClientActionFunction,
  json,
  useActionData,
  useNavigate,
} from "@remix-run/react";
import RegisterForm from "~/modules/user/page/RegisterForm";
import { register } from "~/modules/user/service";

export const clientAction: ClientActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";
  const apNumber = formData.get("apNumber")?.toString() ?? "";

  if (password !== confirmPassword) {
    return json(
      { message: "As senhas informadas não são iguais" },
      { status: 400 }
    );
  }

  const { message, data } = await register({
    name,
    email,
    password,
    apNumber: Number(apNumber),
  });

  if (message) {
    return json(message);
  }

  return json({ data });
};

export default function RegisterPage() {
  const actionData = useActionData<typeof clientAction>();
  const navigate = useNavigate();

  if (actionData?.data) {
    sessionStorage.setItem("user", JSON.stringify(actionData.data));
    navigate("/notification");
  }

  return (
    <div>
      <RegisterForm message={actionData?.message} />
      {actionData?.error && (
        <div className="text-red-500 text-center mt-4">{actionData.error}</div>
      )}
    </div>
  );
}
