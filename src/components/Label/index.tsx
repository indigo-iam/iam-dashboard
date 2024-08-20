type LabelProps = {
  htmlFor?: string;
  title?: string;
};

export default function Label(props: Readonly<LabelProps>) {
  const { htmlFor, title } = props;
  return (
    <label className="text-lg font-bold text-primary" htmlFor={htmlFor}>
      {title}
    </label>
  );
}
