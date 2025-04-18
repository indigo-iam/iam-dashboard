// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {}

export default function TextArea(props: Readonly<TextAreaProps>) {
  return (
    <div className="flex flex-col">
      <textarea
        className="bg-secondary disabled:bg-secondary-300 placeholder:disabled:text-secondary-600 rounded-xl border border-gray-400 px-4 py-2 dark:bg-white/10"
        {...props}
      />
    </div>
  );
}
