/**
 * Build one contact card using the shared pastor/church/treasurer layout.
 * Update this template once when the structure of every contact card changes.
 * @param {string} title French card heading used as a translation-dictionary key.
 * @returns {string} HTML markup for one contact card.
 */
function renderContactCard(title) {
  const markup = /* html */ `
    <div class="card ct">
      <h3>${title}</h3>
      <div class="row"><span>Nom</span><b><span class="todo">Nom à compléter</span></b></div>
      <div class="row"><span>Téléphone</span><b><span class="todo">+257 XX XX XX XX</span></b></div>
      <a class="btn" href="https://wa.me/257XXXXXXXX" target="_blank" rel="noopener">WhatsApp</a>
      <a class="btn o" href="tel:+257XXXXXXXX">Appeler</a>
    </div>`;

  return markup;
}

/**
 * Build the contacts section and its three reusable contact cards.
 * Replace sample names, phone numbers, and wa.me/tel: destinations with approved details.
 * @returns {string} HTML markup for the contacts section.
 */
export function renderContacts() {
  const markup = /* html */ `
    <section id="contacts">
      <h2>Nous contacter</h2>
      <p class="lead">Écrivez-nous sur WhatsApp ou appelez-nous. Nous répondons avec plaisir.</p>
      <div class="acc">
        ${renderContactCard("Pasteur")}
        ${renderContactCard("EPG (église)")}
        ${renderContactCard("Trésorier (dons)")}
      </div>
      <p class="note">Remplacez les noms et numéros surlignés, puis le lien WhatsApp (wa.me/257 suivi du numéro).</p>
    </section>`;

  return markup;
}
