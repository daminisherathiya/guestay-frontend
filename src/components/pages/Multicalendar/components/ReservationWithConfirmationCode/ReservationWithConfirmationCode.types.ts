import { useToggle } from "@/hooks/useToggle";
export function useReservationWithConfirmationCode() {
  const { toggle: toggleIsBreakdownShow, value: isBreakdownShow } = useToggle({
    initialValue: false,
  });
  return { isBreakdownShow, toggleIsBreakdownShow };
}
