"use client";

import Image from "next/image";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Grid2 } from "@/components/atoms/Grid2";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Typography } from "@/components/atoms/Typography";

import { useStructure } from "./Structure.hooks";

export function Structure() {
  const {
    Footer,
    handleOptionSelection,
    isLoading,
    propertyTypeApiData,
    selectedOption,
  } = useStructure();

  return (
    <>
      <Container maxWidth="2xl">
        <Box className="mx-auto max-w-3xl">
          <Typography className="mb-8" component="h1" variant="h1">
            Which of these best describes your place?
          </Typography>
          {isLoading ? (
            <Grid2 container spacing={2}>
              {Array.from({ length: 9 }).map((_, index) => (
                <Grid2 key={index} size={{ "2xs": 12, md: 4, sm: 6 }}>
                  <Skeleton
                    className="w-full rounded-lg"
                    height={103}
                    variant="rectangular"
                  />
                </Grid2>
              ))}
            </Grid2>
          ) : (
            <Grid2 container spacing={2}>
              {(propertyTypeApiData?.data || []).map((propertyType) => (
                <Grid2 key={propertyType.id} size={{ "2xs": 12, sm: 4, xs: 6 }}>
                  <Button
                    disableRipple
                    className={`size-full flex-col items-start p-4 hover:border-common-transparent hover:bg-common-white hover:shadow-black ${
                      selectedOption === propertyType.id
                        ? "border-common-transparent bg-background-highlight shadow-black"
                        : ""
                    }`}
                    variant="outlined"
                    onClick={() => handleOptionSelection(propertyType.id)}
                  >
                    {propertyType.icon ? (
                      <Image
                        alt={propertyType.title}
                        className="size-8 object-cover"
                        height={32}
                        src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/data/property_type_icons/${propertyType.icon}`}
                        width={32}
                      />
                    ) : (
                      <Image
                        alt={propertyType.title}
                        className="size-8 object-cover"
                        height={32}
                        src="/images/houseCheck.svg"
                        width={32}
                      />
                    )}
                    <Typography className="mt-2 text-left font-medium">
                      {propertyType.title}
                    </Typography>
                  </Button>
                </Grid2>
              ))}
            </Grid2>
          )}
        </Box>
      </Container>
      {Footer}
    </>
  );
}
