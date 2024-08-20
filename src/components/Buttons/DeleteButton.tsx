import { XMarkIcon } from "@heroicons/react/24/solid";

type DeleteButtonProps = {
  title?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export default function DeleteButton(props: Readonly<DeleteButtonProps>) {
  return (
    <button
      {...props}
      className="m-auto h-5 w-5 rounded-md bg-danger p-0.5 text-secondary"
    >
      <XMarkIcon />
    </button>
  );
}
