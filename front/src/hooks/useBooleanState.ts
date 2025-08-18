import { useState } from "react";
import { usePreservedCallback } from "./usePreservedCallback";

export const useBooleanState = (
  defaultValue = false
): readonly [boolean, () => void, () => void, () => void] => {
  const [bool, setBool] = useState(defaultValue);

  const setTrue = usePreservedCallback(() => setBool(true));

  const setFalse = usePreservedCallback(() => setBool(false));

  const toggle = usePreservedCallback(() => setBool((b) => !b));

  return [bool, setTrue, setFalse, toggle] as const;
};
