import {
  Input as HeadlessInput,
  type InputProps as HeadlessInputProps,
} from "@headlessui/react";

export interface InputProps extends HeadlessInputProps {
  className?: string;
}

export function Input(props: Readonly<InputProps>) {
  const { className, ...inputProps } = props;
  return (
    <div className={className}>
      <HeadlessInput
        className="border w-full rounded-lg px-4 py-2 disabled:bg-secondary-300 placeholder:disabled:text-secondary-600"
        {...inputProps}
      />
    </div>
  );
}
