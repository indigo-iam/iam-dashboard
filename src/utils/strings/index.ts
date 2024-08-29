export function toTitleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function camelCaseToTitle(s: string) {
  return toTitleCase(s.split("_").join(" "));
}
