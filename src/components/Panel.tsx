type PanelProps = {
  children?: React.ReactNode;
};

export default function Panel(props: Readonly<PanelProps>) {
  const { children } = props;
  return (
    <div className="space-y-6 rounded-xl p-4 text-sm shadow">{children}</div>
  );
}
