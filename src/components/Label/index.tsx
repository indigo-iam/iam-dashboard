import {
  Label as HeadlessLabel,
  LabelProps as HeadlessLabelProps,
} from "@headlessui/react";

interface LabelProps extends HeadlessLabelProps {
  required?: boolean;
}

export default function Label(props: Readonly<LabelProps>) {
  const { required, ...labelProps } = props;
  let className = "text-normal font-bold text-primary";
  if (required) {
    className += " after:content-['*'] after:text-danger";
  }

  return <HeadlessLabel className={className} {...labelProps} />;
}
