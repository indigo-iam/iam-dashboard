import NextLink from "next/link";

type LinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function Link(props: Readonly<LinkProps>) {
  const { href, children } = props;
  return (
    <NextLink
      href={href}
      className="font-medium text-primary-600 underline dark:text-primary-400"
    >
      {children}
    </NextLink>
  );
}
