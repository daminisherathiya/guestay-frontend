"use client";

import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { PriceWithTaxCalculation } from "@/components/organisms/PriceWithTaxCalculation";

import { usePrice } from "./Price.hooks";

export function Price() {
  const {
    commissionRates,
    Footer,
    handleInput,
    insurancePolicyPrice,
    isLoading,
    price,
    priceError,
  } = usePrice();

  return (
    <>
      <Container className="flex h-full grow flex-col" maxWidth="2xl">
        <Stack className="mx-auto h-full max-w-2xl grow justify-center">
          <Box>
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
          </Box>
          <PriceWithTaxCalculation
            commissionRates={commissionRates}
            handleInput={handleInput}
            insurancePolicyPrice={insurancePolicyPrice}
            isLoading={isLoading}
            price={price}
            priceError={priceError}
            textSize="large"
          />
        </Stack>
      </Container>
      {Footer}
    </>
  );
}
