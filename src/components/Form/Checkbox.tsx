export type CheckboxProps = {
  name?: string;
  label?: string;
  defaultChecked?: boolean;
};

export default function Checkbox(props: Readonly<CheckboxProps>) {
  const { name, defaultChecked, label } = props;
  return (
    <div className="mt-4 flex flex-row gap-1">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      <label className="text-sm" htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
