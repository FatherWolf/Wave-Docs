import { arrayFilterBoolean } from "./array";

export function classNamesJoin(...classNames: (string | false)[]): string {
  return arrayFilterBoolean(classNames).join(" ");
}
