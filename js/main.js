/* Ristorante Pizzeria Venezia – Interaktion & Speisekarte */

document.documentElement.classList.remove('no-js');

// ---------- Intro / Mini-Trailer ----------
(function intro() {
  const film = document.getElementById('introFilm');
  if (!film || document.documentElement.classList.contains('no-intro')) return;

  document.body.classList.add('intro-active');
  try { sessionStorage.setItem('venezia-intro', '1'); } catch (e) {}

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    film.classList.add('done');
    document.body.classList.remove('intro-active');
    setTimeout(() => film.classList.add('gone'), 700);
  };

  const timer = setTimeout(finish, 1500);
  film.addEventListener('click', () => { clearTimeout(timer); finish(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') { clearTimeout(timer); finish(); }
  });
})();

// ---------- Speisekarte (Quelle: Speisekarte.pdf) ----------
// Jeder Eintrag: [Nr, Name, Beschreibung, Preis]  – Preis darf auch eine Liste von [Größe, Preis] sein.
// Optional pro Kategorie: bestseller: { img: "images/…jpg", name: "Gericht", text: "kurze Beschreibung" }
//   → erscheint als großes Foto über der Kategorie. Fotos bitte nur echte Fotos vom Restaurant.
const MENU = [
  {
    id: 'pizze', tab: 'Pizze', it: 'Le Nostre', de: 'Pizze',
    note: 'Alle unsere Pizzen werden mit Tomatensauce und Mozzarella belegt.',
    items: [
      [60, 'Pizza Margherita', 'Mit Basilikum', '8,90'],
      [61, 'Pizza Salami', 'Mit Salami', '9,90'],
      [62, 'Pizza Caprese', 'Mit Kirschtomaten, Büffelmozzarella und Rucola', '11,90'],
      [63, 'Pizza Prosciutto', 'Mit gekochtem Schinken', '9,90'],
      [64, 'Pizza Mista', 'Mit gekochtem Schinken, Salami, Peperoni und Champignons', '11,90'],
      [65, 'Pizza Vegetale', 'Mit frischem Gemüse', '11,90'],
      [66, 'Pizza Tonno', 'Thunfisch und Zwiebeln', '11,90'],
      [67, 'Pizza Pugliese', 'Scharfe Salami, Grana Padano und Rucola', '12,90'],
      [68, 'Pizza Venezia', 'Feigen, Ziegenkäse, Rucola und Bresaola', '13,90'],
      [69, 'Pizza Salmone', 'Frischer Lachs, Crème fraîche und Spinat', '13,90'],
      [70, 'Pizza Scampi', 'Großgarnelen, kleine Garnelen und Knoblauch', '13,90'],
      [71, 'Pizza Parma', 'Parmaschinken, Rucola und Grana-Padano-Flocken', '12,90'],
      [72, 'Pizza Valtellina', 'Bresaola, Gorgonzola und Birnen', '12,90'],
    ],
  },
  {
    id: 'pasta', tab: 'Pasta', it: 'Pasta', de: 'Nudelgerichte',
    items: [
      [43, 'Spaghetti Aglio, Olio e Peperoncino', 'Mit Knoblauch, Olivenöl und Peperoni (scharf)', '9,90'],
      [44, 'Spaghetti Napoli', 'Mit Tomatensauce und Basilikum', '9,90'],
      [45, 'Spaghetti Carbonara', 'Klassisch mit Schinken', '11,90'],
      [46, 'Spaghetti Bolognese', 'Mit Fleisch-Tomatensauce', '11,90'],
      [47, 'Pennette al Salmone', 'Mit frischem Lachs in leichter Hummersauce', '14,90'],
      [48, 'Pennette Puttanesca', 'Mit Oliven, Kapern, Knoblauch und Hähnchenbruststreifen in Tomatensauce', '12,90'],
      [49, 'Pennette Venezia', 'Kurze Nudeln mit Rinderfiletspitzen und frischen Champignons in Sahnesauce', '14,90'],
      [50, 'Tagliatelle Vegetale', 'Bandnudeln mit Gemüse der Saison', '12,90'],
      [51, 'Tagliatelle Gorgonzola', 'Bandnudeln mit Gorgonzola und Walnüssen', '13,90'],
      [52, 'Pappardelle del Castello', 'Breite Bandnudeln mit Birnen, Rosinen, Walnüssen und Pinienkernen in Butter-Salbeisauce, mit Grana Padano bestreut', '14,90'],
      [53, 'Pappardelle del Barone', 'Breite Bandnudeln mit Schweinefiletspitzen und frischen Champignons in Cognac-Sahnesauce', '14,90'],
      [54, 'Linguine al Limone', 'Mit Hähnchenbruststreifen, Knoblauch, Pinienkernen und Minze in Zitronensauce', '14,90'],
      [55, 'Linguine agli Scampi', 'Mit Garnelen und Knoblauch in leichter Tomatensauce', '15,90'],
      [56, 'Tortellini alla Panna', 'Teigtaschen mit Schinken in Sahnesauce', '11,90'],
      [57, 'Gnocchi alla Caprese', 'Kartoffelklößchen mit Mozzarella und Basilikum in Tomatensauce', '12,50'],
      [58, 'Lasagna al Forno', 'Schichtnudeln mit Fleischsauce, mit Mozzarella überbacken', '13,90'],
    ],
  },
  {
    id: 'antipasti', tab: 'Antipasti', it: 'Antipasti', de: 'Vorspeisen',
    items: [
      [30, 'Lumache', '6 Achatschnecken mit Weißwein und Kräuterbutter', '7,90'],
      [31, 'Mozzarella di Bufala su Rucola', 'Büffelmozzarella mit frischen Tomaten auf Rucolasalat', '11,90'],
      [32, 'Vitello Tonnato', 'Dünne Kalbfleischscheiben mit Thunfisch-Kapern-Crème', '11,90'],
      [33, 'Carpaccio di Manzo', 'Hauchdünne Scheiben vom rohen Rinderfilet mit frischen Champignons und Grana Padano', '12,90'],
      [34, 'Prosciutto e Melone', 'Parmaschinken mit Melone', '11,50'],
      [35, 'Antipasto all’Italiana', 'Verschiedener italienischer Aufschnitt', '14,50'],
    ],
  },
  {
    id: 'zuppe', tab: 'Zuppe & Insalate', it: 'Zuppe', de: '& Insalate',
    note: 'Alle Salate mit Öl & Essig, auf Wunsch auch mit Dressing.',
    items: [
      [20, 'Crema di Pomodoro', 'Tomatencremesuppe', '6,90'],
      [21, 'Minestrone', 'Gemüsesuppe', '6,90'],
      [22, 'Zuppa d’Aglio', 'Knoblauchsuppe mit Ei', '6,90'],
      [23, 'Crema di Broccoli', 'Brokkolicremesuppe', '6,90'],
      [36, 'Insalata Mista', 'Gemischter Salat', '8,90'],
      [37, 'Insalata Tonno', 'Gemischter Salat mit Thunfischstücken', '10,90'],
      [38, 'Insalata della Fattoria', 'Gebratene Hähnchenbruststreifen und frische Champignons auf gemischtem Salat', '12,90'],
      [40, 'Insalata Pomodori', 'Tomatensalat mit Zwiebeln', '7,90'],
      [41, 'Rucola alla Parmigiana', 'Rucolasalat mit Grana Padano und Cocktailtomaten', '11,50'],
      [42, 'Rucola alla Venezia', 'Rucolasalat mit frischem Lachs und Champignons', '14,90'],
    ],
  },
  {
    id: 'manzo', tab: 'Carne', it: 'Carne', de: 'Fleischgerichte',
    bestseller: { img: 'images/bistecca.jpg', name: 'Bistecca al Tartufo', text: 'Vom Grill, mit cremiger Trüffelsauce und hausgemachten Bandnudeln.' },
    note: 'Alle Fleischgerichte werden mit Tagesbeilage und Salat serviert.',
    items: [
      [110, 'Bistecca alla Griglia', 'Rumpsteak vom Grill mit Kräuterbutter', '25,90'],
      [111, 'Bistecca al Pepe Verde', 'Rumpsteak mit grüner Pfeffer-Sahnesauce', '27,90'],
      [112, 'Bistecca alla Gorgonzola', 'Rumpsteak mit Gorgonzola-Sahnesauce', '27,90'],
      [113, 'Bistecca ai Funghi', 'Rumpsteak mit frischer Champignon-Sahnesauce', '27,90'],
      [80, 'Scaloppa alla Milanese', 'Paniertes zartes Schweineschnitzel nach Wiener Art', '18,90'],
      [81, 'Scaloppa alla Bolognese', 'Paniertes Schweineschnitzel mit Fleischsauce, Schinken und Käse überbacken, dazu Spaghetti', '18,90'],
      [82, 'Maiale ai Funghi', 'Zarte Schweinefiletmedaillons mit frischen Champignons in Sahnesauce', '18,90'],
      [83, 'Maiale al Pepe Verde', 'Zarte Schweinefiletmedaillons mit grünem Pfeffer in Sahnesauce', '18,90'],
      [84, 'Maiale alla Gorgonzola', 'Zarte Schweinefiletmedaillons in Gorgonzola-Sahnesauce', '19,90'],
      [85, 'Maiale alla Venezia', 'Zarte Schweinefiletmedaillons mit gebratenen Artischocken und Schinken in Sahnesauce', '18,90'],
      [86, 'Saltimbocca alla Romana', 'Zarte Schweinefiletmedaillons mit Parmaschinken und Salbei in Weißweinsauce', '18,90'],
      [90, 'Fegato Venezia', 'Geschnetzelte Kalbsleber nach venezianischer Art mit Zwiebeln in feiner Sauce', '18,90'],
      [91, 'Fegato alla Cipolla', 'Gegrillte Kalbsleber mit gerösteten Zwiebeln', '18,90'],
      [92, 'Fegato al Burro', 'Gebratene Kalbsleber in Butter-Salbeisauce', '18,90'],
      [100, 'Pollo al Pepe Verde', 'Hähnchenbrustfilet in grüner Pfeffer-Sahnesauce, dazu Bandnudeln', '17,90'],
      [101, 'Pollo ai Funghi', 'Hähnchenbrustfilet in frischer Champignon-Sahnesauce, dazu Bandnudeln', '17,90'],
      [102, 'Pollo al Gorgonzola', 'Hähnchenbrustfilet in Gorgonzolasauce, dazu Bandnudeln', '19,90'],
    ],
  },
  {
    id: 'pesce', tab: 'Pesce', it: 'Pesce', de: 'Fischgerichte',
    note: 'Alle Fischgerichte werden mit Tagesbeilage und Salat serviert.',
    items: [
      [120, 'Salmone alle Verdure', 'Lachsfilet vom Grill auf Gemüsebett', '20,90'],
      [121, 'Salmone Venezia', 'Lachsfilet mit Shrimps, Knoblauch und Dill in leichter Hummer-Sahnesauce', '22,90'],
      [122, 'Luccio alle Erbe', 'Zanderfilet mit Kräutern in Weißweinsauce', '23,90'],
      [123, 'Luccio alla Livornese', 'Zanderfilet mit Oliven, Kapern und Knoblauch in Tomatensauce, dazu Bandnudeln', '24,90'],
      [124, 'Scampi alla Griglia', 'Großgarnelenschwänze vom Grill', '25,90'],
      [125, 'Scampi al Pepe Verde', 'Großgarnelenschwänze in Pfeffer-Sahnesauce', '26,90'],
      [125, 'Scampi al Forno', 'Großgarnelenschwänze in Olivenöl und Knoblauch im Ofen gebacken', '26,90'],
    ],
  },
  {
    id: 'dolci', tab: 'Dolci', it: 'Dolci', de: 'Desserts',
    items: [
      [130, 'Tiramisù', 'Hausgemacht, täglich frisch', '6,90'],
      [131, 'Panna Cotta', 'Sahnedessert mit heißen Himbeeren', '7,90'],
      [132, 'Gelato Misto', 'Gemischtes Eis', '7,90'],
      [133, 'Cassata alla Siciliana', 'Sizilianische Eisspezialität mit kandierten Früchten', '7,90'],
      [134, 'Tartufo Classico', '', '7,90'],
      [135, 'Lamponi Caldi', 'Heiße Himbeeren mit Vanilleeis', '8,90'],
      [135, 'Fichi Caldi', 'Heiße Feigen mit grünem Pfeffer, Vanilleeis und Sahne', '8,90'],
    ],
  },
  {
    id: 'vini', tab: 'Vini & Birre', it: 'Vini', de: '& Birre',
    items: [
      [200, 'Bianco della Casa', 'Weißwein, trocken', [['0,2 l', '6,90'], ['0,5 l', '12,90']]],
      [202, 'Rosé della Casa', 'Roséwein, trocken', [['0,2 l', '6,90'], ['0,5 l', '12,90']]],
      [204, 'Rosso della Casa', 'Rotwein, trocken', [['0,2 l', '6,90'], ['0,5 l', '12,90']]],
      [206, 'Lambrusco', 'Roter Perlwein, lieblich', [['0,2 l', '6,50'], ['0,5 l', '12,50']]],
      [208, 'Weinschorle', 'Rot oder weiß', [['0,2 l', '6,50'], ['0,5 l', '12,50']]],
      [210, 'Warsteiner', 'Vom Fass', [['0,3 l', '3,90'], ['0,4 l', '4,60']]],
      [212, 'König Ludwig Hefe', 'Naturtrüb vom Fass', [['0,3 l', '4,20'], ['0,5 l', '4,90']]],
      [213, 'König Ludwig Hefe alkoholfrei', '', [['Fl. 0,5 l', '4,90']]],
      [214, 'König Ludwig Dunkles Hefe', '', [['Fl. 0,5 l', '4,90']]],
      [215, 'König Ludwig Kristallweizen', '', [['Fl. 0,5 l', '4,90']]],
      [216, 'König Ludwig Schwarzbier', '', [['Fl. 0,5 l', '4,90']]],
      [217, 'Warsteiner alkoholfrei', '', [['Fl. 0,33 l', '3,90']]],
      [218, 'Berliner Weiße', 'Rot oder grün', [['Fl. 0,33 l', '3,90']]],
      [219, 'Radler', 'Mit Sprite, Fassbrause oder Fanta', [['0,3 l', '3,50'], ['0,4 l', '4,50']]],
    ],
  },
  {
    id: 'bevande', tab: 'Bevande', it: 'Aperitivi', de: '& Bevande',
    items: [
      [1, 'Martini', 'Bianco, Rosso oder Dry', [['5 cl', '5,50']]],
      [2, 'Cynar Soda', '', [['4 cl', '6,50']]],
      [3, 'Campari', 'Soda oder Orange', [['0,2 l', '5,90']]],
      [4, 'Prosecco', 'Italienischer Schaumwein, trocken', [['0,1 l', '4,90']]],
      [5, 'Hugo', 'Prosecco mit Holundersirup und Minze', [['0,2 l', '6,90']]],
      [6, 'Aperol Spritz', 'Aperol mit Prosecco und Mineralwasser', [['0,2 l', '6,90']]],
      [7, 'Sanbitter', 'Alkoholfreier Aperitif', [['0,1 l', '4,90']]],
      [8, 'Sanbitter Orange', 'Alkoholfreier Aperitif mit Orangensaft', [['0,2 l', '5,90']]],
      ['', 'Espresso', '', '2,90'],
      ['', 'Espresso Doppio', '', '3,90'],
      ['', 'Caffè', '', '3,90'],
      ['', 'Latte Macchiato', '', '4,90'],
      ['', 'Cappuccino', '', '3,90'],
      ['', 'Tee', 'Verschiedene Sorten', '3,50'],
      ['', 'Coca-Cola, Cola Light, Fanta, Sprite', '', [['0,2 l', '2,90'], ['0,4 l', '4,90']]],
      ['', 'Fassbrause, Spezi, Apfelschorle', '', [['0,2 l', '2,90'], ['0,4 l', '4,90']]],
      ['', 'Apfelsaft, Orangensaft', '', [['0,2 l', '2,50']]],
      ['', 'Bananennektar, Kirschnektar', '', [['0,2 l', '3,50']]],
      ['', 'San Pellegrino', 'Italienisches Mineralwasser', [['0,25 l', '2,90'], ['0,75 l', '6,90']]],
      ['', 'Acqua Panna', 'Stilles italienisches Mineralwasser', [['0,25 l', '2,90'], ['0,75 l', '6,90']]],
      ['', 'Schweppes', 'Tonic Water, Ginger Ale, Bitter Lemon', [['0,25 l', '3,50']]],
      ['', 'Kraftmalz', 'Malztrunk', [['0,33 l', '3,90']]],
    ],
  },
];

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function priceHtml(p) {
  if (!Array.isArray(p)) return `<span class="menu-price">${p} €</span>`;
  return p.map(([size, val]) => `<span class="menu-price"><span class="menu-size">${size}</span> ${val} €</span>`).join('');
}

function renderCategory(cat) {
  const items = cat.items.map(([no, name, desc, price]) => `
    <li class="menu-item">
      <div class="menu-line">
        <span class="menu-no">${no}</span>
        <span class="menu-name">${esc(name)}</span>
        <span class="menu-dots"></span>
        ${priceHtml(price)}
      </div>
      ${desc ? `<p class="menu-desc">${esc(desc)}</p>` : ''}
    </li>`).join('');

  const b = cat.bestseller;
  const best = b ? `
    <figure class="menu-best">
      <img src="${b.img}" alt="${esc(b.name)}" loading="lazy">
      <figcaption>
        <span class="menu-best-label">Unser Bestseller</span>
        <span class="menu-best-name">${esc(b.name)}</span>
        ${b.text ? `<span class="menu-best-text">${esc(b.text)}</span>` : ""}
      </figcaption>
    </figure>` : "";

  return `
    ${best}
    <div class="menu-cat-head">
      <h3 class="menu-cat-title"><em>${esc(cat.it)}</em> ${esc(cat.de)}</h3>
      ${cat.note ? `<p class="menu-cat-note">${esc(cat.note)}</p>` : ''}
    </div>
    <ul class="menu-list">${items}</ul>`;
}

const tabsEl = document.getElementById('menuTabs');
const panelEl = document.getElementById('menuPanel');

function showCategory(id) {
  const cat = MENU.find((c) => c.id === id) || MENU[0];
  tabsEl.querySelectorAll('.menu-tab').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.id === cat.id)));
  panelEl.innerHTML = renderCategory(cat);
  panelEl.classList.remove('fade');
  void panelEl.offsetWidth; // Animation neu starten
  panelEl.classList.add('fade');
}

tabsEl.innerHTML = MENU.map((c) => `<button class="menu-tab" role="tab" data-id="${c.id}">${esc(c.tab)}</button>`).join('');
tabsEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.menu-tab');
  if (btn) showCategory(btn.dataset.id);
});
showCategory('pizze');

document.querySelectorAll('[data-tab]').forEach((a) => {
  a.addEventListener('click', () => showCategory(a.dataset.tab));
});

// ---------- Header & mobiles Menü ----------
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const toggle = document.getElementById('navToggle');
toggle.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
});
document.querySelectorAll('#nav a').forEach((a) => a.addEventListener('click', () => {
  document.body.classList.remove('nav-open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// ---------- Scroll-Animation ----------
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

// ---------- Galerie-Lightbox ----------
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
document.querySelectorAll('.g-item').forEach((btn) => btn.addEventListener('click', () => {
  lbImg.src = btn.dataset.full;
  lbImg.alt = btn.querySelector('img').alt;
  lb.hidden = false;
}));
const closeLb = () => { lb.hidden = true; lbImg.src = ''; };
document.getElementById('lbClose').addEventListener('click', closeLb);
lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lb.hidden) closeLb(); });

// ---------- Öffnungszeiten: heute markieren ----------
(function openStatus() {
  const now = new Date();
  const row = document.querySelector(`#hours tr[data-day="${now.getDay()}"]`);
  if (row) row.classList.add('today');
  const mins = now.getHours() * 60 + now.getMinutes();
  const open = mins >= 12 * 60 && mins < 23 * 60;
  document.getElementById('openStatus').innerHTML = open
    ? '<strong>Jetzt geöffnet</strong> – bis 23 Uhr'
    : 'Derzeit geschlossen – <strong>ab 12 Uhr</strong> wieder für Sie da';
})();

// ---------- Reservierung (öffnet E-Mail-Programm) ----------
const form = document.getElementById('reserveForm');
const hint = document.getElementById('formHint');
const dateInput = document.getElementById('r-date');
dateInput.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('[required]').forEach((el) => {
    const bad = !el.value.trim() || !el.checkValidity();
    el.closest('.field').classList.toggle('invalid', bad);
    if (bad) ok = false;
  });
  if (!ok) {
    hint.textContent = 'Bitte füllen Sie die markierten Felder aus.';
    hint.classList.add('error');
    return;
  }
  hint.classList.remove('error');
  hint.textContent = 'Ihr E-Mail-Programm öffnet sich mit der fertigen Anfrage.';

  const d = Object.fromEntries(new FormData(form));
  const datum = new Date(d.date + 'T00:00').toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
  const body = [
    'Guten Tag,',
    '',
    'ich möchte gern einen Tisch reservieren:',
    '',
    `Name: ${d.name}`,
    `Datum: ${datum}`,
    `Uhrzeit: ${d.time} Uhr`,
    `Personen: ${d.guests}`,
    `Telefon: ${d.phone}`,
    d.note ? `Anmerkung: ${d.note}` : '',
    '',
    'Vielen Dank!',
  ].join('\n');
  const subject = `Reservierung ${datum}, ${d.time} Uhr – ${d.guests} Pers.`;
  window.location.href = `mailto:ristorante.venezia@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
