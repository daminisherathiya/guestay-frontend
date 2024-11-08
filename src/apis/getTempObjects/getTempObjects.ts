// https://restful-api.dev/

import { axiosApi } from "@/axios/axios";

export async function getTempObjects() {
  return await axiosApi({
    method: "get",
    url: "https://api.restful-api.dev/objects",
  });
}
