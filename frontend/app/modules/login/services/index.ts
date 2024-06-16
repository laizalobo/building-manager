import { RequestService } from "~/modules/api";
import { ActionLoaderResponse, UserResponse } from "~/modules/share/types";

const requestService = RequestService();

export const login = async (
  email?: string,
  password?: string
): Promise<ActionLoaderResponse<UserResponse>> => {
  try {
    const data = (
      await requestService.post<ActionLoaderResponse<UserResponse>>("/auth", {
        email,
        password,
      })
    ).data;
    return data;
  } catch (error) {
    return {
      message: "Erro ao realizar o login",
    };
  }
};
