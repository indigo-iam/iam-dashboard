import { UserCircleIcon } from "@heroicons/react/24/solid";
export interface LogoHeaderProps {
  username: string;
}

export const LogoHeader = (props: LogoHeaderProps): JSX.Element => {
  const { username } = props;
  return (
    <div id="logo-header" className="infn-user-logo">
      <div style={{ width: "48px" }}>
        <UserCircleIcon />
      </div>
      <div className="h3 px-4 my-auto">{username}</div>
    </div>
  );
};
