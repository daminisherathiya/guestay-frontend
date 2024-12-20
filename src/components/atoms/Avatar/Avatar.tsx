import { forwardRef } from "react";

import MUIAvatar, { AvatarProps as MUIAvatarProps } from "@mui/material/Avatar";

export interface AvatarProps extends MUIAvatarProps {}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => (
  <MUIAvatar ref={ref} {...props} />
));

Avatar.displayName = "Avatar";
