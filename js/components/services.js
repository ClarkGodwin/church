export function renderServices() {
  const markup = /* html */ `
    <section id="cultes">
      <h2>Nos cultes</h2>
      <p class="lead">Chaque semaine, nous prions, chantons et écoutons la Parole de Dieu ensemble. Tout le monde est bienvenu.</p>
      <div class="times">
        <div class="card">
          <h3>Culte du dimanche</h3>
          <div class="big"><span class="todo">08:00 – 11:30</span></div>
          <p>Louange, prédication, enfants, jeunes et adultes.</p>
        </div>
        <div class="card">
          <h3>Prière</h3>
          <div class="big"><span class="todo">Mercredi 17:00</span></div>
          <p>Prière pour l'église, les familles et le pays.</p>
        </div>
        <div class="card">
          <h3>Jeunesse et chorale</h3>
          <div class="big"><span class="todo">Samedi 15:00</span></div>
          <p>Répétition et partage pour les jeunes.</p>
        </div>
      </div>
      <div class="card place">
        <img src="./images/church_image.jpeg" alt="Le bâtiment de l'EPG avec sa tour vitrée et son toit rouge">
        <div>
          <h3>Où nous trouver</h3>
          <p>EPG<br>Bujumbura, Burundi<br><span class="todo">Rue / Avenue / Quartier : à compléter</span></p>
          <a class="btn" href="https://www.google.com/maps/search/?api=1&amp;query=Bujumbura+Burundi" target="_blank" rel="noopener">Voir sur la carte</a>
        </div>
      </div>
      <p class="note">Les horaires surlignés sont des exemples à remplacer.</p>
    </section>`;

  return markup;
}
