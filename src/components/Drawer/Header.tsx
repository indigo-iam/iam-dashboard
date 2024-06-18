import Image from "next/image";
import BurgerButton from "./BurgerButton";

const LogoIam = () => (
  <div className="flex">
    <Image
      src="/cloud.png"
      width="0"
      height="0"
      sizes="100vw"
      className="my-auto w-20"
      alt="INFN Cloud"
      priority={true}
    />
    <div className="my-auto px-4 py-2 text-2xl font-bold text-secondary">
      INDIGO IAM for cnafsd
    </div>
  </div>
);

export default function Header(props: { drawerId: string }) {
  const { drawerId } = props;
  return (
    <header className="fixed left-0 top-0 z-30 h-16 w-screen bg-primary lg:w-80">
      <div className="flex h-full justify-between px-4">
        <LogoIam />
        <BurgerButton drawerId={drawerId} />
      </div>
    </header>
  );
}
