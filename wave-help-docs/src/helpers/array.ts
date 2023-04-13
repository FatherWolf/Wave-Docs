import type { Falsey } from "lodash";

export function arrayFilterBoolean<T>(elements: (T | Falsey)[]): T[] {
  return elements.filter(Boolean) as T[];
}
