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
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

type SubsectionProps = {
  title?: string;
  children?: React.ReactNode;
};
export function Subsection(props: Readonly<SubsectionProps>) {
  const { title, children } = props;
  return (
    <section>
      <b>{title}</b>
      <p>{children}</p>
    </section>
  );
}
