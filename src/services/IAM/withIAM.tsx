import { IAMProvider, type IAMProviderProps } from "./IAMProvider";

type Props = {
  Comp?: React.ComponentType;
};

export function withIAM(
  WrappedComponent: React.FunctionComponent<Props>,
  iamConfig: IAMProviderProps
) {
  (props: Props) => {
    return (
      <IAMProvider {...iamConfig}>
        <WrappedComponent {...props} />
      </IAMProvider>
    );
  };
}
