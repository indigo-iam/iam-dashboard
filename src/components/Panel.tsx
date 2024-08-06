type PanelProps = {
  children?: React.ReactNode;
};

export default function Panel(props: Readonly<PanelProps>) {
  const { children } = props;
  return <div className="rounded-xl p-8 text-sm shadow-xl space-y-6">{children}</div>;
}
