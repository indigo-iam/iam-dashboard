import { PlusIcon } from "@heroicons/react/24/solid";

type AddButtonProps = {
  title?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export default function AddButton(props: Readonly<AddButtonProps>) {
  return (
    <button
      {...props}
      className="mx-auto w-5 rounded-md bg-success p-0.5 text-secondary"
    >
      <PlusIcon />
    </button>
  );
}
