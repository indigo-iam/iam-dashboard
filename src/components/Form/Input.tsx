export interface InputProps {
  id: string;
  title: string;
  type: React.HTMLInputTypeAttribute;
  value?: string;
  placeholder?: string;
  onChange?: (newValue?: string) => void;
}

export const Input = (props: InputProps) => {
  const { id, title, type, value, placeholder, onChange } = props;
  const className =
    type === "search" || type === "email" || type === "password"
      ? "infn-input-search"
      : "";

  const onChangeCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.currentTarget.value);
    }
  };

  return (
    <div className="row p-1">
      <label className="col col-lg-6 col-xl-5 col-xxl-4 my-auto" htmlFor={id}>
        {title}
      </label>
      <input
        className={`col-1 col-lg ${className}`}
        type={type}
        name={id}
        value={value}
        placeholder={placeholder}
        onChange={onChangeCallback}
        id={id}
      />
    </div>
  );
};
