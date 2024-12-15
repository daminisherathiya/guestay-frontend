import { useCounterWithLabelProps } from "./CounterWithLabel.types";

export function useCounterWithLabel({
  maxCount,
  minCount,
  setCounters,
  steps,
}: useCounterWithLabelProps) {
  const handleIncrease = () => {
    setCounters((prevCounters) => {
      return prevCounters < maxCount ? prevCounters + steps : prevCounters;
    });
  };

  const handleDecrease = () => {
    setCounters((prevCounters) => {
      return prevCounters > minCount ? prevCounters - steps : prevCounters;
    });
  };
  return { handleDecrease, handleIncrease };
}
