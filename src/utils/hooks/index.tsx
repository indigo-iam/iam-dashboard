// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { useState, useEffect } from "react";

export function useSessionStorage() {
  const [storage, setStorage] = useState<Storage>();

  useEffect(() => {
    (async () => {
      setStorage(sessionStorage);
    })();
  }, []);

  function getItem(key: string) {
    return storage?.getItem(key);
  }

  function setItem(key: string, value: string) {
    storage?.setItem(key, value);
  }

  return { getItem, setItem };
}
