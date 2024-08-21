import { ItemView } from "./ItemView";
import { MultiChoiceItemI } from "./MultiChoiceItem";

const DropdownContent = (props: { items: MultiChoiceItemI[] }) => {
  const { items } = props;
  return (
    <div className="relative mr-2 h-full overflow-y-auto">
      {items.map(item => (
        <ItemView key={item.key} item={item} />
      ))}
    </div>
  );
};

export const Dropdown = (props: {
  show: boolean;
  items: MultiChoiceItemI[];
}) => {
  const { show, ...other } = props;
  return (
    <div
      hidden={show === false}
      className={"absolute mx-auto mt-2 h-96 rounded-xl bg-secondary shadow-lg"}
    >
      <DropdownContent {...other} />
    </div>
  );
};
