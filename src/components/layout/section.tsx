type SectionProps = {
  children: React.ReactNode;
  title?: string;
};

export default function Section(props: Readonly<SectionProps>) {
  const { children, title } = props;
  return (
    <section className="rounded-lg bg-gray-50 p-4 shadow dark:bg-white/10">
      {title ? <h2 className="border-b border-gray-300">{title}</h2> : null}
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
      {children}
    </section>
  );
}
