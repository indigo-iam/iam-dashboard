import React from "react";

export interface FormProps extends React.HTMLProps<HTMLFormElement> {}

export default function Form(props: FormProps) {
  return <form {...props} />;
}
