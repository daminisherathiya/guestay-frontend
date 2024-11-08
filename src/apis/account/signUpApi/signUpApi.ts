import { axiosApi } from "@/axios/axios";

import { type SignUpApiType } from "./signUpApi.types";

export const signUpApi = async ({ data }: SignUpApiType) => {
  return await axiosApi({
    data: {
      confirm_password: data.confirmPassword,
      country_code: data.countryCode,
      email: data.email,
      fname: data.firstName,
      lname: data.lastName,
      password: data.password,
      phone: data.phoneNumber,
      profile_picture: data.profilePicture,
      uname: data.userName,
    },
    method: "post",
    url: "/account/sign_up/",
  });
};
