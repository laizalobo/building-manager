import { Form } from "@remix-run/react";
import { Button } from "~/modules/share/components/Button";

export default function LoginForm({ message }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <Form method="POST">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
              <input
                type="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Senha
              <input
                type="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </label>
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </Form>
        <Form method="get" action="/register">
          <button
            type="submit"
            className="w-full py-2 cursor-pointer text-indigo-600 hover:text-indigo-700"
          >
            Fazer cadastro
          </button>
        </Form>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
}
