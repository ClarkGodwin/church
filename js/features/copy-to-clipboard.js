/**
 * Attach click handlers to donation copy buttons after page rendering.
 * Buttons supply their payload through data-c; .copy-status is the accessible result.
 * The browser Clipboard API requires a secure context such as HTTPS or localhost.
 */
export function initializeCopyButtons() {
  const status = document.querySelector(".copy-status");
  // The giving component may be omitted on another page; then there are no copy controls.
  if (!status) return;

  document.querySelectorAll(".cp").forEach((button) => {
    button.addEventListener("click", async () => {
      // Read the active language at click time because the visitor can switch languages later.
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

      // Clipboard access may be denied or unavailable; show the value so it can be copied manually.
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
