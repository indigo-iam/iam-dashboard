export interface LogoHeaderProps {
  username: string;
}

export const LogoHeader = (props: LogoHeaderProps): JSX.Element => {
  const { username } = props;
  return (
    <div id="logo-header" className="d-flex w-100">
      <div className="infn-txt-secondary h3 m-auto">{username}</div>
      <div
        className="m-auto"
        style={{
          backgroundColor: "gray",
          border: "solid 2px darkgray",
          width: "40px",
          height: "40px",
          borderRadius: "20px",
        }}
      ></div>
    </div>
  );
};
