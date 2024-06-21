export function formDataToJSON(formData: FormData) {
  const json: { [key: string]: string | File | string[] | File[] } = {};
  for (const [key, value] of formData.entries()) {
    if (formData.getAll(key).length > 1) {
      json[key] = formData.getAll(key) as string[];
    } else {
      json[key] = value;
    }
  }
  return JSON.stringify(json);
}
