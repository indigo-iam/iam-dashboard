export type PageProps = {
  title: string;
  children?: React.ReactNode;
};

export default function Page(props: Readonly<PageProps>) {
  const { title, children } = props;

  return (
    <div id={title}>
      <h1>{title} </h1>
      <hr />
      {children}
    </div>
  );
}
