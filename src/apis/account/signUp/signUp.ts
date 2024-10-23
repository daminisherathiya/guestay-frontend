import { axiosApi } from "@/axios/axios";

import { type SignUpType } from "./signUp.types";

export const signUp = async ({
  firstName,
  lastName,
  profilePicture,
  userName,
  email,
  password,
  confirm_password,
  countryCode,
  phone,
}: SignUpType) => {
  return await axiosApi({
    data: {
      confirm_password: confirm_password,
      country_code: countryCode,
      email: email,
      fname: firstName,
      lname: lastName,
      password: password,
      phone: phone,
      profile_picture: profilePicture,
      uname: userName,
    },
    method: "post",
    url: "/account/sign_up/",
  });
};
