export type FormSectionProps = {
  htmlFor: string;
  title: string;
  children: React.ReactNode;
};

export default function FormSection(props: Readonly<FormSectionProps>) {
  const { htmlFor, title, children } = props;
  return (
    <div className="mt-2 flex flex-col text-sm">
      <label htmlFor={htmlFor} className="text-base font-bold py-2">
        {title}
      </label>
      {children}
    </div>
  );
}
