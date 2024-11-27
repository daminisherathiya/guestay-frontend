import { Switch } from "@/components/atoms/Switch/Switch";

export function CustomSwitch() {
  return (
    <Switch
      classes={{
        checked: "translate-x-4 text-common-white",
        switchBase: "p-0.5 duration-300",
        thumb: "size-[1.375rem]",
        track:
          "rounded-pill opacity-100 bg-action-disabledBackground transition-colors duration-300",
      }}
      className="h-[1.625rem] w-[2.625rem] p-0"
      sx={{
        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
          backgroundColor: (theme) =>
            `${theme.palette.primary.main} !important`,
        },
      }}
    />
  );
}
