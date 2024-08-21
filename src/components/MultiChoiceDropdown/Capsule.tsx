import { XCircleIcon } from "@heroicons/react/16/solid";

export const Capsule = (props: { title: string; onDeselect?: () => void }) => {
  const { title, onDeselect } = props;
  return (
    <span className="my-auto flex rounded-full bg-secondary-300 px-2 py-1">
      <small className="my-auto">{title}</small>
      <button
        type="button"
        color="danger"
        className="my-auto ml-2 w-5"
        onClick={onDeselect}
      >
        <XCircleIcon />
      </button>
    </span>
  );
};
