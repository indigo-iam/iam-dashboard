type DrawerButtonProps = {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
};

export const DrawerButton = (props: Readonly<DrawerButtonProps>) => {
  const { icon, title, onClick } = props;
  return (
    <button
      className="rounded-full p-3 hover:bg-primary-hover"
      title={title}
      onClick={onClick}
      type="button"
    >
      <div className="h-6 w-6">{icon}</div>
    </button>
  );
};
