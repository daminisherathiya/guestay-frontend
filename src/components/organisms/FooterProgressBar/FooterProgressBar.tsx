import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { LinearProgress } from "@/components/atoms/LinearProgress";
import { Stack } from "@/components/atoms/Stack";

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
        <Stack className="flex-row items-center justify-between py-4">
          <Box>
            <Button className="text-base" color="secondary" variant="text">
              Back
            </Button>
          </Box>
          <Box>
            <Button color="secondary" size="large" variant="contained">
              Next
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
