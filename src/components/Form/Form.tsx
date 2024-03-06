import React from "react";

export interface FormProps extends React.HTMLProps<HTMLFormElement> {}

export const Form = (props: FormProps) => {
  const { children, ...formProps } = props;
  return <form {...formProps}>{children}</form>;
};
