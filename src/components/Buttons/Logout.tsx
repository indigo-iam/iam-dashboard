import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { logout } from "@/services/auth";

export const Logout = async () => {
  return (
    <form
      action={logout}
      className="m-auto flex rounded-full p-2 hover:bg-primary-hover"
    >
      <button type="submit" className="size-6 text-secondary">
        <ArrowRightEndOnRectangleIcon />
      </button>
    </form>
  );
};
