/**
 * Build the page cover and its three in-page navigation links.
 * Keep each href in sync with the id of its destination section.
 * @returns {string} HTML markup inserted by js/main.js.
 */
export function renderHero() {
  const markup = /* html */ `
    <header class="hero">
      <div>
        <small>Murakaza neza · Bienvenue</small>
        <h1>EPG</h1>
        <p>« Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos. » (Matthieu 11:28)</p>
        <nav class="hero-actions" aria-label="Navigation principale">
          <a class="btn" href="#cultes">Venir au culte</a>
          <a class="btn o" href="#dons">Soutenir l'église</a>
          <a class="btn contact-btn" href="#contacts">Contacts</a>
        </nav>
      </div>
    </header>`;

  return markup;
}
