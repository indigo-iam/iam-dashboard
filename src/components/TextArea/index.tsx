import Label from "../Label";

type TextAreaProps = {
  title?: string;
  name?: string;
  id?: string;
  required?: boolean;
};

export default function TextArea(props: Readonly<TextAreaProps>) {
  const { id, title, name, required } = props;

  return (
    <div className="flex flex-col">
      <Label htmlFor={id} title={title} />
      <textarea
        className="rounded-xl bg-secondary-100 px-4 py-2 disabled:bg-secondary-300 placeholder:disabled:text-secondary-600"
        id={id}
        title={title}
        name={name}
        required={required}
      />
    </div>
  );
}
