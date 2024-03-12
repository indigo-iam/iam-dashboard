import { MeProvider } from "@services/Me";
import { GroupsProvider } from "@services/Groups";

interface IamProviderBaseProps {
  children?: React.ReactNode;
}

export interface IamProviderProps extends IamProviderBaseProps {}

export const IamProvider = (props: IamProviderProps): JSX.Element => {
  const { children } = props;
  return (
    <MeProvider>
      <GroupsProvider>{children}</GroupsProvider>
    </MeProvider>
  );
};
