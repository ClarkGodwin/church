export function initializeCopyButtons() {
  const status = document.querySelector(".copy-status");
  if (!status) return;

  document.querySelectorAll(".cp").forEach((button) => {
    button.addEventListener("click", async () => {
      const language = document.documentElement.lang;
      const copiedMessage = language === "kr"
        ? "Vyandukuwe ✓"
        : language === "en"
          ? "Copied ✓"
          : "Copié ✓";
      const failureMessage = language === "kr"
        ? "Vyandukure n'amaboko: "
        : language === "en"
          ? "Copy manually: "
          : "Copiez à la main : ";

      try {
        await navigator.clipboard.writeText(button.dataset.c ?? "");
        status.textContent = copiedMessage;
      } catch (error) {
        console.warn("La copie automatique a échoué.", error);
        status.textContent = `${failureMessage}${button.dataset.c ?? ""}`;
      }

      window.setTimeout(() => {
        status.textContent = "";
      }, 3000);
    });
  });
}
