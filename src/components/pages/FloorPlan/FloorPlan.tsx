"use client";

import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Controller } from "react-hook-form";

import { Autocomplete } from "@/components/atoms/Autocomplete";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Chip } from "@/components/atoms/Chip";
import { CircularProgress } from "@/components/atoms/CircularProgress";
import { Container } from "@/components/atoms/Container";
import { Divider } from "@/components/atoms/Divider";
import { FormControl } from "@/components/atoms/FormControl";
import { Grid2 } from "@/components/atoms/Grid2";
import { IconButton } from "@/components/atoms/IconButton";
import { InputLabel } from "@/components/atoms/InputLabel";
import { MenuItem } from "@/components/atoms/MenuItem";
import { Select } from "@/components/atoms/Select/Select";
import { Skeleton } from "@/components/atoms/Skeleton";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";
import { CounterWithLabel } from "@/components/molecules/CounterWithLabel";
import { TextFieldWrapper } from "@/components/molecules/TextFieldWrapper";

import { useFloorPlan } from "./FloorPlan.hooks";

export function FloorPlan() {
  const {
    bedrooms,
    bedroomsCounters,
    bedTypesApiData,
    bedTypesApiIsFirstLoading,
    control,
    cribsCounters,
    Footer,
    handleAddBedroom,
    handleRemoveBedroom,
    isLoading,
    setBedroomsCounters,
    setCribsCounters,
  } = useFloorPlan();

  return (
    <>
      <Container maxWidth="2xl">
        <Box className="mx-auto max-w-2xl">
          <Typography className="mb-2" component="h1" variant="h1">
            Share some basics about your place
          </Typography>
          <Typography
            className="mb-8 text-text-secondary"
            component="h3"
            variant="h3"
          >
            You&apos;ll add more details later, such as bed types.
          </Typography>
          <Box>
            <CounterWithLabel
              classes={{
                counterWithLabel:
                  "py-6 border-b-divider [&:not(:last-child)]:border-b",
              }}
              counter={bedroomsCounters}
              isLoading={isLoading}
              label="Bathrooms"
              maxCount={50}
              setCounters={setBedroomsCounters}
              steps={0.5}
            />
          </Box>
          <Divider />
          <Typography className="py-6" component="p" variant="h3">
            Bedrooms
          </Typography>
          <Box className="space-y-4">
            {bedrooms.map((bedroom, index) => (
              <Box
                key={index}
                className="group relative rounded-lg border border-divider p-4"
              >
                {isLoading ? (
                  <Grid2 container className="items-center" spacing={2}>
                    <Grid2 size={{ "2xs": 12, sm: 6 }}>
                      <Skeleton
                        className="w-full rounded-lg"
                        height={56}
                        variant="rectangular"
                      />
                    </Grid2>
                    <Grid2 size={{ "2xs": 12, sm: 6 }}>
                      <Skeleton
                        className="w-full rounded-lg"
                        height={56}
                        variant="rectangular"
                      />
                    </Grid2>
                    <Grid2 size={12}>
                      <Skeleton
                        className="w-full rounded-lg"
                        height={56}
                        variant="rectangular"
                      />
                    </Grid2>
                  </Grid2>
                ) : (
                  <Grid2 container className="items-center" spacing={2}>
                    <Grid2 size={{ "2xs": 12, sm: 6 }}>
                      <TextFieldWrapper
                        control={control}
                        label="Bedroom Name"
                        name={`bedrooms.${index}.name`}
                      />
                    </Grid2>
                    <Grid2 size={{ "2xs": 12, sm: 6 }}>
                      <FormControl fullWidth variant="filled">
                        <InputLabel>Bedroom Count</InputLabel>
                        <Controller
                          control={control}
                          name={`bedrooms.${index}.bed_count`}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="bg-common-white before:h-full before:rounded-lg before:border before:border-common-black/45 after:h-full after:rounded-lg after:border-2 after:border-common-black after:transition-none"
                              IconComponent={KeyboardArrowDownIcon}
                              label="Bedroom Count"
                            >
                              <MenuItem value="1">
                                Count as full bedroom
                              </MenuItem>
                              <MenuItem value="0.5">
                                Count as half bedroom
                              </MenuItem>
                              <MenuItem value="0">
                                Do not count as bedroom
                              </MenuItem>
                            </Select>
                          )}
                        />
                      </FormControl>
                    </Grid2>
                    <Grid2 size={12}>
                      <Controller
                        control={control}
                        name={`bedrooms.${index}.type`}
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            multiple
                            filterSelectedOptions={false}
                            getOptionLabel={(option) => option.title}
                            loading={bedTypesApiIsFirstLoading}
                            options={bedTypesApiData?.data || []}
                            popupIcon={<KeyboardArrowDownIcon />}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select Bed Types"
                                slotProps={{
                                  input: {
                                    ...params.InputProps,
                                    className: `${
                                      params.InputProps.className
                                    } bg-common-white before:h-full before:rounded-lg before:border before:border-common-black/45 after:h-full after:rounded-lg after:border-2 after:border-common-black after:transition-none`,
                                    endAdornment: (
                                      <>
                                        {bedTypesApiIsFirstLoading ? (
                                          <CircularProgress
                                            className="absolute right-10 top-1/2 -translate-y-1/2"
                                            color="inherit"
                                            size={20}
                                          />
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                      </>
                                    ),
                                  },
                                }}
                                variant="filled"
                              />
                            )}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  label={option.title}
                                  {...getTagProps({ index })}
                                  key={index}
                                  className={`${getTagProps({ index }).className} h-7`}
                                />
                              ))
                            }
                            value={field.value || []}
                            onChange={(_, newValue) => field.onChange(newValue)}
                          />
                        )}
                      />
                    </Grid2>
                    {bedrooms.length > 1 && (
                      <IconButton
                        className="absolute -right-4 -top-4 bg-action-hover sm:hidden group-hover:sm:inline-flex"
                        onClick={() => handleRemoveBedroom(index)}
                      >
                        <CloseIcon className="size-5" />
                      </IconButton>
                    )}
                  </Grid2>
                )}
              </Box>
            ))}
          </Box>
          <Box className="my-6" size={12}>
            <Button
              disabled={isLoading}
              variant="contained"
              onClick={handleAddBedroom}
            >
              Add Bedroom
            </Button>
          </Box>
          <Divider />
          <Box>
            <CounterWithLabel
              classes={{
                counterWithLabel:
                  "py-6 border-b-divider [&:not(:last-child)]:border-b",
              }}
              counter={cribsCounters}
              isLoading={isLoading}
              label="cribs"
              maxCount={50}
              setCounters={setCribsCounters}
            />
          </Box>
        </Box>
      </Container>
      {Footer}
    </>
  );
}
