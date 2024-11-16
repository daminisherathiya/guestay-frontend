import LogoutIcon from "@mui/icons-material/Logout";

import { ListItemIcon } from "@/components/atoms/ListItemIcon";
import { MenuItem } from "@/components/atoms/MenuItem";

import { useLogout } from "./Logout.hooks";

export function Logout() {
  const { onSubmit } = useLogout();

  return (
    <>
      <MenuItem onClick={onSubmit}>
        <ListItemIcon>
          <LogoutIcon />{" "}
        </ListItemIcon>
        Logout
      </MenuItem>
    </>
  );
}
