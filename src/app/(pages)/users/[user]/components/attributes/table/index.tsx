import { User } from "@/models/scim";
import { fetchAttributes } from "@/services/users";
import AttributeOptions from "./options";

type TableProps = {
  user: User;
};

export default async function AttributesTable(props: Readonly<TableProps>) {
  const { user } = props;
  const attributes = await fetchAttributes(user.id);

  if (!attributes || attributes.length === 0) {
    return <p className="iam-text-light">No Attributes found.</p>;
  }

  return (
    <table className="w-full table-auto rounded-lg">
      <thead>
        <tr>
          <th className="tbl-th text-left">Name</th>
          <th className="tbl-th text-left">Value</th>
          <th className="tbl-th text-center"></th>
        </tr>
      </thead>
      <tbody>
        {attributes.map(attr => {
          return (
            <tr className="tbl-tr" key={attr.name}>
              <td className="tbl-td">{attr.name}</td>
              <td className="tbl-td">{attr.value}</td>
              <td className="tbl-td w-1/12 text-center">
                <AttributeOptions user={user} attr={attr} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
