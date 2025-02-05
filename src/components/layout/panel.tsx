type PanelProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Panel(props: Readonly<PanelProps>) {
  const { children } = props;
  return <div className="m-auto space-y-6 p-8">{children}</div>;
}
