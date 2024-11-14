type TableProps = {
  children: React.ReactNode;
};
export function Table(props: Readonly<TableProps>) {
  const { children } = props;
  return (
    <div className="rounded-xl bg-secondary-100/30 py-6 dark:bg-white/10 overflow-auto">
      <table className=" table-auto min-w-full">{children}</table>
    </div>
  );
}
