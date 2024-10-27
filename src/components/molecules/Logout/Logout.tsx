import { LoadingButton } from "@/components/atoms/LoadingButton";

import { useLogout } from "./Logout.hooks";

export function Logout() {
  const { logOutApiIsPending, LogOutApiSnackbarAlert, onSubmit } = useLogout();

  return (
    <>
      <LoadingButton
        className="rounded-3xl"
        loading={logOutApiIsPending}
        loadingIndicator="Login ..."
        variant="contained"
        onClick={onSubmit}
      >
        Logout
      </LoadingButton>
      {LogOutApiSnackbarAlert}
    </>
  );
}
