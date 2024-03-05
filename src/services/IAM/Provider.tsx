import { MeProvider } from "@services/Me";

interface IamProviderBaseProps {
  children?: React.ReactNode;
}

export interface IamProviderProps extends IamProviderBaseProps {}

export const IamProvider = (props: IamProviderProps): JSX.Element => {
  const { children } = props;
  return <MeProvider>{children}</MeProvider>;
};
