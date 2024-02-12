import { IamProvider, type IamProviderProps } from "./IamProvider";

type Props = {
  Comp?: React.ComponentType;
};

export function withIam(
  WrappedComponent: React.FunctionComponent<Props>,
  iamConfig: IamProviderProps
) {
  (props: Props) => {
    return (
      <IamProvider {...iamConfig}>
        <WrappedComponent {...props} />
      </IamProvider>
    );
  };
}
