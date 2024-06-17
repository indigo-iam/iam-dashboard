export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  errorMessage?: string;
}

export default function Input(props: InputProps) {
  const { id, title } = props;
  const { errorMessage, ...inputProps } = props;
  return (
    <div className="flex flex-col">
      <label className="text-lg font-bold text-primary" htmlFor={id}>
        {title}
      </label>
      <input
        className="rounded-full bg-secondary-100 px-4 py-2 disabled:bg-secondary-300 placeholder:disabled:text-secondary-600"
        {...inputProps}
      />
      {errorMessage ? (
        <small className="text-danger">{errorMessage}</small>
      ) : null}
    </div>
  );
}
