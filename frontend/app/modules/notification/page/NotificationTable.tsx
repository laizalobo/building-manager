import { Link, Outlet } from "@remix-run/react";
import { parseISO } from "date-fns";
import { useState } from "react";
import { Button } from "~/modules/share/components/Button";
import { CloseIcon } from "~/modules/share/components/CloseIcon";
import { PencilIcon } from "~/modules/share/components/PencilIcon";
import { SaveIcon } from "~/modules/share/components/SaveIcon";
import { TrashIcon } from "~/modules/share/components/TrashIcon";
import { getCurrentUser } from "~/modules/user/helpers";
import { NotificationStatus, UserNotification } from "../types";

type Props = {
  data: UserNotification[];
};

const NOTIFICATION_STAUS_MAP: Record<NotificationStatus, string> = {
  CONCLUDED: "Concluído",
  PENDING: "Pendente",
  PROCESSING: "Em andamento",
};

const getStatus = (status: NotificationStatus) =>
  NOTIFICATION_STAUS_MAP[status];

export default function NotifcationTable({ data }: Props) {
  const user = getCurrentUser();
  const [selected, setSelected] = useState<UserNotification>();
  const isManager = user?.type === "MANAGER";

  return (
    <section className="flex pt-4 justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex items-center justify-between w-full mb-2">
          <h2 className="text-2xl font-bold mb-4">Notificações</h2>

          {!isManager && (
            <Link to="add">
              <Button>Adicionar</Button>
            </Link>
          )}
        </div>
        <form>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {isManager && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AP Number
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mensagem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id}>
                  {user?.type === "MANAGER" && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.requester?.apNumber}
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {!isManager && selected?.id === item.id ? (
                      <input
                        defaultValue={item.message}
                        type="text"
                        name="message"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    ) : (
                      item.message
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {parseISO(item.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    {isManager && selected?.id === item.id ? (
                      <select
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        defaultValue={item.status}
                        name="status"
                      >
                        {Object.entries(NOTIFICATION_STAUS_MAP).map(
                          ([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          )
                        )}
                      </select>
                    ) : (
                      getStatus(item.status)
                    )}
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-4">
                      {selected?.id === item.id ? (
                        <>
                          <button
                            formAction={`/notification/edit/${item.id}`}
                            formMethod="POST"
                            type="submit"
                          >
                            <SaveIcon />
                          </button>

                          <CloseIcon onClick={() => setSelected(undefined)} />
                        </>
                      ) : (
                        <>
                          <PencilIcon onClick={() => setSelected(item)} />

                          {(!isManager || item.status === "CONCLUDED") && (
                            <Link to={`delete/${item.id}`}>
                              <TrashIcon />
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
      <Outlet />
    </section>
  );
}
