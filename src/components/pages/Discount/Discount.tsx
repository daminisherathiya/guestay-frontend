"use client";
import { useState } from "react";

import { Button, Checkbox } from "@mui/material";

import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Stack } from "@/components/atoms/Stack";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";
import DiscountsDialog from "@/components/molecules/DiscountsDialog/DiscountsDialog";

export default function Discount() {
  const [isDiscountsDialogOpen, setDiscountsDialogOpen] = useState(false);

  const handleOpenDiscountsDialog = () => {
    setDiscountsDialogOpen(true);
  };

  const handleCloseDiscountsDialog = () => {
    setDiscountsDialogOpen(false);
  };

  const handleInput = (e) => {
    let value = e.target.value;

    value = value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2);
    }
    e.target.value = value;
  };
  return (
    <Container maxWidth="2xl">
      <Box className="mx-auto max-w-2xl">
        <Typography className="mb-2" component="h1" variant="h1">
          Add discounts
        </Typography>
        <Typography
          className="mb-8 text-text-secondary"
          component="h3"
          variant="h3"
        >
          Help your place stand out to get booked faster and earn your first
          reviews.
        </Typography>
        <Box className="space-y-6">
          <Box className="rounded-xl border border-divider bg-action-hover p-4 md:px-6 md:py-8">
            <Stack className="flex-row items-center justify-between gap-4">
              <Stack className="flex-row items-center gap-4">
                <TextField
                  disabled
                  autoComplete="off"
                  className="shrink-0"
                  id="outlined-basic"
                  slotProps={{
                    input: {
                      classes: {
                        input: "w-6 py-2 pl-3",
                        notchedOutline: "border-none",
                      },
                      className:
                        "pl-0 font-bold text-lg text-text-primary pr-3",
                      endAdornment: (
                        <Typography className="text-lg font-bold">%</Typography>
                      ),
                    },
                  }}
                  value={20}
                  variant="outlined"
                />
                <Box>
                  <Typography>New listing promotion</Typography>
                  <Typography className="text-text-secondary" variant="body2">
                    Offer 20% off your first 3 bookings
                  </Typography>
                </Box>
              </Stack>
              <Checkbox
                defaultChecked
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              />
            </Stack>
          </Box>
          <Box className="rounded-xl border border-divider bg-action-hover p-4 md:px-6 md:py-8">
            <Stack className="flex-row items-center justify-between gap-4">
              <Stack className="flex-row items-center gap-4">
                <TextField
                  autoComplete="off"
                  className="shrink-0"
                  id="outlined-basic"
                  slotProps={{
                    input: {
                      classes: { input: "w-6 py-2 pl-3" },
                      className:
                        "pl-0 font-bold bg-common-white rounded-lg text-lg pr-3",
                      endAdornment: (
                        <Typography className="text-lg font-bold">%</Typography>
                      ),
                    },
                  }}
                  variant="outlined"
                  onInput={handleInput}
                />
                <Box>
                  <Typography>New listing promotion</Typography>
                  <Typography className="text-text-secondary" variant="body2">
                    Offer 20% off your first 3 bookings
                  </Typography>
                </Box>
              </Stack>
              <Checkbox
                defaultChecked
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              />
            </Stack>
          </Box>
          <Box className="rounded-xl border border-divider bg-action-hover p-4 md:px-6 md:py-8">
            <Stack className="flex-row items-center justify-between gap-4">
              <Stack className="flex-row items-center gap-4">
                <TextField
                  autoComplete="off"
                  className="shrink-0"
                  id="outlined-basic"
                  slotProps={{
                    input: {
                      classes: { input: "w-6 py-2 pl-3" },
                      className:
                        "pl-0 font-bold bg-common-white rounded-lg text-lg pr-3",
                      endAdornment: (
                        <Typography className="text-lg font-bold">%</Typography>
                      ),
                    },
                  }}
                  variant="outlined"
                  onInput={handleInput}
                />
                <Box>
                  <Typography>New listing promotion</Typography>
                  <Typography className="text-text-secondary" variant="body2">
                    Offer 20% off your first 3 bookings
                  </Typography>
                </Box>
              </Stack>
              <Checkbox
                defaultChecked
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              />
            </Stack>
          </Box>
        </Box>
        <Typography className="mt-6 text-center text-xs text-text-secondary">
          Only one discount will be applied per stay.{" "}
          <Button
            disableRipple
            className="p-0 text-xs font-normal text-text-secondary"
            variant="text"
            onClick={handleOpenDiscountsDialog}
          >
            Learn more
          </Button>
          <DiscountsDialog
            handleCloseDiscountsDialog={handleCloseDiscountsDialog}
            isDiscountsDialogOpen={isDiscountsDialogOpen}
          />
        </Typography>
      </Box>
    </Container>
  );
}
