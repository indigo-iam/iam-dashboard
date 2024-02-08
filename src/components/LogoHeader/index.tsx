export interface LogoHeaderProps {
  username: string;
}

export const LogoHeader = (props: LogoHeaderProps): JSX.Element => {
  const { username } = props;
  return (
    <div id="logo-header" className="d-flex w-100">
      <div className="text-white h3 m-auto">{username}</div>
      <div
        className="m-auto"
        style={{
          backgroundColor: "white",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
        }}
      ></div>
    </div>
  );
};
