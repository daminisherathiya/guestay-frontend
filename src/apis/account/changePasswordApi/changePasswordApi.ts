import { axiosApi } from "@/axios";

import { changePasswordApiType } from "./changePasswordApi.types";

export const changePasswordApi = async ({ data }: changePasswordApiType) => {
  return await axiosApi({
    data: {
      confirm_password: data.confirmPassword,
      new_password: data.newPassword,
      old_password: data.oldPassword,
      user_id: data.userId,
    },
    method: "POST",
    url: "/account/change_password",
  });
};
