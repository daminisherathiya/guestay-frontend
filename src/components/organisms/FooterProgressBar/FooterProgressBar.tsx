import { Box, Button, Container, LinearProgress, Stack } from "@mui/material";

export default function FooterProgressBar() {
  return (
    <Box className="fixed bottom-0 z-10 w-full bg-common-white">
      <LinearProgress
        classes={{ bar: "bg-common-black" }}
        className="h-1.5 bg-divider"
        value={20}
        variant="determinate"
      />
      <Container maxWidth="2xl">
        <Stack className="flex-row justify-between py-4">
          <Button color="secondary" variant="text">
            Back
          </Button>
          <Button color="secondary" size="large" variant="contained">
            Next
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
