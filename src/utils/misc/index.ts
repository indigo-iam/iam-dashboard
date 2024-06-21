export const formDataToJSON = <T>(formData: FormData) => {
  const json: { [key: string]: string | File | boolean | string[] | File[] } =
    {};
  for (const [key, value] of formData.entries()) {
    if (formData.getAll(key).length > 1) {
      json[key] = formData.getAll(key) as string[];
    } else if (value) {
      json[key] = value === "on" ? true : value;
    }
  }
  return json as T;
};
