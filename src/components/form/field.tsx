import { Field as HeadlessField, FieldProps } from "@headlessui/react";

export default function Field(props: Readonly<FieldProps>) {
  return <HeadlessField {...props} className="space-y-2" />;
}
