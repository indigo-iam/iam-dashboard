export type PageProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Page(props: Readonly<PageProps>) {
  const { title, children } = props;

  return (
    <div className="mt-16 space-y-4 lg:mt-0" id={title}>
      <h1>{title ?? "Unknown Client"} </h1>
      <hr />
      {children}
    </div>
  );
}
