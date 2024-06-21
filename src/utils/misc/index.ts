export const formDataToJSON = <T>(formData: FormData) => {
  const json: {
    [key: string]: string | File | boolean | string[] | File[] | number;
  } = {};
  for (const [key, value] of formData.entries()) {
    if (formData.getAll(key).length > 1) {
      json[key] = formData.getAll(key) as string[];
    } else if (value) {
      const n = parseInt(value.toString());
      if (n) {
        json[key] = Number(n);
      } else if (value === "on") {
        json[key] = true;
      } else if (value === "false") {
        json[key] = false;
      } else {
        json[key] = value;
      }
    }
  }
  return json as T;
};
