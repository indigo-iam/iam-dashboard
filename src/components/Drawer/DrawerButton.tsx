import Link from "next/link";

type DrawerButtonProps = {
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  href: string;
};

export const DrawerButton = (props: Readonly<DrawerButtonProps>) => {
  const { icon, title, children, href } = props;
  return (
    <Link
      className="relative rounded-full p-3 hover:bg-primary-hover"
      title={title}
      href={href}
    >
      <div className="h-6 w-6">{icon}</div>
      {children}
    </Link>
  );
};
