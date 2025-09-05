"use client";

import { useEffect, useState } from "react";

export function CookiesBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const bannerHidden = localStorage.getItem("cookiesBanner");
    setShow(bannerHidden !== "hidden");
  }, []);

  async function accept() {
    localStorage.setItem("cookiesBanner", "hidden");
    setShow(false);
  }

  return (
    <footer
      className="fixed inset-x-0 bottom-0 z-50 translate-y-full p-4 transition duration-500 data-[cookies=show]:translate-y-0"
      data-cookies={show ? "show" : "hide"}
    >
      <div className="dark:bg-dark mx-auto flex max-w-fit gap-2 rounded border-white/10 bg-sky-200 p-4 dark:border">
        <p>
          This website uses cookies solely for technical purposes, and no
          third-party cookies are utilized.
        </p>
        <button
          className="font-semibold underline hover:cursor-pointer"
          onClick={() => accept()}
        >
          I understand
        </button>
      </div>
    </footer>
  );
}
