# EPG — site de l’église

Site vitrine statique et responsive pour l’EPG à Bujumbura. Le projet utilise du HTML, du CSS et des modules JavaScript natifs : aucun framework, outil de compilation ou installation de dépendances n’est nécessaire.

## Démarrer le site

Ouvrez la racine du projet avec un serveur HTTP local. Par exemple, avec l’extension **Live Server** de VS Code, ouvrez `index.html`, puis choisissez **Open with Live Server**.

Le site ne doit pas être ouvert en double-cliquant directement sur `index.html` (`file://`). Le navigateur bloque souvent les imports de modules JavaScript dans ce contexte. Un serveur local fournit une origine HTTP et permet aussi à l’API presse-papiers de fonctionner sur `localhost`.

Le site charge Google Fonts depuis Internet. Si ces polices ne sont pas disponibles, les polices système définies dans le CSS prennent le relais.

## Comment la page est construite

### 1. Point d’entrée HTML

`index.html` contient les métadonnées de la page, son titre, son icône, l’import du CSS et le conteneur vide :

```html
<main id="app"></main>
```

Il charge une seule feuille de style (`css/main.css`) et un seul module JavaScript (`js/main.js`). Le navigateur résout ensuite les imports CSS et JavaScript internes à ces fichiers.

### 2. Assemblage du HTML par JavaScript

`js/main.js` importe les fonctions `render…()` des composants. Chacune retourne une chaîne contenant le fragment HTML d’une partie de la page. Le balisage est écrit dans un template literal annoté `/* html */`, ce qui aide les éditeurs à afficher la coloration syntaxique HTML dans les fichiers JavaScript.

Les fragments sont concaténés dans `page`, puis insérés une fois dans `#app` avec `innerHTML`. L’ordre dans cette chaîne est l’ordre vertical de la page :

1. couverture et boutons de navigation ;
2. horaires des cultes et lieu ;
3. mission ;
4. galerie ;
5. prédications ;
6. dons ;
7. contacts ;
8. sélecteur de langue et pied de page.

Après l’insertion, `main.js` initialise le changement de langue et les boutons de copie. Il est donc important de ne pas initialiser ces comportements avant le rendu des composants : les éléments interactifs n’existent pas encore dans le DOM.

### 3. CSS

`css/main.css` est le point d’entrée CSS. Ses `@import` chargent les variables et styles de base, la mise en page, puis les styles des composants de couverture, des boutons et des contrôles. Chaque import est relatif à `css/main.css`.

Les composants JavaScript fournissent le contenu et les classes HTML ; les fichiers CSS définissent l’apparence de ces classes. Le responsive et les grilles sont principalement dans `css/layout.css`, la couverture dans `css/components/hero.css`, et le sélecteur de langue dans `css/components/controls.css`.

### 4. Modules JavaScript

| Fichier | Responsabilité |
| --- | --- |
| `js/main.js` | Assemble les composants et initialise les fonctionnalités. |
| `js/components/hero.js` | Couverture, citation et boutons d’accès aux sections. |
| `js/components/services.js` | Horaires et adresse / carte. |
| `js/components/mission.js` | Bloc de mission de l’église. |
| `js/components/gallery.js` | Photos et légendes de la galerie. |
| `js/components/sermons.js` | Liens vers la chorale et les prédications. |
| `js/components/giving.js` | Moyens de don et boutons de copie. |
| `js/components/contacts.js` | Cartes de contact ; la fonction privée `renderContactCard()` évite de répéter leur structure. |
| `js/components/footer.js` | Sélecteur de langue et pied de page. |
| `js/i18n/translations.js` | Chaînes anglaises et kirundi, textes alternatifs et métadonnées par langue. |
| `js/i18n/language-switcher.js` | Traduction du texte et des attributs, mise à jour des métadonnées et mémorisation de la langue. |
| `js/features/copy-to-clipboard.js` | Copie des coordonnées et message de résultat. |

## Modifier le contenu

### Texte, horaires et cartes

Le texte principal est écrit en français dans les fonctions `render…()` sous `js/components/`. Modifiez le texte à son emplacement plutôt que de modifier le HTML assemblé dans `main.js`. Par exemple :

- les horaires et le lien de la carte se trouvent dans `services.js` ;
- les boutons et leurs destinations se trouvent dans `hero.js` ;
- les coordonnées et valeurs à remplacer se trouvent dans `giving.js` et `contacts.js` ;
- les liens des chaînes vidéo se trouvent dans `sermons.js` ;
- l’adresse et le nom de l’église en pied de page se trouvent dans `footer.js`.

Les horaires, adresses, noms et numéros qui apparaissent surlignés sont des valeurs d’exemple : remplacez-les par les informations validées de l’église. Pour les liens WhatsApp, le format utilisé est `https://wa.me/257XXXXXXXX` et le numéro doit être remplacé par le numéro officiel au format international, sans espaces.

Les liens internes des boutons utilisent les `id` de sections (par exemple `#contacts` et `#dons`). Si vous changez un `id`, changez aussi les liens qui pointent vers celui-ci.

### Photos et autres ressources

Les photos du site résident dans `images/` :

- `worship_1.jpeg` est l’image de couverture et la première photo de la galerie ;
- `church_image.jpeg` illustre le lieu et sert aussi d’icône du site ;
- `worship_2.jpeg` est la seconde photo de la galerie.

Les images de contenu sont insérées dans les composants avec `<img>`. Pour en remplacer une, changez son chemin `src` et gardez un texte `alt` descriptif. La photo de couverture est une image CSS : son chemin se trouve dans `css/components/hero.css`. L’icône du navigateur est déclarée par `rel="icon"` dans `index.html`.

Pour ajouter une photo à la galerie, ajoutez un `<figure>` dans `gallery.js`, avec une image et une légende, puis complétez ses textes alternatifs dans les dictionnaires correspondants de `translations.js`.

## Modifier les traductions

### Langues disponibles et comportement initial

Le sélecteur propose :

- `kr` — kirundi, langue par défaut lorsqu’aucune préférence valide n’a été sauvegardée ;
- `fr` — français ;
- `en` — anglais.

Le sélecteur et ses codes de langue sont définis dans `footer.js` avec des boutons `data-l`. La langue choisie est enregistrée dans `localStorage` sous la clé `epg-lang`. Ainsi, une préférence existante est conservée entre les visites ; le kirundi s’applique aux nouveaux visiteurs et si la valeur enregistrée n’est pas reconnue.

### Ajouter ou corriger une chaîne

Le français est la langue source des composants. Le sélecteur parcourt les nœuds texte créés, conserve leur valeur source française, puis la remplace par la traduction correspondante. Les espaces situés autour des nœuds sont conservés.

Pour traduire un nouveau texte :

1. Ajoutez d’abord le texte français au composant concerné.
2. Ajoutez exactement ce texte comme clé dans `englishTranslations` et `kirundiTranslations` dans `translations.js`.
3. Vérifiez la traduction dans les trois langues.

Les clés sont comparées exactement après retrait des espaces de début et de fin. Respectez donc accents, apostrophes, ponctuation et espaces à l’intérieur de la phrase. Si une traduction manque, le texte français reste affiché : c’est un signal qu’il faut compléter le dictionnaire, pas une traduction automatique.

Les textes contenus dans un attribut HTML, comme `alt`, ne sont pas des nœuds texte. Traduisez-les séparément dans `englishAltText` et `kirundiAltText`, en utilisant comme clé la valeur `alt` française originale.

La balise `<html lang>`, le titre de l’onglet, la description SEO et les noms accessibles du sélecteur et de la navigation sont gérés dans `languageMetadata`. Quand vous ajoutez une autre langue, ajoutez son entrée de métadonnées et ses dictionnaires, ajoutez un bouton correspondant avec `data-l`, puis mettez à jour les langues acceptées par `language-switcher.js`.

## Interactions existantes

### Copie des coordonnées de don

Dans `giving.js`, un bouton de copie utilise `data-c` pour indiquer la valeur à copier. `copy-to-clipboard.js` lit cet attribut au clic, tente d’utiliser `navigator.clipboard`, et affiche le succès ou une instruction de copie manuelle dans `.copy-status`. Si vous ajoutez un bouton de copie, gardez la classe `.cp`, renseignez son attribut `data-c` et conservez un élément de statut `aria-live`.

### Sélecteur de langue

Les boutons `data-l="kr"`, `data-l="fr"` et `data-l="en"` du composant `footer.js` doivent correspondre aux clés de dictionnaires et de métadonnées. Le code `language-switcher.js` met à jour `aria-pressed` pour que l’état sélectionné reste accessible.

## Conseils de maintenance

- Gardez la structure HTML d’une section dans son composant et son style dans le fichier CSS qui correspond à cette section.
- Conservez le français dans les composants comme source canonique de traduction.
- Lorsqu’un texte visible ou un `alt` change, vérifiez les dictionnaires de traduction correspondants.
- Gardez les `id`, classes, attributs `data-*` et sélecteurs JavaScript synchronisés : ce sont les contrats entre composants, styles et comportements.
- Les fichiers utilisent les modules ES natifs (`import` / `export`) et des chemins relatifs. Si vous déplacez un module, mettez à jour ses importations.
- Évitez les dépendances entre composants : `main.js` orchestre leur assemblage, tandis que les composants se concentrent sur leur propre fragment HTML.
- Les préférences du navigateur et l’accès au presse-papiers peuvent être refusés. Les erreurs sont signalées dans la console et le bouton de copie affiche une solution manuelle.

## Validation après modification

Il n’y a pas de suite de tests automatisés configurée dans le projet. Après un changement :

1. Ouvrez la page via un serveur local.
2. Vérifiez les largeurs desktop et mobile, en particulier les boutons, grilles et cartes.
3. Testez les boutons FR, EN et KR, puis rechargez pour vérifier que la langue choisie est mémorisée.
4. Testez au moins un bouton de copie dans un contexte où l’API Clipboard est disponible.
5. Regardez la console du navigateur pour les erreurs JavaScript ou les ressources introuvables.

Pour vérifier rapidement la syntaxe JavaScript depuis la racine avec Node.js :

```sh
find js -name '*.js' -type f -exec node --check {} \;
```
