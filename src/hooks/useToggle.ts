import { useState } from "react";

export function useToggle(
  initial: boolean = false
): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initial);

  const toggle = (): void => {
    setValue((prev) => !prev);
  };

  return [value, toggle];
}