/* Northline Coffee: Bean Guide tab.
   All the guide's content lives in the data below; the page is built from it.
   Plain script (no modules) so the site still opens by double-clicking index.html. */
(function () {
  'use strict';

  /* ================= DATA ================= */

  var REGIONS = {
    africa:  { label: 'Africa and Yemen',
               countries: 'Ethiopia, Kenya, Rwanda, Burundi, Uganda, Tanzania, Yemen',
               note: "Arabica's home ground. Bright, floral, and fruity coffees. Uganda also grows a lot of robusta." },
    central: { label: 'Central America and Caribbean',
               countries: 'Guatemala, Honduras, El Salvador, Costa Rica, Panama, Nicaragua, Mexico, Jamaica',
               note: 'Mostly washed and honey coffees. Clean, sweet, and balanced.' },
    south:   { label: 'South America',
               countries: 'Brazil, Colombia, Peru, Ecuador, Bolivia',
               note: "Brazil is the world's largest producer: nutty, chocolatey, often natural. Colombia is known for clean, bright washed coffee." },
    asia:    { label: 'Asia and Pacific',
               countries: 'Vietnam, Indonesia, India, Papua New Guinea, Yunnan (China), Hawaii',
               note: "Vietnam grows more robusta than anywhere. Indonesia's wet-hulled coffees are earthy and heavy." }
  };

  var FAMILIES = {
    landrace: 'Ethiopian landrace',
    typica:   'Typica line',
    bourbon:  'Bourbon line',
    cross:    'Typica and Bourbon cross',
    hybrid:   'Arabica and robusta hybrid'
  };

  var SPECIES = [
    {
      name: 'Arabica', latin: 'Coffea arabica', share: 'A little under 60 percent of the world’s coffee',
      grows: 'High and cool, roughly 1,000 to 2,200 meters. Native to the highlands of southwest Ethiopia.',
      taste: 'Sweeter, brighter, and far more varied. Every variety in this guide is arabica.'
    },
    {
      name: 'Robusta', latin: 'Coffea canephora', share: 'About 40 percent, and rising',
      grows: 'Low and hot. Native to west and central Africa. Vietnam, Brazil, Indonesia, and Uganda grow the most.',
      taste: 'Bitter, woody, and chocolatey with heavy body and about twice the caffeine of arabica. Common in espresso blends and instant coffee.'
    },
    {
      name: 'Liberica and excelsa', latin: 'Coffea liberica and C. dewevrei', share: 'A small share, a percent or two',
      grows: 'Low and hot. Native to west and central Africa. Grown mostly in the Philippines, Malaysia, and Indonesia.',
      taste: 'Big, lopsided beans. Smoky and woody, sometimes with a ripe jackfruit note. Excelsa was long counted as a type of liberica. A 2025 genetic study split it back into its own species.'
    }
  ];

  var TIMELINE = [
    { when: 'Where it starts', place: 'Ethiopia', text: 'Arabica grows wild in the forests of southwest Ethiopia. Most of its genetic diversity is still there.' },
    { when: '1400s on', place: 'Yemen', text: 'Yemen turned coffee into a farmed crop and shipped it out through the port of Mocha.' },
    { when: '1600s and 1700s', place: 'Java and Réunion', text: 'Seeds left Yemen in two lines: Typica, by way of India and Java, and Bourbon, by way of Réunion.' },
    { when: '1700s to today', place: 'The coffee belt', text: 'Those two lines reached Latin America, Africa, and Asia. Later crosses, bred for yield and disease resistance, joined them.' }
  ];

  /* Each variety: where it grows (regions = filter keys), a little history, and what it means
     for the cup, the roast, and the brew. "brew" picks the Grind Tool link. */
  var VARIETIES = [
    {
      name: 'Ethiopian landraces', aka: 'Often labeled heirloom', family: 'landrace', regions: ['africa'],
      grown: 'Ethiopia: Yirgacheffe, Sidama, Guji, Jimma, Harrar',
      story: 'Thousands of local types grow wild and in garden plots, so bags often just say heirloom. Many are numbered selections from the Jimma research center, like 74110 and 74112.',
      taste: 'Floral and citrus: jasmine, lemon, bergamot. Tea-like when washed, blueberry when natural.',
      roast: 'Light. A dark roast buries what makes them special.',
      brew: { roast: 'light', method: 'pourover' }
    },
    {
      name: 'Gesha', aka: 'Also spelled Geisha', family: 'landrace', regions: ['central', 'south', 'africa'],
      grown: 'Panama, Colombia, Costa Rica, Ethiopia, and a growing list',
      story: 'Collected near Gori Gesha in southwest Ethiopia in the 1930s, then passed through research stations in Tanzania and Costa Rica before reaching Panama. It went mostly unnoticed until 2004, when a Panamanian lot won a national competition by a wide margin.',
      taste: 'Jasmine, bergamot, peach, honey. Very clean, with a light, tea-like body.',
      roast: 'As light as the roaster dares. It is delicate and easy to overshoot.',
      brew: { roast: 'light', method: 'pourover' }
    },
    {
      name: 'Java', aka: '', family: 'landrace', regions: ['africa', 'central'],
      grown: 'Cameroon, Costa Rica, Panama',
      story: 'An Ethiopian landrace line that went to Java with Dutch collectors, then to Cameroon and Central America. Valued in Cameroon for partial tolerance to coffee berry disease.',
      taste: 'Delicate and floral with a tea-like body. Sometimes grown as a hardier alternative to gesha.',
      roast: 'Light.',
      brew: { roast: 'light', method: 'pourover' }
    },
    {
      name: 'Pink Bourbon', aka: '', family: 'landrace', regions: ['south'],
      grown: 'Colombia, especially Huila',
      story: 'Named for its pink cherries. Despite the name, genetic tests so far point to Ethiopian landrace roots rather than bourbon.',
      taste: 'Floral, red fruit, citrus, and very sweet.',
      roast: 'Light.',
      brew: { roast: 'light', method: 'pourover' }
    },
    {
      name: 'Sidra', aka: '', family: 'landrace', regions: ['south'],
      grown: 'Ecuador and Colombia',
      story: 'Long described as a bourbon and typica cross from Ecuador. Genetic tests suggest an Ethiopian landrace type instead, though trees sold as Sidra may vary.',
      taste: 'Floral and fruity: jasmine, stone fruit, a little spice.',
      roast: 'Light.',
      brew: { roast: 'light', method: 'aeropress' }
    },
    {
      name: 'Typica', aka: '', family: 'typica', regions: ['central', 'south', 'asia'],
      grown: 'Peru, Jamaica, Hawaii (Kona), Indonesia, Papua New Guinea',
      story: 'One of the two lines that left Yemen. Dutch traders took it to Java around 1700, and from there it reached Amsterdam, the Caribbean, and Latin America.',
      taste: 'Clean and sweet, mild acidity, medium body.',
      roast: 'Light to medium. It also yields little and catches leaf rust easily, which is why many farms replaced it.',
      brew: { roast: 'medium', method: 'pourover' }
    },
    {
      name: 'Bourbon', aka: 'Red, yellow, and orange types', family: 'bourbon', regions: ['africa', 'central', 'south'],
      grown: 'Rwanda, Burundi, El Salvador, Guatemala, Brazil',
      story: 'The other line out of Yemen. French missionaries planted it on Île Bourbon, now Réunion, in the early 1700s. It reached Brazil and East Africa in the 1800s.',
      taste: 'Sweet and round: caramel, red apple, a little citrus. More body than typica.',
      roast: 'Light to medium.',
      brew: { roast: 'medium', method: 'pourover' }
    },
    {
      name: 'Caturra', aka: '', family: 'bourbon', regions: ['central', 'south'],
      grown: 'Colombia, Costa Rica, Honduras, Nicaragua',
      story: 'A natural dwarf mutation of bourbon found in Brazil around 1915 to 1918. Short trees fit closer together, so it spread fast through Central America and Colombia.',
      taste: 'Bright and citrusy, with a lighter body than bourbon.',
      roast: 'Light to medium.',
      brew: { roast: 'medium', method: 'drip' }
    },
    {
      name: 'SL28', aka: 'A Kenyan selection', family: 'bourbon', regions: ['africa'],
      grown: 'Kenya, Uganda, Malawi, Zimbabwe',
      story: 'Selected in the 1930s by Scott Agricultural Laboratories in Kenya from bourbon-type trees from Tanzania, picked for flavor and drought tolerance.',
      taste: 'Juicy and sharp: blackcurrant, grapefruit, a savory tomato note. Big acidity.',
      roast: 'Light, to keep that acidity lively.',
      brew: { roast: 'light', method: 'aeropress' }
    },
    {
      name: 'SL34', aka: 'A Kenyan selection', family: 'typica', regions: ['africa'],
      grown: 'Kenya',
      story: 'Selected by the same lab from a tree on Loresho Estate that was thought to be bourbon. Genetic tests place it closer to typica.',
      taste: 'Bright and juicy, much like SL28. The two are usually grown and sold together.',
      roast: 'Light.',
      brew: { roast: 'light', method: 'aeropress' }
    },
    {
      name: 'Mundo Novo', aka: '', family: 'cross', regions: ['south'],
      grown: 'Brazil',
      story: 'A natural cross of typica and bourbon found in Brazil in the 1940s. Tall, hardy, and productive.',
      taste: 'Chocolate and nuts, low acidity, full body.',
      roast: 'Medium. Holds up well in espresso blends.',
      brew: { roast: 'medium', method: 'frenchpress' }
    },
    {
      name: 'Catuaí', aka: 'Red and yellow types', family: 'cross', regions: ['south', 'central'],
      grown: 'Brazil, Honduras, Costa Rica',
      story: 'Bred in Brazil by crossing mundo novo with caturra: compact like caturra, sturdy like mundo novo.',
      taste: 'Mild and sweet: nuts, milk chocolate, gentle acidity.',
      roast: 'Medium.',
      brew: { roast: 'medium', method: 'drip' }
    },
    {
      name: 'Pacamara', aka: '', family: 'cross', regions: ['central'],
      grown: 'El Salvador, Guatemala, Nicaragua, Honduras',
      story: 'Bred in El Salvador from pacas, a bourbon mutation, and maragogipe, a giant typica mutation. The beans are huge.',
      taste: 'Hard to predict: anything from herbal and savory to tropical fruit and chocolate. Creamy body.',
      roast: 'Light to medium. Big beans roast unevenly if rushed.',
      brew: { roast: 'medium', method: 'pourover' }
    },
    {
      name: 'Castillo', aka: '', family: 'hybrid', regions: ['south'],
      grown: 'Colombia',
      story: "Released by Colombia's coffee research center in 2005 to resist leaf rust. It descends from caturra crossed with Timor Hybrid, selected over several generations. It now covers a large share of Colombian farms.",
      taste: 'Clean, citrusy, medium body. Close to caturra in the cup when it is grown and processed well.',
      roast: 'Medium.',
      brew: { roast: 'medium', method: 'drip' }
    },
    {
      name: 'Catimor and Sarchimor', aka: '', family: 'hybrid', regions: ['asia', 'central', 'south'],
      grown: 'Honduras, Vietnam, Yunnan, Laos, India, Indonesia',
      story: 'Crosses of caturra or villa sarchi with Timor Hybrid, a natural arabica and robusta cross found on the island of Timor. Bred for leaf rust resistance and yield.',
      taste: 'Heavier body, lower acidity, sometimes woody or bitter. Much better from high farms with careful processing.',
      roast: 'Medium to dark.',
      brew: { roast: 'dark', method: 'frenchpress' }
    }
  ];

  /* Where each variety grows, by map pin name. Kept next to the cards so the map and
     the "grown" lines on the cards say the same thing. */
  var VARIETY_COUNTRIES = {
    'Ethiopian landraces': ['Ethiopia'],
    'Gesha': ['Panama', 'Colombia', 'Costa Rica', 'Ethiopia'],
    'Java': ['Cameroon', 'Costa Rica', 'Panama'],
    'Pink Bourbon': ['Colombia'],
    'Sidra': ['Ecuador', 'Colombia'],
    'Typica': ['Peru', 'Jamaica', 'Hawaii', 'Indonesia', 'Papua New Guinea'],
    'Bourbon': ['Rwanda', 'Burundi', 'El Salvador', 'Guatemala', 'Brazil'],
    'Caturra': ['Colombia', 'Costa Rica', 'Honduras', 'Nicaragua'],
    'SL28': ['Kenya', 'Uganda', 'Malawi', 'Zimbabwe'],
    'SL34': ['Kenya'],
    'Mundo Novo': ['Brazil'],
    'Catuaí': ['Brazil', 'Honduras', 'Costa Rica'],
    'Pacamara': ['El Salvador', 'Guatemala', 'Nicaragua', 'Honduras'],
    'Castillo': ['Colombia'],
    'Catimor and Sarchimor': ['Honduras', 'Vietnam', 'Yunnan', 'Laos', 'India', 'Indonesia']
  };
  VARIETIES.forEach(function (v) { v.countries = VARIETY_COUNTRIES[v.name] || []; });

  function slug(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  /* Meters run 1 to 5. */
  var PROCESSES = [
    {
      name: 'Washed', aka: 'Wet process', short: 'Clean', where: 'Colombia, Kenya, Central America, much of Ethiopia',
      how: [
        'Pulp off the skin.',
        'Soak the beans in tanks for 12 to 72 hours so the sticky fruit layer (mucilage) breaks down.',
        'Wash that layer off.',
        'Dry the beans for one to three weeks.'
      ],
      taste: 'Clean and bright. You taste the variety and the place it grew, not the fruit around it.',
      meters: { Clarity: 5, Body: 2, Sweetness: 3, 'Fruit and funk': 1 },
      roast: 'Roasts evenly and predictably. Light to medium shows it best.',
      brewNote: 'Pour-over and drip. A paper filter keeps it clear.',
      brew: { roast: 'light', method: 'pourover' }
    },
    {
      name: 'Natural', aka: 'Dry process', short: 'Fruity', where: 'Ethiopia, Brazil, Yemen',
      how: [
        'Dry the whole cherry, fruit and all, on patios or raised beds for two to six weeks.',
        'Turn it often so it dries evenly and doesn’t rot.',
        'Hull off the dried fruit.'
      ],
      taste: 'Fruity and sweet: blueberry, strawberry, red wine. Heavier body. Done badly, it tastes muddy or boozy.',
      meters: { Clarity: 2, Body: 4, Sweetness: 4, 'Fruit and funk': 4 },
      roast: 'More sugar on the bean means it browns faster. Roast gently. A dark roast turns the fruit to smoke.',
      brewNote: 'AeroPress or French press for body. Pour-over for the fruit.',
      brew: { roast: 'medium', method: 'aeropress' }
    },
    {
      name: 'Honey', aka: 'Pulped natural', short: 'Sweet', where: 'Costa Rica, El Salvador, Brazil',
      how: [
        'Pulp off the skin.',
        'Leave some or all of the sticky mucilage on the bean.',
        'Dry it like that. Yellow, red, and black honey usually mean more mucilage and slower drying, in that order, though farms use the names differently.'
      ],
      taste: 'Between washed and natural: syrupy, sweet, and round, with some fruit.',
      meters: { Clarity: 3, Body: 3, Sweetness: 5, 'Fruit and funk': 2 },
      roast: 'Browns a little faster than washed. Medium-light suits it.',
      brewNote: 'Any method.',
      brew: { roast: 'medium', method: 'pourover' }
    },
    {
      name: 'Wet-hulled', aka: 'Giling basah', short: 'Earthy', where: 'Sumatra and Sulawesi, Indonesia',
      how: [
        'Pulp the cherry, ferment it overnight, wash it, and dry it partway.',
        'Strip off the parchment shell while the bean is still wet, at roughly 30 to 50 percent moisture.',
        'Finish drying the bare bean. It’s fast, which suits a rainy climate.'
      ],
      taste: 'Earthy, herbal, cedar, spice. Heavy body, low acidity.',
      meters: { Clarity: 1, Body: 5, Sweetness: 3, 'Fruit and funk': 2 },
      roast: 'Holds up to medium-dark and dark roasts.',
      brewNote: 'French press and cold brew.',
      brew: { roast: 'dark', method: 'frenchpress' }
    },
    {
      name: 'Anaerobic', aka: 'Oxygen-free fermentation', short: 'Wild', where: 'Colombia, Costa Rica, Panama, increasingly everywhere',
      how: [
        'Seal cherries or pulped beans in tanks with little or no oxygen.',
        'Let them ferment for one to several days, watching temperature and acidity.',
        'Dry them as a washed or natural coffee.'
      ],
      taste: 'Intense and unusual: tropical fruit, cinnamon, rum, yogurt. People tend to love it or hate it.',
      meters: { Clarity: 2, Body: 4, Sweetness: 4, 'Fruit and funk': 5 },
      roast: 'Light. These flavors fade quickly as the roast goes darker.',
      brewNote: 'Pour-over, so the aromatics come through.',
      brew: { roast: 'light', method: 'pourover' }
    },
    {
      name: 'Carbonic maceration', aka: 'Borrowed from winemaking', short: 'Winey', where: 'Mostly specialty farms in Latin America',
      how: [
        'Put whole cherries in a sealed tank flushed with carbon dioxide.',
        'Fermentation happens inside the intact fruit.',
        'Dry them, usually as a natural.'
      ],
      taste: 'Juicy and winey: red grape, cherry. Surprisingly clean for how fruity it is.',
      meters: { Clarity: 3, Body: 3, Sweetness: 4, 'Fruit and funk': 4 },
      roast: 'Light.',
      brewNote: 'Pour-over.',
      brew: { roast: 'light', method: 'pourover' }
    },
    {
      name: 'Lactic', aka: 'An anaerobic variation', short: 'Creamy', where: 'Colombia, Costa Rica, Panama',
      how: [
        'Ferment without oxygen, steering conditions to favor lactic acid bacteria.',
        'Lactic acid is the same acid that sours yogurt.',
        'Dry as usual.'
      ],
      taste: 'Creamy and round: yogurt, ripe fruit, soft acidity.',
      meters: { Clarity: 3, Body: 4, Sweetness: 4, 'Fruit and funk': 3 },
      roast: 'Light to medium.',
      brewNote: 'AeroPress or pour-over.',
      brew: { roast: 'light', method: 'aeropress' }
    },
    {
      name: 'Co-fermented', aka: 'Sometimes called infused', short: 'Flavored', where: 'Mostly Colombia',
      how: [
        'Something else goes in the fermentation tank: fruit, spices, wine yeast, or juice saved from an earlier batch (called mosto).',
        'The coffee picks up those flavors.',
        'Dry as usual.'
      ],
      taste: 'Tastes like what went in: strawberry, passion fruit, cinnamon. Big, obvious, sometimes candy-like.',
      meters: { Clarity: 1, Body: 3, Sweetness: 5, 'Fruit and funk': 5 },
      roast: 'Light.',
      brewNote: 'Pour-over or cold brew. Some coffees sold this way have flavoring added after processing. Good producers say exactly what went in.',
      brew: { roast: 'light', method: 'coldbrew' }
    }
  ];

  /* The parts of a coffee cherry, outside in. "at" is where the label's leader line
     touches the part in the drawing, and "y" is the label's row. */
  var CHERRY_PARTS = [
    {
      id: 'skin', name: 'Skin', aka: 'Exocarp', at: [184, 35],
      what: 'The thin outer skin. It turns from green to red, or yellow in some varieties, as the cherry ripens. Pickers judge ripeness by its color.',
      process: 'Pulped off right away in washed and honey coffee. In a natural it stays on and dries with the fruit.',
      links: ['Washed', 'Natural']
    },
    {
      id: 'pulp', name: 'Pulp', aka: 'Mesocarp', at: [191, 65],
      what: 'The sweet, juicy fruit flesh, a bit like a grape. Some farms dry it and sell it as cascara, a fruity tea.',
      process: 'Comes off with the skin in washed and honey coffee. In a natural it dries around the bean, which is where the fruity flavor comes from.',
      links: ['Natural', 'Honey']
    },
    {
      id: 'mucilage', name: 'Mucilage', aka: 'The sticky fruit layer', at: [192, 95],
      what: 'A slippery, sugary layer clinging to the parchment. It doesn’t rinse off easily, so farms let it ferment first.',
      process: 'Fermented and washed away in washed coffee. Left on, in part or in full, in honey coffee, which is why honeys taste syrupy. Anaerobic and lactic ferments work on this layer.',
      links: ['Washed', 'Honey', 'Anaerobic']
    },
    {
      id: 'parchment', name: 'Parchment', aka: 'Endocarp', at: [189, 125],
      what: 'A thin, papery shell around each bean. It protects the bean while it dries and rests.',
      process: 'Most coffee dries inside its parchment, which is hulled off before the coffee is shipped. Wet-hulled coffee loses it early, while still wet, which is behind its earthy taste.',
      links: ['Wet-hulled']
    },
    {
      id: 'silverskin', name: 'Silver skin', aka: 'Seed coat', at: [179, 155],
      what: 'A very thin, shiny skin stuck to the bean itself.',
      process: 'Most of it flakes off during roasting as chaff. A little stays tucked in the fold of the center cut.',
      links: []
    },
    {
      id: 'bean', name: 'Bean', aka: 'The seed', at: [147, 185],
      what: 'The seed, and the part that gets roasted. Most cherries hold two, lying flat side to flat side, which is why the drawing shows two halves. Each bean has a fold down its flat side called the center cut. Now and then only one seed grows, round instead of flat: a peaberry.',
      process: 'After processing and hulling it’s called green coffee: pale, hard, and grassy smelling. Roasting turns it brown.',
      links: []
    }
  ];

  /* What's left on the bean as it dries, by process. "gone" are the parts stripped off first. */
  var PEEL_STEPS = [
    { id: 'picked', label: 'Just picked', gone: [], text: 'A ripe cherry, just picked. Every layer is still there.' },
    { id: 'natural', label: 'Natural', process: 'Natural', gone: [],
      text: 'Natural: nothing comes off. The whole cherry dries for weeks, then the dried fruit and parchment are hulled off together.' },
    { id: 'honey', label: 'Honey', process: 'Honey', gone: ['skin', 'pulp'],
      text: 'Honey: the skin and pulp come off, but some or all of the sticky mucilage stays on while the coffee dries.' },
    { id: 'washed', label: 'Washed', process: 'Washed', gone: ['skin', 'pulp', 'mucilage'],
      text: 'Washed: the skin and pulp come off, the mucilage is fermented and washed away, and the bean dries in its parchment.' },
    { id: 'wethulled', label: 'Wet-hulled', process: 'Wet-hulled', gone: ['skin', 'pulp', 'mucilage', 'parchment'],
      text: 'Wet-hulled: the parchment is stripped while the bean is still wet, so the bare bean finishes drying.' },
    { id: 'green', label: 'Green coffee', gone: ['skin', 'pulp', 'mucilage', 'parchment'],
      text: 'Green coffee: after drying and hulling, only the bean and a little silver skin are left. This is what a roaster buys.' }
  ];

  var RULES = [
    {
      title: 'Higher farms, denser beans',
      text: 'Coffee grown high ripens slowly and packs in more sugar and acid. The beans are denser, so they need more heat to roast through. Light roasts are harder to brew too, since less roasting leaves the bean denser. That’s why the Grind Tool goes finer and hotter for a light roast.'
    },
    {
      title: 'Process sets the flavors. Roast sets the volume.',
      text: 'Processing decides which flavors are on the bean. Roasting decides how much of them you taste. Fruit from a natural or anaerobic coffee fades as the roast darkens. By a dark roast, chocolate and smoke take over and most differences disappear.'
    },
    {
      title: 'Match the brew to the bean',
      text: 'Clean, bright coffees (washed, gesha, SL28) shine through a paper filter: pour-over or drip. Heavy, earthy coffees (wet-hulled, catimor, mundo novo) suit French press or cold brew, where body is a plus.'
    },
    {
      title: 'Fresh, but not too fresh',
      text: 'Beans give off carbon dioxide for a few days after roasting, which makes brewing uneven. Most taste best from a few days to about a month after roast. That’s why we roast Tuesday and call it ready Thursday.'
    }
  ];

  var GLOSSARY = [
    ['Single origin', 'Beans from one country, region, or farm, not a blend.'],
    ['Blend', 'Beans from more than one place, mixed for balance and consistency. Most espresso is a blend.'],
    ['Microlot', 'A small batch from one farm, or one part of a farm, processed separately.'],
    ['Altitude (masl)', 'Meters above sea level. Higher usually means denser, brighter coffee.'],
    ['Peaberry', 'A cherry with one round seed instead of two flat ones. A small share of most harvests, sorted out and sold separately.'],
    ['Mucilage', 'The sticky, sugary layer between the cherry’s fruit and the bean. Processing is mostly about what happens to it.'],
    ['Parchment', 'The papery shell around each bean. It comes off before roasting.'],
    ['AA, Grade 1, SHB, Supremo', 'Grading words that vary by country. Kenya’s AA and Colombia’s Supremo mean large beans. Ethiopia’s Grade 1 means the fewest defects. SHB, strictly hard bean, means grown high in Central America.'],
    ['Thermal shock', 'A newer step, usually after an anaerobic ferment: beans soak in hot water, then cold, before drying.'],
    ['Monsooned', 'Indian coffee left open to monsoon winds for weeks, so the beans swell and lose acidity. Heavy and earthy.'],
    ['Decaf', 'Caffeine comes out of the green beans before roasting. Swiss Water uses water and carbon filters, sugarcane (EA) uses a solvent made from sugarcane, and the CO2 method uses pressurized carbon dioxide.']
  ];

  var ROAST_WORD = { light: 'light roast', medium: 'medium roast', dark: 'dark roast' };
  var METHOD_WORD = { pourover: 'pour-over', drip: 'drip machine', frenchpress: 'French press', aeropress: 'AeroPress', coldbrew: 'cold brew' };

  /* How each process leaves the cherry before drying, for the cherry drawing. */
  var PROCESS_PEEL = {
    'Washed': 'washed', 'Natural': 'natural', 'Honey': 'honey', 'Wet-hulled': 'wethulled'
  };
  var PROCESS_PEEL_TEXT = {
    'Anaerobic': 'Anaerobic: cherries go into a sealed tank whole, or pulped first, and ferment without oxygen. Then they dry as a washed or natural coffee.',
    'Carbonic maceration': 'Carbonic maceration: whole cherries ferment in a tank of carbon dioxide, then usually dry as a natural, with everything still on.',
    'Lactic': 'Lactic: whole or pulped cherries ferment in a sealed tank set up to favor lactic acid bacteria, then dry as usual.',
    'Co-fermented': 'Co-fermented: whole or pulped cherries ferment alongside added fruit, spices, or yeast, then dry as usual.'
  };

  var REGION_SHORT = { africa: 'Africa', central: 'Central America', south: 'South America', asia: 'Asia-Pacific' };

  /* ================= BUILD ================= */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (text != null) node.textContent = text;
    return node;
  }
  function brewLink(b, name) {
    var a = el('a', { 'class': 'text-link', href: '#grind?roast=' + b.roast + '&method=' + b.method },
      'Brew it: ' + ROAST_WORD[b.roast] + ', ' + METHOD_WORD[b.method]);
    a.appendChild(el('span', { 'class': 'visually-hidden' }, ' (' + name + ')'));
    return a;
  }
  function chip(label, onClick, cls) {
    var b = el('button', { type: 'button', 'class': 'chip chip-small' + (cls ? ' ' + cls : '') }, label);
    b.addEventListener('click', onClick);
    return b;
  }
  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wide = window.matchMedia('(min-width: 861px)');
  function scrollToEl(node) { if (node) node.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); }
  function flash(node) {
    if (!node) return;
    node.classList.remove('flash'); void node.offsetWidth; node.classList.add('flash');
  }

  /* Keep the pinned section tabs exactly under the site header, whatever its height. */
  function measureChrome() {
    var header = $('.site-header'), bar = $('#guide-tabs-bar');
    var root = document.documentElement.style;
    if (header) root.setProperty('--header-actual', header.offsetHeight + 'px');
    if (bar && bar.offsetHeight) root.setProperty('--tabs-h', bar.offsetHeight + 'px');
  }

  /* ================= SECTION TABS ================= */

  var VIEWS = ['map', 'varieties', 'processing', 'basics', 'glossary'];
  var currentView = 'map';

  function showView(view, opts) {
    opts = opts || {};
    if (VIEWS.indexOf(view) < 0) view = 'map';
    var changed = view !== currentView;
    currentView = view;
    VIEWS.forEach(function (v) {
      var tab = $('#gtab-' + v), panel = $('#gpanel-' + v);
      var on = v === view;
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
      tab.tabIndex = on ? 0 : -1;
      panel.hidden = !on;
    });
    if (opts.push && changed) {
      try { history.pushState(null, '', '#beans?view=' + view); } catch (e) { /* file:// may refuse; harmless */ }
    }
    measureChrome();
    // If the tabs are pinned (you've scrolled down), bring the new section's top into view.
    var bar = $('#guide-tabs-bar');
    if (opts.scroll !== false && bar && bar.getBoundingClientRect().top <= (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-actual')) || 64) + 1) {
      $('#gpanel-' + view).scrollIntoView({ block: 'start' });
    }
  }

  function wireTabs() {
    var list = $('#guide-tabs');
    list.addEventListener('click', function (e) {
      var t = e.target.closest('[role="tab"]');
      if (t) showView(t.getAttribute('data-view'), { push: true });
    });
    list.addEventListener('keydown', function (e) {
      var i = VIEWS.indexOf(currentView), next = null;
      if (e.key === 'ArrowRight') next = VIEWS[(i + 1) % VIEWS.length];
      else if (e.key === 'ArrowLeft') next = VIEWS[(i - 1 + VIEWS.length) % VIEWS.length];
      else if (e.key === 'Home') next = VIEWS[0];
      else if (e.key === 'End') next = VIEWS[VIEWS.length - 1];
      if (!next) return;
      e.preventDefault();
      showView(next, { push: true });
      $('#gtab-' + next).focus();
    });
  }

  /* ================= VARIETIES: tiles + one detail ================= */

  var selectedVariety = null;
  var currentRegion = 'all';
  var varietyByName = {};
  VARIETIES.forEach(function (v) { varietyByName[v.name] = v; });

  function firstSentence(s) { var m = String(s).split(/[.:]/)[0]; return m; }

  function buildVarietyTiles() {
    var list = $('#variety-list');
    VARIETIES.forEach(function (v) {
      var tile = el('button', { type: 'button', 'class': 'tile', id: 'variety-' + slug(v.name), 'data-name': v.name,
        'data-regions': v.regions.join(' '), 'aria-pressed': 'false', 'aria-controls': 'variety-detail' });
      var top = el('span', { 'class': 'tile-top' });
      top.appendChild(el('span', { 'class': 'tile-name' }, v.name));
      top.appendChild(el('span', { 'class': 'family family-' + v.family }, FAMILIES[v.family]));
      tile.appendChild(top);
      tile.appendChild(el('span', { 'class': 'tile-meta' }, v.regions.map(function (r) { return REGION_SHORT[r]; }).join(' · ')));
      tile.appendChild(el('span', { 'class': 'tile-taste' }, firstSentence(v.taste)));
      list.appendChild(tile);
    });
    list.addEventListener('click', function (e) {
      var t = e.target.closest('.tile');
      if (!t) return;
      var name = t.getAttribute('data-name');
      // On a phone, tapping the open tile again closes it.
      if (!wide.matches && selectedVariety === name) { selectVariety(null); return; }
      selectVariety(name, { scroll: !wide.matches, updateUrl: true });
    });
  }

  function placeVarietyDetail() {
    var detail = $('#variety-detail');
    if (wide.matches || !selectedVariety) {
      $('#variety-detail-home').appendChild(detail);
    } else {
      var tile = document.getElementById('variety-' + slug(selectedVariety));
      tile.parentNode.insertBefore(detail, tile.nextSibling);
    }
    detail.hidden = !selectedVariety;
  }

  function renderVarietyDetail() {
    var d = $('#variety-detail');
    d.textContent = '';
    var v = varietyByName[selectedVariety];
    if (!v) return;
    var head = el('div', { 'class': 'detail-head' });
    head.appendChild(el('span', { 'class': 'family family-' + v.family }, FAMILIES[v.family]));
    head.appendChild(el('h4', { 'class': 'detail-title', tabindex: '-1' }, v.name));
    if (v.aka) head.appendChild(el('p', { 'class': 'aka' }, v.aka));
    d.appendChild(head);

    d.appendChild(el('p', { 'class': 'detail-label' }, 'Grows in'));
    var where = el('div', { 'class': 'panel-chips' });
    v.countries.forEach(function (c) { where.appendChild(chip(c, function () { goToCountry(c); })); });
    d.appendChild(where);

    d.appendChild(el('p', { 'class': 'story' }, v.story));
    var dl = el('dl', { 'class': 'mini-facts' });
    [['In the cup', v.taste], ['Roast', v.roast]].forEach(function (p) {
      var row = el('div'); row.appendChild(el('dt', null, p[0])); row.appendChild(el('dd', null, p[1])); dl.appendChild(row);
    });
    d.appendChild(dl);

    var actions = el('div', { 'class': 'detail-actions' });
    actions.appendChild(brewLink(v.brew, v.name));
    var mapBtn = el('button', { type: 'button', 'class': 'map-link' }, 'Show on map');
    mapBtn.addEventListener('click', function () {
      showView('map', { push: true });
      document.dispatchEvent(new CustomEvent('northline:show-variety', { detail: { name: v.name } }));
    });
    actions.appendChild(mapBtn);
    d.appendChild(actions);

    // Step through the varieties that are showing.
    var visible = $all('#variety-list .tile:not([hidden])').map(function (t) { return t.getAttribute('data-name'); });
    var i = visible.indexOf(v.name);
    if (visible.length > 1) {
      var nav = el('div', { 'class': 'detail-nav' });
      var prev = visible[(i - 1 + visible.length) % visible.length], next = visible[(i + 1) % visible.length];
      nav.appendChild(chip('← ' + prev, function () { selectVariety(prev, { focus: true }); }));
      nav.appendChild(chip(next + ' →', function () { selectVariety(next, { focus: true }); }));
      d.appendChild(nav);
    }
  }

  function selectVariety(name, opts) {
    opts = opts || {};
    selectedVariety = name;
    $all('#variety-list .tile').forEach(function (t) {
      t.setAttribute('aria-pressed', t.getAttribute('data-name') === name ? 'true' : 'false');
    });
    renderVarietyDetail();
    placeVarietyDetail();
    var d = $('#variety-detail');
    if (name && opts.scroll) scrollToEl(wide.matches ? d : document.getElementById('variety-' + slug(name)));
    if (name && opts.focus) d.querySelector('.detail-title').focus({ preventScroll: !opts.scroll });
    if (name && opts.flash) flash(d);
    if (name && opts.updateUrl) try { history.replaceState(null, '', '#beans?view=varieties&item=' + slug(name)); } catch (e) {}
  }

  /* The region filter is shared with the map: either one can change it, and both follow. */
  function applyRegionFilter(key) {
    currentRegion = key;
    $all('#variety-filters button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-region') === key ? 'true' : 'false');
    });
    var shown = [];
    $all('#variety-list .tile').forEach(function (t) {
      var match = key === 'all' || t.getAttribute('data-regions').split(' ').indexOf(key) >= 0;
      t.hidden = !match;
      if (match) shown.push(t.getAttribute('data-name'));
    });
    $('#variety-count').textContent = key === 'all'
      ? 'Showing all ' + VARIETIES.length + ' varieties.'
      : 'Showing ' + shown.length + ' of ' + VARIETIES.length + ' varieties grown in ' + REGIONS[key].label + '.';
    if (selectedVariety && shown.indexOf(selectedVariety) < 0) {
      selectVariety(wide.matches ? shown[0] || null : null);
    } else if (selectedVariety) {
      renderVarietyDetail(); placeVarietyDetail();
    }
  }

  function buildFilters() {
    var bar = $('#variety-filters');
    ['all'].concat(Object.keys(REGIONS)).forEach(function (key) {
      bar.appendChild(el('button', { type: 'button', 'class': 'chip chip-small', 'data-region': key, 'aria-pressed': key === 'all' ? 'true' : 'false' },
        key === 'all' ? 'All regions' : REGIONS[key].label));
    });
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-region]');
      if (!b) return;
      var key = b.getAttribute('data-region');
      applyRegionFilter(key);
      document.dispatchEvent(new CustomEvent('northline:region', { detail: { region: key, source: 'filter' } }));
    });
    document.addEventListener('northline:region', function (e) {
      if (e.detail.source !== 'filter') applyRegionFilter(e.detail.region);
    });
  }

  /* Opening a variety from anywhere (search, the map, a link). */
  function openVariety(name) {
    if (!varietyByName[name]) return;
    showView('varieties', { push: true, scroll: false });
    var tile = document.getElementById('variety-' + slug(name));
    if (tile && tile.hidden) {
      applyRegionFilter('all');
      document.dispatchEvent(new CustomEvent('northline:region', { detail: { region: 'all', source: 'filter' } }));
    }
    selectVariety(name, { scroll: true, focus: true, flash: true, updateUrl: true });
  }

  function goToCountry(name) {
    showView('map', { push: true, scroll: false });
    if (window.NorthlineMap) window.NorthlineMap.selectCountry(name, true);
    scrollToEl($('#coffee-map'));
  }

  /* ================= PROCESSING: picker + cherry + one detail ================= */

  var selectedProcess = null;
  var processByName = {};
  PROCESSES.forEach(function (p) { processByName[p.name] = p; });

  function meter(label, value) {
    var row = el('div', { 'class': 'meter' });
    row.appendChild(el('span', { 'class': 'meter-label' }, label));
    var dots = el('span', { 'class': 'meter-dots', 'aria-hidden': 'true' });
    for (var i = 1; i <= 5; i++) dots.appendChild(el('span', { 'class': i <= value ? 'dot on' : 'dot' }));
    row.appendChild(dots);
    row.appendChild(el('span', { 'class': 'visually-hidden' }, value + ' out of 5'));
    return row;
  }

  function buildProcessPicker() {
    var picker = $('#process-picker');
    PROCESSES.forEach(function (p) {
      var b = el('button', { type: 'button', 'class': 'pick', id: 'process-' + slug(p.name), 'data-name': p.name, 'aria-pressed': 'false', 'aria-controls': 'process-detail' });
      b.appendChild(el('span', { 'class': 'pick-name' }, p.name));
      b.appendChild(el('span', { 'class': 'pick-word' }, p.short));
      picker.appendChild(b);
    });
    picker.addEventListener('click', function (e) {
      var b = e.target.closest('.pick');
      if (b) selectProcess(b.getAttribute('data-name'), { scrollOnPhone: true, updateUrl: true });
    });
  }

  function renderProcessDetail() {
    var d = $('#process-detail');
    d.textContent = '';
    var p = processByName[selectedProcess];
    if (!p) return;
    var head = el('div', { 'class': 'detail-head' });
    head.appendChild(el('span', { 'class': 'family family-cross' }, p.short));
    head.appendChild(el('h4', { 'class': 'detail-title', tabindex: '-1' }, p.name));
    head.appendChild(el('p', { 'class': 'aka' }, p.aka));
    d.appendChild(head);
    d.appendChild(el('p', { 'class': 'grown' }, 'Common in: ' + p.where));
    d.appendChild(el('p', { 'class': 'detail-label' }, 'How it’s done'));
    var ol = el('ol', { 'class': 'how' });
    p.how.forEach(function (s) { ol.appendChild(el('li', null, s)); });
    d.appendChild(ol);
    d.appendChild(el('p', { 'class': 'detail-label' }, 'In the cup'));
    d.appendChild(el('p', null, p.taste));
    var meters = el('div', { 'class': 'meters' });
    Object.keys(p.meters).forEach(function (k) { meters.appendChild(meter(k, p.meters[k])); });
    d.appendChild(meters);
    var dl = el('dl', { 'class': 'mini-facts' });
    [['Roast', p.roast], ['Brew', p.brewNote]].forEach(function (pair) {
      var row = el('div'); row.appendChild(el('dt', null, pair[0])); row.appendChild(el('dd', null, pair[1])); dl.appendChild(row);
    });
    d.appendChild(dl);
    var actions = el('div', { 'class': 'detail-actions' });
    actions.appendChild(brewLink(p.brew, p.name + ' process'));
    d.appendChild(actions);
  }

  function selectProcess(name, opts) {
    opts = opts || {};
    selectedProcess = name;
    $all('#process-picker .pick').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-name') === name ? 'true' : 'false');
    });
    $all('#process-compare tbody tr').forEach(function (r) { r.classList.toggle('current', r.getAttribute('data-name') === name); });
    renderProcessDetail();
    peelFor(name);
    var d = $('#process-detail');
    if (opts.scrollOnPhone && !wide.matches) scrollToEl(d);
    if (opts.scroll) scrollToEl($('#process-picker'));
    if (opts.focus) d.querySelector('.detail-title').focus({ preventScroll: true });
    if (opts.flash) flash(d);
    if (opts.updateUrl) try { history.replaceState(null, '', '#beans?view=processing&item=' + slug(name)); } catch (e) {}
  }

  function openProcess(name) {
    if (!processByName[name]) return;
    showView('processing', { push: true, scroll: false });
    selectProcess(name, { scroll: true, focus: true, flash: true, updateUrl: true });
  }

  function buildCompare() {
    var table = $('#process-compare');
    var keys = Object.keys(PROCESSES[0].meters);
    var thead = el('thead'), hr = el('tr');
    hr.appendChild(el('th', { scope: 'col' }, 'Process'));
    keys.forEach(function (k) { hr.appendChild(el('th', { scope: 'col' }, k)); });
    thead.appendChild(hr);
    var tbody = el('tbody');
    PROCESSES.forEach(function (p) {
      var tr = el('tr', { 'data-name': p.name });
      var th = el('th', { scope: 'row' });
      var b = el('button', { type: 'button', 'class': 'link-button' }, p.name);
      b.addEventListener('click', function () { selectProcess(p.name, { scroll: true, focus: true, flash: true }); });
      th.appendChild(b);
      tr.appendChild(th);
      keys.forEach(function (k) {
        var td = el('td');
        var dots = el('span', { 'class': 'meter-dots', 'aria-hidden': 'true' });
        for (var i = 1; i <= 5; i++) dots.appendChild(el('span', { 'class': i <= p.meters[k] ? 'dot on' : 'dot' }));
        td.appendChild(dots);
        td.appendChild(el('span', { 'class': 'visually-hidden' }, p.meters[k] + ' out of 5'));
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(thead);
    table.appendChild(tbody);
  }

  /* ---------- The cherry ---------- */

  var partById = {};
  CHERRY_PARTS.forEach(function (p) { partById[p.id] = p; });
  var selectedPart = null;
  var peelFor = function () {};

  function buildCherry() {
    var svg = $('#cherry-art');
    var labels = $('#cherry-labels');
    var info = $('#cherry-info');
    var caption = $('#cherry-step-caption');
    var NS = 'http://www.w3.org/2000/svg';
    function s(tag, attrs, text) {
      var n = document.createElementNS(NS, tag);
      Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
      if (text) n.textContent = text;
      return n;
    }
    var labelEls = {};

    CHERRY_PARTS.forEach(function (p) {
      var y = p.at[1];
      var g = s('g', { 'class': 'part-label', 'data-part': p.id, tabindex: '0', role: 'button', 'aria-pressed': 'false', 'aria-label': p.name + ': what it is' });
      g.appendChild(s('path', { d: 'M' + p.at[0] + ' ' + y + 'H290', 'class': 'leader' }));
      g.appendChild(s('circle', { cx: p.at[0], cy: y, r: 3, 'class': 'leader-dot' }));
      g.appendChild(s('rect', { x: 292, y: y - 13, width: 104, height: 26, rx: 6, 'class': 'label-bg' }));
      g.appendChild(s('text', { x: 300, y: y + 5, 'class': 'label-text' }, p.name));
      labels.appendChild(g);
      labelEls[p.id] = g;
    });

    function setHot(id) {
      $all('[data-part]', svg).forEach(function (n) { n.classList.toggle('hot', id !== null && n.getAttribute('data-part') === id); });
    }

    function renderInfo() {
      info.textContent = '';
      if (!selectedPart) {
        info.appendChild(el('p', { 'class': 'cherry-hint' }, 'Tap any layer of the cherry, or its label, to see what it is.'));
        return;
      }
      var p = partById[selectedPart];
      var head = el('p', { 'class': 'cherry-part-name' });
      head.appendChild(el('strong', null, p.name));
      head.appendChild(document.createTextNode(' · ' + p.aka));
      info.appendChild(head);
      info.appendChild(el('p', null, p.what));
      var proc = el('p');
      proc.appendChild(el('strong', null, 'In processing: '));
      proc.appendChild(document.createTextNode(p.process));
      info.appendChild(proc);
      var row = el('div', { 'class': 'panel-chips' });
      p.links.forEach(function (name) {
        row.appendChild(chip(name, function () { selectProcess(name, { focus: true, flash: true }); }, 'chip-dark'));
      });
      var i = CHERRY_PARTS.indexOf(p);
      var next = CHERRY_PARTS[(i + 1) % CHERRY_PARTS.length];
      row.appendChild(chip('Next: ' + next.name, function () { selectPart(next.id); }));
      row.appendChild(chip('Close', function () { selectPart(null); }));
      info.appendChild(row);
    }

    function selectPart(id) {
      selectedPart = id;
      svg.classList.toggle('has-selection', !!id);
      $all('[data-part]', svg).forEach(function (n) { n.classList.toggle('selected', n.getAttribute('data-part') === id); });
      Object.keys(labelEls).forEach(function (k) { labelEls[k].setAttribute('aria-pressed', k === id ? 'true' : 'false'); });
      renderInfo();
    }
    partSelector = selectPart;

    svg.addEventListener('mouseover', function (e) {
      var t = e.target.closest('[data-part]');
      setHot(t ? t.getAttribute('data-part') : null);
    });
    svg.addEventListener('mouseleave', function () { setHot(null); });
    svg.addEventListener('click', function (e) {
      var t = e.target.closest('[data-part]');
      if (t) selectPart(t.getAttribute('data-part'));
    });
    labels.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var t = e.target.closest('[data-part]');
      if (!t) return;
      e.preventDefault();
      selectPart(t.getAttribute('data-part'));
    });
    labels.addEventListener('focusin', function (e) {
      var t = e.target.closest('[data-part]');
      setHot(t ? t.getAttribute('data-part') : null);
    });
    labels.addEventListener('focusout', function () { setHot(null); });

    /* The drawing follows the selected process: layers stripped before drying fade out. */
    peelFor = function (name) {
      var stepId = PROCESS_PEEL[name];
      var step = stepId ? PEEL_STEPS.filter(function (x) { return x.id === stepId; })[0] : null;
      var gone = step ? step.gone : [];
      $all('.part', svg).forEach(function (n) { n.classList.toggle('gone', gone.indexOf(n.getAttribute('data-part')) >= 0); });
      Object.keys(labelEls).forEach(function (k) {
        var off = gone.indexOf(k) >= 0;
        labelEls[k].classList.toggle('gone', off);
        labelEls[k].setAttribute('aria-label', partById[k].name + (off ? ', removed before drying' : '') + ': what it is');
      });
      $('#peel-key').hidden = !gone.length;
      caption.textContent = step ? step.text : (PROCESS_PEEL_TEXT[name] || '');
    };

    renderInfo();
  }
  var partSelector = function () {};

  /* ================= BASICS ================= */

  function buildSpecies() {
    var wrap = $('#species-list');
    SPECIES.forEach(function (s) {
      var card = el('article', { 'class': 'card species-card', id: 'species-' + slug(s.name) });
      card.appendChild(el('h4', { 'class': 'card-title', tabindex: '-1' }, s.name));
      card.appendChild(el('p', { 'class': 'latin' }, s.latin));
      card.appendChild(el('p', { 'class': 'share' }, s.share));
      var dl = el('dl', { 'class': 'mini-facts' });
      [['Where it grows', s.grows], ['How it tastes', s.taste]].forEach(function (p) {
        var d = el('div'); d.appendChild(el('dt', null, p[0])); d.appendChild(el('dd', null, p[1])); dl.appendChild(d);
      });
      card.appendChild(dl);
      wrap.appendChild(card);
    });
  }

  /* A route line with numbered stops. The line runs stop to stop and ends at the last one. */
  function buildTimeline() {
    var ol = $('#origin-timeline');
    TIMELINE.forEach(function (t, i) {
      var li = el('li', { 'class': i === TIMELINE.length - 1 ? 'stop stop-last' : 'stop' });
      li.appendChild(el('span', { 'class': 'stop-num', 'aria-hidden': 'true' }, String(i + 1)));
      li.appendChild(el('p', { 'class': 'step-when' }, t.when));
      li.appendChild(el('p', { 'class': 'step-place' }, t.place));
      li.appendChild(el('p', { 'class': 'step-text' }, t.text));
      ol.appendChild(li);
    });
  }

  function buildRules() {
    var wrap = $('#rule-list');
    RULES.forEach(function (r, i) {
      var card = el('article', { 'class': 'rule-card' });
      card.appendChild(el('p', { 'class': 'rule-num', 'aria-hidden': 'true' }, String(i + 1)));
      card.appendChild(el('h4', null, r.title));
      card.appendChild(el('p', null, r.text));
      wrap.appendChild(card);
    });
  }

  /* ================= GLOSSARY ================= */

  function buildGlossary() {
    var dl = $('#glossary-list');
    GLOSSARY.forEach(function (g) {
      var d = el('div', { id: 'term-' + slug(g[0]), 'data-text': norm(g[0] + ' ' + g[1]) });
      d.appendChild(el('dt', null, g[0]));
      d.appendChild(el('dd', null, g[1]));
      dl.appendChild(d);
    });
    var input = $('#glossary-filter-input'), count = $('#glossary-count');
    function apply() {
      var q = norm(input.value.trim()), n = 0;
      $all('#glossary-list > div').forEach(function (d) {
        var on = !q || d.getAttribute('data-text').indexOf(q) >= 0;
        d.hidden = !on; if (on) n++;
      });
      count.textContent = q ? n + ' of ' + GLOSSARY.length + ' terms match.' : GLOSSARY.length + ' terms.';
    }
    input.addEventListener('input', apply);
    apply();
  }

  function openTerm(term) {
    showView('glossary', { push: true, scroll: false });
    var input = $('#glossary-filter-input');
    input.value = '';
    input.dispatchEvent(new Event('input'));
    var d = document.getElementById('term-' + slug(term));
    scrollToEl(d); flash(d);
  }

  function openSpecies(name) {
    showView('basics', { push: true, scroll: false });
    var c = document.getElementById('species-' + slug(name));
    scrollToEl(c); flash(c);
    if (c) c.querySelector('.card-title').focus({ preventScroll: true });
  }

  function openPart(id) {
    showView('processing', { push: true, scroll: false });
    partSelector(id);
    scrollToEl($('#cherry'));
  }

  /* ================= SEARCH ================= */

  function buildSearch() {
    var input = $('#guide-search-input');
    var results = $('#guide-search-results');
    var status = $('#guide-search-status');

    function index() {
      var items = [];
      VARIETIES.forEach(function (v) {
        items.push({ label: v.name, type: 'Variety', keys: [v.aka, FAMILIES[v.family], v.grown, v.taste].join(' '), go: function () { openVariety(v.name); } });
      });
      PROCESSES.forEach(function (p) {
        items.push({ label: p.name, type: 'Process', keys: [p.aka, p.short, p.taste].join(' '), go: function () { openProcess(p.name); } });
      });
      CHERRY_PARTS.forEach(function (p) {
        items.push({ label: p.name, type: 'Part of the cherry', keys: p.aka, go: function () { openPart(p.id); } });
      });
      SPECIES.forEach(function (s) {
        items.push({ label: s.name, type: 'Species', keys: s.latin, go: function () { openSpecies(s.name); } });
      });
      GLOSSARY.forEach(function (g) {
        items.push({ label: g[0], type: 'Glossary', keys: g[1], go: function () { openTerm(g[0]); } });
      });
      var countries = (window.NorthlineMap && window.NorthlineMap.COUNTRIES) || [];
      countries.forEach(function (c) {
        items.push({ label: c.name, type: 'Country on the map', keys: c.note, go: function () { goToCountry(c.name); } });
      });
      return items;
    }

    function find(q) {
      q = norm(q.trim());
      if (q.length < 2) return [];
      return index().map(function (it) {
        var name = norm(it.label), keys = norm(it.keys || '');
        var score = name.indexOf(q) === 0 ? 3 : name.indexOf(q) >= 0 ? 2 : keys.indexOf(q) >= 0 ? 1 : 0;
        return { it: it, score: score };
      }).filter(function (r) { return r.score > 0; })
        .sort(function (a, b) { return b.score - a.score || a.it.label.localeCompare(b.it.label); })
        .slice(0, 8).map(function (r) { return r.it; });
    }

    var current = [];
    function render() {
      current = find(input.value);
      results.textContent = '';
      if (!input.value.trim() || input.value.trim().length < 2) { results.hidden = true; status.textContent = ''; return; }
      if (!current.length) {
        results.appendChild(el('li', { 'class': 'no-results' }, 'Nothing found. Try another word, like a country or a flavor.'));
      }
      current.forEach(function (it, i) {
        var li = el('li');
        var b = el('button', { type: 'button', 'class': 'search-hit', 'data-i': i });
        b.appendChild(el('span', { 'class': 'hit-name' }, it.label));
        b.appendChild(el('span', { 'class': 'hit-type' }, it.type));
        li.appendChild(b);
        results.appendChild(li);
      });
      results.hidden = false;
      status.textContent = current.length ? current.length + ' results. Use the down arrow to pick one.' : 'No results.';
    }
    function choose(i) {
      var it = current[i];
      if (!it) return;
      input.value = ''; render();
      it.go();
    }

    input.addEventListener('input', render);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { var f = results.querySelector('.search-hit'); if (f) { e.preventDefault(); f.focus(); } }
      else if (e.key === 'Enter') { e.preventDefault(); choose(0); }
      else if (e.key === 'Escape') { input.value = ''; render(); }
    });
    results.addEventListener('click', function (e) {
      var b = e.target.closest('.search-hit');
      if (b) choose(+b.getAttribute('data-i'));
    });
    results.addEventListener('keydown', function (e) {
      var b = e.target.closest('.search-hit');
      if (!b) return;
      var all = $all('.search-hit', results), i = all.indexOf(b);
      if (e.key === 'ArrowDown') { e.preventDefault(); (all[i + 1] || all[0]).focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (i === 0) input.focus(); else all[i - 1].focus(); }
      else if (e.key === 'Escape') { input.value = ''; render(); input.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('#guide-search')) results.hidden = true;
    });
    input.addEventListener('focus', function () { if (input.value.trim().length >= 2) render(); });
  }

  /* ================= ADDRESSES ================= */

  /* #beans?view=varieties&item=gesha opens that section and item, so any of it can be linked. */
  function readHash() {
    var raw = window.location.hash.replace(/^#/, '');
    if (raw.indexOf('beans') !== 0) return;
    var q = raw.indexOf('?');
    var params = new URLSearchParams(q >= 0 ? raw.slice(q + 1) : '');
    var view = params.get('view') || currentView;
    showView(view, { scroll: false });
    var item = params.get('item');
    if (view === 'varieties') {
      var v = VARIETIES.filter(function (x) { return slug(x.name) === item; })[0];
      if (v) selectVariety(v.name);
      else if (!selectedVariety && wide.matches) selectVariety(VARIETIES[0].name);
    }
    if (view === 'processing') {
      var p = PROCESSES.filter(function (x) { return slug(x.name) === item; })[0];
      if (p) selectProcess(p.name, { updateUrl: false });
    }
  }

  /* ================= START ================= */

  if (!$('#variety-list')) return;
  buildSpecies();
  buildTimeline();
  buildRules();
  buildGlossary();
  buildFilters();
  buildVarietyTiles();
  buildProcessPicker();
  buildCompare();
  buildCherry();
  buildSearch();
  wireTabs();

  applyRegionFilter('all');
  if (wide.matches) selectVariety(VARIETIES[0].name);
  else placeVarietyDetail();
  selectProcess(PROCESSES[0].name, { updateUrl: false });

  wide.addEventListener ? wide.addEventListener('change', placeVarietyDetail) : wide.addListener(placeVarietyDetail);
  window.addEventListener('resize', measureChrome);
  measureChrome();

  document.addEventListener('northline:focus-variety', function (e) { openVariety(e.detail.name); });
  window.addEventListener('hashchange', readHash);
  readHash();

  window.NorthlineBeans = {
    VARIETIES: VARIETIES, PROCESSES: PROCESSES, SPECIES: SPECIES, GLOSSARY: GLOSSARY, RULES: RULES, TIMELINE: TIMELINE,
    REGIONS: REGIONS, FAMILIES: FAMILIES, slug: slug,
    showView: showView, openVariety: openVariety, openProcess: openProcess
  };
})();
