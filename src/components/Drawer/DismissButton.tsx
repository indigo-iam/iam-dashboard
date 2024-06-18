"use client";

export default function DismissButton(props: Readonly<{ drawerId: string }>) {
  const { drawerId } = props;
  const dismissButtonId = `${drawerId}-dismiss-btn`;
  function closeSidebar() {
    const sidebar = document.getElementById(drawerId);
    sidebar?.classList.remove("show-sidebar");
    const self = document.getElementById(dismissButtonId);
    self?.classList.add("hidden");
  }

  return (
    <button
      id={dismissButtonId}
      onClick={closeSidebar}
      className="fixed inset-0 z-10 hidden bg-transparent"
      type="button"
    />
  );
}
