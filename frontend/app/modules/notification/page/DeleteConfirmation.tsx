import { Form, Link } from "@remix-run/react";
import { Button } from "~/modules/share/components/Button";
import { CloseIcon } from "~/modules/share/components/CloseIcon";
import { UserNotification } from "../types";

type Props = {
  notification?: UserNotification;
  message?: string;
};

export default function DeleteConfirmation({ notification, message }: Props) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center min-h-screen bg-gray-950 bg-opacity-60">
      <div className="bg-white  rounded-lg shadow-lg w-full max-w-md relative">
        <div>
          <header className="px-4 py-2 flex justify-between items-center rounded-tr rounded-tl bg-red-500 text-white">
            <h2 className="text-md font-bold  text-center">Confirmação</h2>
            <Link to="/notification">
              <CloseIcon className="fill-white" />
            </Link>
          </header>
          <div className="flex flex-col justify-between bg-white p-4   rounded-br rounded-bl">
            <p className="w-full mb-8">
              Deseja realmente deletar esta solicitação?
            </p>

            {message && <p className="text-red-500 text-xs mb-2">{message}</p>}
            <Form
              action={`/notification/delete/${notification?.id}`}
              method="POST"
              className="self-end"
            >
              <input
                hidden
                defaultValue={notification?.id}
                name="notificationId"
              />
              <input
                hidden
                defaultValue={notification?.requester?.id}
                name="requesterId"
              />

              <Button className="bg-red-500 hover:bg-red-700">Deletar</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
