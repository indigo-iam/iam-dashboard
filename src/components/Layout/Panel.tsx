type PanelProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Panel(props: Readonly<PanelProps>) {
  const { children } = props;
  return <div className="m-auto max-w-screen-xl space-y-6">{children}</div>;
}
