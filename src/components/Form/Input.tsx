interface InputProps extends React.HTMLProps<HTMLInputElement> {}

export const Input = (props: InputProps) => {
  const { id, title, type } = props;
  const className =
    type === "search" || type === "email" || type === "password"
      ? "infn-input-search"
      : "";
  return (
    <div className="row p-1">
      <label className="col col-lg-6 col-xl-5 col-xxl-4 my-auto" htmlFor={id}>
        {title}
      </label>
      <input className={`col-1 col-lg ${className}`} {...props} />
    </div>
  );
};
