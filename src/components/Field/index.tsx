import { Field as HeadlessField } from "@headlessui/react";

type FieldProps = {
  children?: React.ReactNode;
};

export default function Field(props: Readonly<FieldProps>) {
  const { children } = props;
  return <HeadlessField className="space-y-2">{children}</HeadlessField>;
}
