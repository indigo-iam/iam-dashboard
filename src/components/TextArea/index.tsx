interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {}

export default function TextArea(props: Readonly<TextAreaProps>) {
  const { id, name, required } = props;

  return (
    <div className="flex flex-col">
      <textarea
        className="rounded-xl bg-secondary-100 px-4 py-2 disabled:bg-secondary-300 placeholder:disabled:text-secondary-600"
        id={id}
        name={name}
        required={required}
      />
    </div>
  );
}
