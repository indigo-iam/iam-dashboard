// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {}

export default function TextArea(props: Readonly<TextAreaProps>) {
  return <textarea {...props} />;
}
