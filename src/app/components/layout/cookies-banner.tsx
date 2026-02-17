// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { cookies } from "next/headers";

async function acceptCookies() {
  "use server";
  const cookiesStore = await cookies();
  cookiesStore.set("iam_cookies", "accepted");
}

export async function CookiesBanner() {
  const cookiesStore = await cookies();
  const cookie = cookiesStore.get("iam_cookies");
  const state = cookie?.value === "accepted" ? "hide" : "show";
  return (
    <footer
      className="pointer-events-none visible fixed inset-x-0 bottom-0 z-50 translate-y-0 p-4 transition-all duration-500 data-[state=hide]:invisible data-[state=hide]:translate-y-full"
      data-state={state}
      data-testid="accept-cookies-banner"
    >
      <form
        action={acceptCookies}
        className="dark:bg-dark pointer-events-auto mx-auto flex max-w-fit gap-2 rounded border-white/10 bg-sky-200 p-4 dark:border"
      >
        <p>
          This website uses cookies solely for technical purposes, and no
          third-party cookies are utilized.
        </p>
        <button
          className="font-semibold underline hover:cursor-pointer"
          type="submit"
        >
          I understand
        </button>
      </form>
    </footer>
  );
}
