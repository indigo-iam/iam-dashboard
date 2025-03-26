// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export const ModalFooter = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  return (
    <div className="border-t bottom-0 flex min-h-8 justify-end space-x-2 pt-4">
      {children}
    </div>
  );
};
