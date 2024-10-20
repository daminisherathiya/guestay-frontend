"use client";

import { getTempObjects } from "@/apis/getTempObjects";
import { type GetTempObjectsResponseType } from "@/apis/getTempObjects/getTempObjects.types";
import { useQuery } from "@/hooks/useQuery";

export function Temp() {
  const { data, isLoading, isFirstLoading, isFetching, SnackbarAlert } =
    useQuery<GetTempObjectsResponseType, Error, GetTempObjectsResponseType>(
      {
        initialData: [],
        queryFn: getTempObjects,
        queryKey: ["temp-objects"],
      },
      { showSnackbarIsOpenOnFailure: true, showSnackbarIsOpenOnSuccess: true },
    );

  return (
    <>
      <div>{isLoading ? "Loading" : "Not loading"}</div>
      <div>{isFirstLoading ? "FirstLoading" : "Not first loading"}</div>
      <div>{isFetching ? "Fetching" : "Not fetching"}</div>
      <div>Data: {JSON.stringify(data)}</div>
      {SnackbarAlert}
    </>
  );
}
