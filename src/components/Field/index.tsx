import { Field as HeadlessField, FieldProps } from "@headlessui/react";

export default function Field(props: Readonly<FieldProps>) {
  const { children } = props;
  return <HeadlessField className="space-y-2">{children}</HeadlessField>;
}
