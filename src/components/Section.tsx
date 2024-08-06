type SectionProps = {
  children: React.ReactNode;
  title?: string;
};

export default function Section(props: Readonly<SectionProps>) {
  const { children, title } = props;
  return (
    <section>
      <h2 className="mb-2">{title}</h2>
      <hr />
      <div className="mt-4">{children}</div>
    </section>
  );
}
