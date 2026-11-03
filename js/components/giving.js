/**
 * Build donation methods and the live status area used by copy-to-clipboard.js.
 * For every .cp button, data-c is the value copied; keep it identical to the
 * corresponding displayed account number or code when replacing sample details.
 * @returns {string} HTML markup for the giving section.
 */
export function renderGiving() {
  const markup = /* html */ `
    <section id="dons">
      <h2>Soutenir l'église</h2>
      <p class="lead">Chaque don aide le culte, la chorale, la jeunesse et les familles dans le besoin. Merci pour votre générosité, du Burundi ou de l'étranger.</p>
      <div class="acc">
        <div class="card">
          <h3>Mobile money (Burundi)</h3>
          <div class="row"><span>Lumicash</span><b><span class="todo">+257 XX XX XX XX</span></b><button class="cp" type="button" data-c="+257 XX XX XX XX">Copier</button></div>
          <div class="row"><span>Ecocash</span><b><span class="todo">+257 XX XX XX XX</span></b><button class="cp" type="button" data-c="+257 XX XX XX XX">Copier</button></div>
          <div class="row"><span>Nom du compte</span><b><span class="todo">EPG</span></b></div>
        </div>
        <div class="card">
          <h3>Compte bancaire</h3>
          <div class="row"><span>Banque</span><b><span class="todo">Nom de la banque</span></b></div>
          <div class="row"><span>Nom du compte</span><b><span class="todo">EPG</span></b></div>
          <div class="row"><span>Numéro</span><b><span class="todo">000000000000</span></b><button class="cp" type="button" data-c="000000000000">Copier</button></div>
        </div>
        <div class="card">
          <h3>Depuis l'étranger</h3>
          <div class="row"><span>Code SWIFT</span><b><span class="todo">XXXXBIXX</span></b><button class="cp" type="button" data-c="XXXXBIXX">Copier</button></div>
          <div class="row"><span>Devise</span><b><span class="todo">USD / EUR</span></b></div>
          <div class="row"><span>Indiquez en motif</span><b>Don pour l'église</b></div>
        </div>
      </div>
      <p class="note">Tous les numéros ci-dessus sont des exemples. Remplacez-les par les coordonnées officielles, au nom de l'église.</p>
      <p class="copy-status" aria-live="polite"></p>
    </section>`;

  return markup;
}
