import { MultiChoiceItemI } from "./multichoice-item";

export const ItemView = (props: { item: MultiChoiceItemI }) => {
  const { item } = props;
  const { title, subtitle } = item;
  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputSearch = e.relatedTarget as HTMLInputElement;
    if (inputSearch) {
      inputSearch.focus();
    }
  };

  const handleClick = () => {
    item.select();
  };

  return (
    <input
      className="mx-2 p-2 hover:rounded-xl hover:bg-secondary-200"
      tabIndex={0}
      onFocus={handleOnFocus}
      onClick={handleClick}
      type="button"
    >
      <div>{title}</div>
      {subtitle ? <small>{subtitle}</small> : null}
    </input>
  );
};
