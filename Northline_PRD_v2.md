**Northline Coffee: Home Brewing Site — Product Requirements Document**

*Version 2.0 · November 12, 2026 · Owner: Northline Coffee · Builder: Claude Code · Status: draft for owner review*

*Version 1.0 (approved November 12, 2026) is unchanged in the owner's files. This version widens the scope from a quick grind tool to a full site that gives people a reason to stay. Everything in 1.0 still applies unless this document says otherwise. Changes are listed in section 14.*

## 1. Purpose

Northline Coffee is a fictional small-batch roaster for busy commuters. The site does two jobs:

1. **On a weekday morning,** it gets a commuter a good cup fast. The Bean Grind Tool is still the core: roast, amount, and method in, grams and a grind setting out.
2. **The rest of the week,** it gives people a reason to spend time with us: a Bean Guide that explains what's on the bag, an interactive coffee map, and brew guides worth reading. People who understand their coffee buy it again.

The site supports both without either getting in the other's way. The number comes first on the Grind Tool; the depth is one tab away.

## 2. Audience

**Who:** commuters who already buy Northline beans, mostly people who found us on Instagram.

**Two moods, same people:**

| Mood | When | What they want |
|---|---|---|
| In a hurry | Weekday morning, ten minutes before the 7:14 | The grams and grind setting, now. This week's roast. A brew method's steps. |
| Curious | Evenings and weekends, on the couch or at the counter | What gesha or "anaerobic" means. Where their coffee grows. How to make it taste better. |

**What they don't want:** tasting-note poetry, sign-ups, pop-ups, or anything that makes them scroll to find the number they came for. The in-a-hurry paths (Home, Grind Tool, Brew Guides) stay short. Depth lives on the Bean Guide, where people go by choice.

## 3. Goals

| Goal | How we'll check it |
|---|---|
| A visitor gets a grind recipe fast | From Home, the tool and its result are two clicks and under 30 seconds away. |
| The numbers are right | The tool matches every worked example in section 6.6 of version 1.0. |
| People stay and explore | The Bean Guide, coffee map, and cross-links let a visitor move from a country to a variety to a brew recipe without dead ends. |
| The facts are right | Every claim on the Bean Guide is checked against World Coffee Research or another named source before launch, and hedged where the science is unsettled. |
| It sounds like Northline | Every line of copy passes the voice rules in section 8. |
| It works on a phone | Every tab works at 375 pixels wide with nothing cut off or overlapping. |

## 4. Site map

One page (`index.html`) with six tabs, each with its own web address so the back button and direct links work.

| Tab | Address | What's on it | Status |
|---|---|---|---|
| **Home** | `#home` | Headline, photo with the 7:14 clock, two buttons, this week's roast | Built |
| **Grind Tool** | `#grind` | The Bean Grind Tool | Built |
| **Brew Guides** | `#guides` | One card per method, with a photo | Built |
| **Our Roasts** | `#roasts` | The three roasts, with photos | Built |
| **Bean Guide** | `#beans` | Species, coffee map, varieties, processing, roast-and-brew rules, glossary | Built (new in 2.0) |
| **About** | `#about` | Who we are, when we roast, photo credits | Built |

## 5. Features

| # | Feature | Priority | Status |
|---|---|---|---|
| F1 | Tab navigation with a web address for each tab | Must have | Built |
| F2 | Bean Grind Tool | Must have | Built |
| F3 | This week's roast on Home | Must have | Built |
| F4 | Brew Guides tab, five methods | Must have | Built |
| F5 | Our Roasts tab, three roasts | Must have | Built |
| F6 | Layout that works on a phone, with a pinned result bar on the Grind Tool | Must have | Built |
| F7 | *Grind for this* links from guides, roasts, varieties, and processes | Must have | Built |
| F8 | Remember my usual | Nice to have | Built |
| F9 | Copy recipe | Nice to have | Built |
| F10 | Bean Guide tab (section 7.7) | Must have | Built |
| F11 | Interactive coffee map (section 7.8) | Must have | Built |
| F12 | Licensed photography, stored locally (section 7.6) | Must have | Built |
| F13 | Iconic header: subway-sign logo with a clock station marker and route line (section 9) | Must have | Built |
| F14 | Brew timer on the result card | Should have | Planned, 2.1 |
| F15 | Quick-pick sizes (one mug, travel mug, carafe) | Should have | Planned, 2.1 |
| F16 | Pour-over pour schedule (bloom and pour targets) | Should have | Planned, 2.1 |
| F17 | "Find your roast" quiz, ending in a *Grind for this* link | Should have | Planned, 2.1 |
| F18 | Shareable recipe links that include the amount | Nice to have | Planned, 2.2 |
| F19 | "Leave by" helper: train time in, start-brewing time out | Nice to have | Planned, 2.2 |
| F20 | Dark mode for early mornings | Nice to have | Planned, 2.2 |

## 6. The Bean Grind Tool (F2)

Unchanged from version 1.0, sections 6.1 to 6.7. The tool's numbers live in one data table that the Brew Guides also read.

## 7. Content

### 7.1 to 7.5

Unchanged from version 1.0, except:

- Roast cards, guide cards, Home, and About now carry photos (7.6).
- The About tab no longer closes with *Ask at the counter and we'll hold a bag*, and the footer no longer carries it. Holding bags isn't a real service, so the site doesn't offer it anywhere.

### 7.6 Images (replaces version 1.0, section 7.6)

- **Photos are allowed** when they are under the Unsplash or Pexels license, saved in the site's `images` folder (so the site still works offline), and checked for brand logos, faces, and text before use.
- **No other company's logo or packaging** may be visible. A photo with a printed brand on equipment is rejected.
- **Credits** go on the About tab, even though neither license requires them.
- **Licensed photos are never used in a Northline logo or trademark.** Both licenses forbid it.
- **Drawings made in code** remain for the logo, the clock badge, the brew-method icons, the cherry diagram, and any slot without an approved photo.

### 7.7 Bean Guide (F10)

Built for the curious mood, but kept short: one section shows at a time, so no section is more than about two screens on a laptop.

- **Search the guide:** one box searches varieties, processes, countries, parts of the cherry, species, and glossary terms, including flavors ("blueberry") and places ("Kenya"). Picking a result opens the right section with that item showing.
- **Section tabs, pinned under the site header while scrolling:** Map, Varieties, Processing, Basics, Glossary. Each section and item has its own address (for example `#beans?view=varieties&item=gesha`), so the back button and shared links work. The tabs work with arrow keys.

| Section | Contents |
|---|---|
| Map | The coffee map (7.8) |
| Varieties | 15 compact tiles, filterable by region, with one detail panel: beside the list on a laptop, opening under the tapped tile on a phone. The detail has the family, the countries it grows in (each opens the map), history, taste, roast, a *Brew it* link to the tool, *Show on map*, and previous and next |
| Processing | Eight process buttons; the interactive coffee cherry peels to match the chosen process, beside one detail panel with steps, taste meters, roast and brew. Every part of the cherry (skin, pulp, mucilage, parchment, silver skin, bean) is defined when tapped. A "compare all eight" table shows the taste meters side by side |
| Basics | Arabica, robusta, liberica and excelsa; the route-line timeline of how arabica spread; four roast-and-brew rules of thumb |
| Glossary | Other words on a bag, with a filter box |

All Bean Guide content lives in one data file (`beans.js`) so it can be corrected in one place.

### 7.8 Coffee map (F11)

- **What it shows:** a dot map of the world drawn in code, with the coffee belt shaded and a pin for each of 32 growing countries.
- **Regions:** buttons for the whole world and four regions zoom the map smoothly. The variety filter below follows the map, and the map follows the filter.
- **Countries:** clicking a pin, or choosing from the country list, opens a panel: what the country is known for, and buttons for each variety in the guide grown there. Each button jumps to that variety's card.
- **Varieties:** every variety card's *Show on map* button lights up and zooms to the countries where it grows.
- **Access:** pins are real buttons with full names for screen readers, the country list works without the map, and motion is skipped for visitors who ask for reduced motion.
- **No map service:** no tiles, libraries, or requests; the map works offline.

## 8. Voice

Unchanged from version 1.0, except that *we'll hold a bag* is dropped from "We say," since it isn't a real service. On the Bean Guide, history and science are stated plainly and hedged where the evidence is thin ("genetic tests so far point to…"). Real competition results may be described without naming awards ("won a national competition").

## 9. Look

- **Colors:** the version 1.0 colors (dark roast brown `#3B2A20`, cream `#F4EDE1`, orange `#D9772B`) plus coffee-bean tones: espresso `#2A1D16`, mocha `#6B4A36`, latte `#C9A88A`, oat `#E8DCCB`, and milk `#FBF7F0`. Orange is still never used as text color. Button text on orange is espresso, which meets AA; roast brown on orange does not.
- **Type:** unchanged. Georgia headlines, system sans body, no web fonts.
- **Logo:** an orange route line runs in from the edge of the screen to a clock-face station marker reading 7:14. The line ends at the clock, which sits on the left end of a cream, subway-style sign that reads "Northline". The clock alone, with an orange ring, is the browser tab icon and app icon. On hover, the clock's hands spin once (skipped for visitors who ask for reduced motion). Design explorations are kept in the `design` folder.
- **Feel:** calm on the fast paths; richer and more interactive on the Bean Guide.

## 10. Technical constraints

Unchanged from version 1.0, plus:

- Photos are stored in `images/` and loaded lazily. Each is resized to 1,600 pixels wide or smaller.
- Scripts stay plain and classic (no modules), so the site still opens by double-clicking `index.html`: `app.js` (tabs, tool, guides), `beans.js` (Bean Guide content), `map.js` (the map).

## 11. Out of scope

- A shop, prices, a cart, or payments.
- Sign-ups, accounts, newsletters, or forms that send anything.
- Espresso and moka pot (maybe a later version).
- Live data of any kind, and publishing the site anywhere.
- Origins for Northline's own roasts. The Bean Guide teaches how to read any bag; it does not claim where our beans come from.

## 12. Open questions

| Question | Owner's decision |
|---|---|
| Which header version: sign with a clock, route underline, or clock as the stop? | A combination: the subway sign from version 1 with the clock station and route line from version 3 |
| Replace the cold brew photo (the first pick showed a brand logo)? | Yes: replaced with a logo-free Pexels photo by mehmetography |
| Should the 2.1 features (F14 to F17) be built next? | Pending |

## 13. Acceptance criteria

Version 1.0's twelve criteria still apply. Add:

13. **Bean Guide (F10):** every section renders; the region filter shows the right varieties; every *Brew it* link opens the tool with the right roast and method.
14. **Coffee map (F11):** each region button zooms to that region; every pin opens its country's panel; every variety chip in a panel jumps to the matching card; every *Show on map* button lights up exactly the countries listed on that card; the map and the variety filter stay in step.
15. **Facts:** an independent check against named sources finds no unhedged errors on the Bean Guide.
16. **Photos (F12):** every photo is licensed, local, credited, and free of other brands' logos; no photo loads from the internet.
17. **Phone:** the Bean Guide and map work at 375 pixels wide, with the country list as a full alternative to tapping pins.

## 14. Changes from version 1.0

- Scope widened to "a reason to spend time with us"; audience gains the curious mood (sections 1 to 3).
- New Bean Guide tab and interactive coffee map (F10, F11, sections 7.7 and 7.8).
- Photos allowed under strict rules (7.6), replacing "no photos."
- Palette extended with coffee-bean tones; button text on orange changed to espresso for contrast (9).
- New header logo: subway sign with a clock station marker and route line, also used as the tab icon (F13, 9).
- Roadmap added for interactive features (F14 to F20).
