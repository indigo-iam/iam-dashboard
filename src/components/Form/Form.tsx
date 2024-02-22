import React from "react";

export const Form = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  return <form className="container">{children}</form>;
};
