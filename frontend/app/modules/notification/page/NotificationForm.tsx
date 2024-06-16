import { Form, Link } from "@remix-run/react";
import { Button } from "~/modules/share/components/Button";
import { CloseIcon } from "~/modules/share/components/CloseIcon";

export default function RegisterForm({ message }: { message?: string }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center min-h-screen bg-gray-950 bg-opacity-60">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Cadastro</h2>
        <Link className="absolute top-2 right-2 text-xs" to="/notification">
          <CloseIcon />
        </Link>

        <Form method="post" action="/notification/add">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Messagem
              <textarea
                id="name"
                name="message"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </label>
          </div>
          {message && <p className="py-2 text-xs text-red-500">{message}</p>}
          <Button className="w-full" type="submit">
            Notificar
          </Button>
        </Form>
      </div>
    </div>
  );
}
