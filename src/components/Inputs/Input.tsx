import Label from "@/components/Label";

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  errorMessage?: string;
}

export function Input(props: Readonly<InputProps>) {
  const { id, title, className, errorMessage, ...inputProps } = props;
  return (
    <div className={className}>
      <div className="flex flex-col">
        <Label htmlFor={id} title={title} />
        <input
          className="rounded-full bg-secondary-100 px-4 py-2 disabled:bg-secondary-300 placeholder:disabled:text-secondary-600"
          {...inputProps}
        />
        {errorMessage ? (
          <small className="text-danger">{errorMessage}</small>
        ) : null}
      </div>
    </div>
  );
}
