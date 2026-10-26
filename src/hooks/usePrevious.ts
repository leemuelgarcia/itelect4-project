import { useEffect, useRef } from "react";

export function usePrevious<T>(
  value: T
): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Returning the ref's value during render is how this hook hands back the
  // PREVIOUS value: the effect above only updates it after the render.
  // eslint-disable-next-line react-hooks/refs
  return ref.current;
}