import React from "react";

export interface FormProps extends React.HTMLProps<HTMLFormElement> {}

export default function Form(props: FormProps) {
  const { children, ...formProps } = props;
  return <form {...formProps}>{children}</form>;
}
