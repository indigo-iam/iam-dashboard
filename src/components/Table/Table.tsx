type TableProps = {
  children: React.ReactNode;
};
export function Table(props: Readonly<TableProps>) {
  const { children } = props;
  return (
    <div className="rounded-xl bg-secondary-100/30 py-6 dark:bg-primary">
      <table className="w-full table-auto">{children}</table>
    </div>
  );
}
