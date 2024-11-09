import NextLink from "next/link";

type LinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function Link(props: Readonly<LinkProps>) {
  const { href, children } = props;
  return (
    <NextLink href={href} className="text-primary-200 underline">
      {children}
    </NextLink>
  );
}
