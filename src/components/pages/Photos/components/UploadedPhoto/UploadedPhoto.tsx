import { MouseEvent, useState } from "react";

import Image from "next/image";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { IconButton } from "@/components/atoms/IconButton";
import { Menu } from "@/components/atoms/Menu";
import { MenuItem } from "@/components/atoms/MenuItem";

import { UploadedPhotoProps } from "./UploadedPhoto.types";

export function UploadedPhoto({
  handleDeleteImage,
  handleMakeCoverPhoto,
  handleMoveBackwards,
  handleMoveForwards,
  imageUrl,
  index,
  totalLength,
}: UploadedPhotoProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Image
        alt={`uploaded-${index}`}
        className={`aspect-square size-full rounded-lg object-cover ${index === 0 ? "max-h-[29.125rem]" : "max-h-56"}`}
        height={252}
        src={imageUrl}
        width={252}
      />
      <div>
        <IconButton
          className="absolute right-2 top-2 size-8 bg-common-white/90 shadow-button"
          onClick={(e) => handleOpen(e)}
        >
          <MoreHorizIcon className="size-5" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          classes={{ paper: "mt-2 rounded-xl" }}
          MenuListProps={{
            "aria-labelledby": `button-${index}`,
          }}
          open={Boolean(anchorEl)}
          onClose={() => handleClose()}
        >
          {/* <MenuItem
            className="min-h-9 text-sm font-medium"
            onClick={() => handleClose()}
          >
            Edit
          </MenuItem> */}
          {index > 0 && (
            <MenuItem
              className="min-h-9 text-sm font-medium"
              onClick={() => {
                handleMoveBackwards(index);
                handleClose();
              }}
            >
              Move Backwards
            </MenuItem>
          )}
          {index < totalLength && (
            <MenuItem
              className="min-h-9 text-sm font-medium"
              onClick={() => {
                handleMoveForwards(index);
                handleClose();
              }}
            >
              Move Forwards
            </MenuItem>
          )}
          {index > 0 && (
            <MenuItem
              className="min-h-9 text-sm font-medium"
              onClick={() => {
                handleMakeCoverPhoto(index);
                handleClose();
              }}
            >
              Make Cover Photo
            </MenuItem>
          )}
          <MenuItem
            className="min-h-9 text-sm font-medium"
            onClick={() => {
              handleDeleteImage(index);
              handleClose();
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}
