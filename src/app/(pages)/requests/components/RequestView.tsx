import InfoTable, { InfoTableData } from "@/components/InfoTable";

type RequestViewProps = {
  children: React.ReactNode;
  data: InfoTableData[];
};

export function RequestView(props: Readonly<RequestViewProps>) {
  const { data, children } = props;
  return (
    <div className="flex flex-row">
      <InfoTable className="flex-grow" data={data} />
      <div className="m-auto">
        <div className="mx-auto flex gap-1">{children}</div>
      </div>
    </div>
  );
}
