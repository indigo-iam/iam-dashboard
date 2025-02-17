import {
  Input as HeadlessInput,
  type InputProps as HeadlessInputProps,
} from "@headlessui/react";

export interface InputProps extends HeadlessInputProps {
  className?: string;
  "data-test"?: string;
}

export function Input(props: Readonly<InputProps>) {
  const { className, ...inputProps } = props;
  return (
    <div className={className}>
      <HeadlessInput
        className="w-full rounded-lg border px-4 py-1 disabled:bg-secondary-300 placeholder:disabled:text-secondary-600 dark:bg-white/5 disabled:dark:bg-dark/10 disabled:dark:text-white/20"
        {...inputProps}
      />
    </div>
  );
}
