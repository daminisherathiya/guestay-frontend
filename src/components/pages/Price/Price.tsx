"use client";

import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Divider } from "@mui/material";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";

export default function Price() {
  return (
    <Container maxWidth="2xl">
      <Box className="mx-auto max-w-2xl">
        <Typography className="mb-2" component="h1" variant="h1">
          Now, set your price
        </Typography>
        <Typography
          className="mb-8 text-text-secondary"
          component="h3"
          variant="h3"
        >
          You can change it anytime.
        </Typography>
        <Stack className="flex-row items-end">
          <TextField
            id="outlined-basic"
            slotProps={{
              input: {
                classes: { notchedOutline: "border-none" },
                className: "pl-0 text-7xl font-bold",
                startAdornment: (
                  <Typography className="text-7xl font-bold">$</Typography>
                ),
              },
            }}
            variant="outlined"
          />
          <Box>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Box>
        </Stack>
        <Stack className="flex-row gap-x-1">
          <Typography>Guest price before taxes ₹6,077</Typography>
          <Box>
            <KeyboardArrowDownIcon />
          </Box>
        </Stack>
        <Stack className="gap-y-3">
          <Button
            disableRipple
            className="inline-block p-0 no-underline hover:bg-common-white"
          >
            <Box className="space-y-2 rounded-xl border-2 px-4 py-6">
              <Box className="space-y-2">
                <Stack className="flex-row justify-between">
                  <Typography variant="h3">Base price</Typography>
                  <Typography variant="h3">₹5,325</Typography>
                </Stack>
                <Stack className="flex-row justify-between">
                  <Typography variant="h3">Base price</Typography>
                  <Typography variant="h3">₹5,325</Typography>
                </Stack>
              </Box>
              <Divider className="pt-2" />
              <Stack className="flex-row justify-between pt-2">
                <Typography className="font-medium" variant="h3">
                  Guest price before taxes
                </Typography>
                <Typography className="font-medium" variant="h3">
                  ₹5,325
                </Typography>
              </Stack>
            </Box>
          </Button>
          <Button
            disableRipple
            className="inline-block p-0 no-underline hover:bg-common-white"
          >
            <Box className="space-y-2 rounded-xl border-2 px-4 py-6">
              <Box className="space-y-2">
                <Stack className="flex-row justify-between">
                  <Typography variant="h3">Base price</Typography>
                  <Typography variant="h3">₹5,325</Typography>
                </Stack>
                <Stack className="flex-row justify-between">
                  <Typography variant="h3">Host service fee</Typography>
                  <Typography variant="h3">-₹160</Typography>
                </Stack>
              </Box>
              <Divider className="pt-2" />
              <Stack className="flex-row justify-between pt-2">
                <Typography className="font-medium" variant="h3">
                  You earn
                </Typography>
                <Typography className="font-medium" variant="h3">
                  ₹5,165
                </Typography>
              </Stack>
            </Box>
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
