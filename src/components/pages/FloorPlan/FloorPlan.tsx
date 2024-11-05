"use client";

import Image from "next/image";

import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Select from "@mui/material/Select";
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
import { Stack } from "@/components/atoms/Stack";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";
import { TextFieldWrapper } from "@/components/molecules/TextFieldWrapper";

import { floorPlanItems } from "./FloorPlan.consts";
import { useFloorPlan } from "./FloorPlan.hooks";

export function FloorPlan() {
  const {
    bedrooms,
    bedTypesApiData,
    bedTypesApiIsFirstLoading,
    BedTypesApiSnackbarAlert,
    control,
    counters,
    displayValue,
    Footer,
    handleAddBedroom,
    handleDecrease,
    handleIncrease,
    PropertyApiSnackbarAlert,
    remove,
    SavePropertyApiSnackbarAlert,
  } = useFloorPlan();

  // const [bedroomType, setBedroomType] = useState("");

  // const handleChange = (event: SelectChangeEvent) => {
  //   setBedroomType(event.target.value as string);
  // };

  // const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  // const idPrefix = useId();

  // const handleChangebed = (
  //   event: React.SyntheticEvent<Element, Event>,
  //   newValue: Option[],
  // ) => {
  //   const updatedSelections = newValue.map((option, index) => ({
  //     ...option,
  //     id: option.id || `${idPrefix}-${index}`,
  //   }));
  //   setSelectedOptions(updatedSelections);
  // };

  // const { Footer } = useOverview();

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
            {floorPlanItems.map((floorPlanItem, index) => (
              <Stack
                key={index}
                className="flex-row items-center justify-between border-b-divider py-6 [&:not(:last-child)]:border-b"
              >
                <Typography component="p" variant="h3">
                  {floorPlanItem.name}
                </Typography>
                <Stack className="w-[6.5rem] flex-row items-center justify-between">
                  <IconButton
                    className={`flex size-8 items-center justify-center border border-solid border-divider ${
                      counters[floorPlanItem.field] === 0
                        ? "pointer-events-none opacity-30"
                        : ""
                    }`}
                    disabled={counters[floorPlanItem.field] === 0}
                    onClick={() => handleDecrease(floorPlanItem.field)}
                  >
                    <Image
                      alt="Minue"
                      height={12}
                      src="/images/minus.svg"
                      width={12}
                    />
                  </IconButton>
                  <Typography>
                    {displayValue(
                      counters[floorPlanItem.field],
                      // floorPlanItem.max,
                      // floorPlanItem.field,
                    )}
                  </Typography>
                  <IconButton
                    className={`flex size-8 items-center justify-center border border-solid border-divider ${
                      counters[floorPlanItem.field] === floorPlanItem.max
                        ? "pointer-events-none opacity-30"
                        : ""
                    }`}
                    disabled={
                      counters[floorPlanItem.field] === floorPlanItem.max
                    }
                    onClick={() =>
                      handleIncrease(floorPlanItem.field, floorPlanItem.max)
                    }
                  >
                    <Image
                      alt="Minue"
                      height={12}
                      src="/images/plus.svg"
                      width={12}
                    />
                  </IconButton>
                </Stack>
              </Stack>
            ))}
          </Box>
          <Divider />
          <Typography className="py-6 " component="p" variant="h3">
            Bedrooms
          </Typography>
          <Box className="space-y-4">
            {bedrooms.map((bedroom, index) => (
              <Grid2 key={index} container className="items-center" spacing={2}>
                <Grid2 size={6}>
                  <TextFieldWrapper
                    control={control}
                    label="Bedroom Name"
                    name={`bedrooms.${index}.bedroomName`}
                  />
                </Grid2>
                <Grid2 size={6}>
                  <FormControl fullWidth variant="filled">
                    <InputLabel>Bedroom Count</InputLabel>
                    <Controller
                      control={control}
                      name={`bedrooms.${index}.bedroomCount`}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="bg-common-white before:h-full before:rounded-lg before:border before:border-common-black/45 after:h-full after:rounded-lg after:border-2 after:border-common-black after:transition-none"
                          IconComponent={KeyboardArrowDownIcon}
                          label="Bedroom Count"
                          // value={bedroomType}
                          // onChange={handleChange}
                        >
                          <MenuItem value="1">Count as full bedroom</MenuItem>
                          <MenuItem value="0.5">Count as half bedroom</MenuItem>
                          <MenuItem value="0">Do not count as bedroom</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid2>
                <Grid2 size={bedrooms.length > 1 ? 11 : 12}>
                  <Controller
                    control={control}
                    name={`bedrooms.${index}.bedroomTypes`}
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
                                className: `${params.InputProps.className} bg-common-white before:h-full before:rounded-lg before:border before:border-common-black/45 after:h-full after:rounded-lg after:border-2 after:border-common-black after:transition-none`,
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
                          value.map((option, index) => {
                            const { key, ...restTagProps } = getTagProps({
                              index,
                            });
                            return (
                              <Chip
                                key={key}
                                label={option.title}
                                {...restTagProps}
                                className={`${restTagProps.className} h-7`}
                              />
                            );
                          })
                        }
                        // value={selectedOptions}
                        // onChange={handleChangebed}
                        value={field.value || []}
                        onChange={(_, newValue) => field.onChange(newValue)}
                      />
                    )}
                  />
                </Grid2>
                {bedrooms.length > 1 && (
                  <Grid2 size={1}>
                    <Stack className="flex-row justify-end">
                      <IconButton onClick={() => remove(index)}>
                        <CloseIcon />
                      </IconButton>
                    </Stack>
                  </Grid2>
                )}
              </Grid2>
            ))}
          </Box>
          <Box className="mt-6" size={12}>
            <Button variant="contained" onClick={handleAddBedroom}>
              Add Bedroom
            </Button>
          </Box>
        </Box>
      </Container>
      {Footer}
      {BedTypesApiSnackbarAlert}
      {PropertyApiSnackbarAlert}
      {SavePropertyApiSnackbarAlert}
    </>
  );
}
