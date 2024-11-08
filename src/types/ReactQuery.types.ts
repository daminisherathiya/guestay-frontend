interface ReactQueryCustomOptionsBaseType {
  showSnackbarIsOpenOnFailure?: boolean;
}

export type ReactQueryCustomOptionsType =
  | (ReactQueryCustomOptionsBaseType & {
      showSnackbarIsOpenOnSuccess?: false;
      successMessage?: string;
    })
  | (ReactQueryCustomOptionsBaseType & {
      showSnackbarIsOpenOnSuccess: true;
      successMessage: string;
    });
