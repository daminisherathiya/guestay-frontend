"use client";

import { useId, useState } from "react";

import Image from "next/image";

import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useForm } from "react-hook-form";

import { Autocomplete } from "@/components/atoms/Autocomplete";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Chip } from "@/components/atoms/Chip";
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

interface Option {
  id?: string;
  label: string;
  value: string;
}
const bedOptions: Option[] = [
  { label: "Single Bed", value: "single" },
  { label: "Double Bed", value: "double" },
  { label: "Queen Bed", value: "queen" },
  { label: "King Bed", value: "king" },
  { label: "Sofa Bed", value: "sofa" },
  { label: "Loft Bed", value: "loft" },
];

export function FloorPlan() {
  const {
    bedTypesApiData,
    bedTypesApiIsFirstLoading,
    BedTypesApiSnackbarAlert,
    counters,
    displayValue,
    handleDecrease,
    handleIncrease,
  } = useFloorPlan();

  const {
    control,
    // formState: { isValid },
    // handleSubmit,
  } = useForm({
    defaultValues: {
      bedroomName: "Bedroom 1",
    },
    mode: "onChange",
  });
  const [bedroomType, setBedroomType] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setBedroomType(event.target.value as string);
  };

  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const idPrefix = useId();

  const handleChangebed = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Option[],
  ) => {
    const updatedSelections = newValue.map((option, index) => ({
      ...option,
      id: option.id || `${idPrefix}-${index}`,
    }));
    setSelectedOptions(updatedSelections);
  };

  const [bedrooms, setBedrooms] = useState([{ id: 1, name: "Bedroom 1" }]);

  const handleAddBedroom = () => {
    const newBedroom = {
      id: bedrooms.length + 1,
      name: `Bedroom ${bedrooms.length + 1}`,
    };
    setBedrooms((prevBedroom) => [...prevBedroom, newBedroom]);
  };

  const handleRemoveBedroom = (id: number) => {
    setBedrooms(bedrooms.filter((bedroom) => bedroom.id !== id));
  };

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
                      floorPlanItem.max,
                      floorPlanItem.field,
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
              <Grid2 key={index} container className="items-end" spacing={2}>
                <Grid2 size={6}>
                  <TextFieldWrapper
                    control={control}
                    label="Bedroom Name"
                    name="bedroomName"
                  />
                </Grid2>
                <Grid2 size={6}>
                  <FormControl fullWidth variant="filled">
                    <InputLabel id="demo-simple-select-label">
                      Bedroom Count
                    </InputLabel>
                    <Select
                      className="bg-common-white before:h-full before:rounded-lg before:border before:border-common-black/45 after:h-full after:rounded-lg after:border-2 after:border-common-black after:transition-none"
                      IconComponent={KeyboardArrowDownIcon}
                      id="demo-simple-select"
                      label="Bedroom Count"
                      labelId="demo-simple-select-label"
                      value={bedroomType}
                      onChange={handleChange}
                    >
                      <MenuItem value="full">Count as full bedroom</MenuItem>
                      <MenuItem value="half">Count as half bedroom</MenuItem>
                      <MenuItem value="none">Do not count as bedroom</MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>
                <Grid2 size={11}>
                  <Autocomplete
                    multiple
                    filterSelectedOptions={false}
                    getOptionLabel={(option) =>
                      option && option.label ? option.label : ""
                    }
                    options={bedOptions}
                    popupIcon={<KeyboardArrowDownIcon />}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Bed Types"
                        slotProps={{
                          input: {
                            ...params.InputProps,
                            className: `${params.InputProps.className} bg-common-white before:h-full before:rounded-lg before:border before:border-common-black/45 after:h-full after:rounded-lg after:border-2 after:border-common-black after:transition-none`,
                          },
                        }}
                        variant="filled"
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => {
                        const { key, ...restTagProps } = getTagProps({ index });
                        return (
                          <Chip
                            key={key}
                            label={option.label}
                            {...restTagProps}
                            className={`${restTagProps.className} h-6`}
                          />
                        );
                      })
                    }
                    value={selectedOptions}
                    onChange={handleChangebed}
                  />
                </Grid2>
                {bedrooms.length > 1 && (
                  <Grid2 size={1}>
                    <Stack className="flex-row justify-end">
                      <IconButton
                        onClick={() => handleRemoveBedroom(bedroom.id)}
                      >
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
      {BedTypesApiSnackbarAlert}
    </>
  );
}
