import { RequestService } from "~/modules/api";
import { ActionLoaderResponse, UserResponse } from "~/modules/share/types";

const requestService = RequestService();

type User = {
  name: string;
  email: string;
  password: string;
  apNumber: number;
  type?: "MANAGER" | "USER";
};

export const register = async (
  user: User
): Promise<ActionLoaderResponse<UserResponse>> => {
  try {
    const response = (
      await requestService.post<UserResponse>("/users", {
        ...user,
        type: user.type ?? "USER",
        confirmPassword: undefined,
      })
    ).data;
    return { data: response };
  } catch (error) {
    return { message: "Erro ao salvar o registro" };
  }
};
