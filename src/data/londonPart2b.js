import { buildVenueLinks } from './schema.js';
import { DAY_4_SATURDAY, DAY_5_SUNDAY } from './londonPart2a.js';

export const DAY_6_MONDAY = {
  id: 'day-6-mon-nov-23',
  dayNumber: 6,
  dateLabel: 'Mon Nov 23',
  fullDate: 'Monday, November 23, 2026',
  title: 'Churchill Paintings, FRAMELESS, Faraday, Bond Street Luxury & Figaro',
  theme: 'Mayfair’s finest luxury fashion maisons, immersive art, science & historic East End opera',
  shoppingSummary: 'Best Day for Serious Designer Shopping · New & Old Bond Street (75–90 mins)',
  weatherTip: 'Everything from 10:00 a.m. to 4:00 p.m. sits in a compact Marylebone–Marble Arch–Mayfair loop close to The Langham.',
  stops: [
    {
      id: 'mon-wallace-collection',
      time: '10:00–11:00 a.m.',
      title: 'The Wallace Collection — Winston Churchill: The Painter',
      subtitle: 'Final Week of Historic Churchill Retrospective (Ends Nov 29) & Hertford House',
      category: 'museum',
      bookingStatus: 'confirmed',
      neighborhood: 'Marylebone (Manchester Square)',
      address: 'Hertford House, Manchester Square, London W1U 3BN',
      coordinates: { lat: 51.5175, lng: -0.1530 },
      walkOrTransit: 'Pleasant 8-minute walk west from The Langham along Wigmore Street to Manchester Square.',
      image: '/images/wallace_collection.jpg',
      summary:
        'Set inside an aristocratic 18th-century Marylebone townhouse, The Wallace Collection hosts the first major museum retrospective of Sir Winston Churchill’s paintings since his death — bringing together over 50 canvases (more than half from private collections) in its final week before closing November 29.',
      insiderTips: [
        'Arrive promptly at 10:00 a.m. when doors open to view the Churchill canvases in peace.',
        'Save 20 minutes upstairs for Fragonard’s The Swing, Frans Hals’s Laughing Cavalier, and the Mughal/Sikh treasures in the Ground Floor Oriental Armoury.',
      ],
      links: buildVenueLinks({
        name: 'The Wallace Collection',
        city: 'London',
        lat: 51.5175,
        lng: -0.1530,
        tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g186338-d187558-Reviews-Wallace_Collection-London_England.html',
        officialUrl: 'https://www.wallacecollection.org/whats-on/exhibitions-displays/winston-churchill-the-painter/',
      }),
      museumTour: {
        tourId: 'wallace-collection',
        tourTitle: 'Winston Churchill: The Painter & Hertford House Treasures',
        narrator: 'Dr. Julian Vance · Senior Cultural Historian',
        voiceId: 'en-GB-RyanNeural',
        totalDurationMinutes: 55,
        routeStrategy:
          'Descend first to the Lower Ground Exhibition Galleries for Winston Churchill: The Painter, pass through the Ground Floor Oriental Armoury, and finish upstairs in the Back State Room and Great Gallery.',
        introAudioUrl: '/audio/wallace-collection-intro.mp3',
        introTranscript:
          'Welcome to Hertford House, the sumptuous London townhouse of the Marquesses of Hertford and Sir Richard Wallace. Unlike sprawling state museums, every silk-lined drawing room here preserves the intimacy of a private aristocratic residence. You are catching the final days of Winston Churchill: The Painter — the first major museum retrospective of Churchill’s canvases in sixty years — paired with Rococo, Dutch Golden Age, and princely Indian masterpieces upstairs.',
        highlights: [
          {
            id: 'churchill-painter',
            order: 1,
            title: 'Winston Churchill: The Painter (50+ Rare Canvases)',
            artistOrOrigin: 'Sir Winston Churchill · 1915–1962 Retrospective',
            location: 'Lower Ground Floor · Exhibition Galleries',
            durationMinutes: 25,
            image: '/images/churchill_painting.jpg',
            summary:
              'Taking up oil painting at age 40 during the darkest days of 1915 after Gallipoli, Churchill produced over 500 sun-drenched landscapes from Chartwell, Marrakech, Venice, and the French Riviera.',
            lookClosely:
              'Notice Churchill’s fearless, Impressionist-inspired brushwork on water reflections in the Chartwell goldfish pond and the rose-gold Atlas Mountains of Marrakech.',
            audioUrl: '/audio/wallace-collection-churchill-painter.mp3',
            audioScript:
              'Winston Churchill discovered oil painting at age forty in the summer of nineteen fifteen, calling the muse of painting his rescue from political despair. Over the next five decades he carried easel and paintbox from his beloved Kent home at Chartwell to the French Riviera, Egypt, and Marrakech — the only canvas he painted during the entire Second World War was the sunset over the Koutoubia Mosque for President Roosevelt. Notice how boldly he loads pure cobalt, emerald, and cadmium orange onto the brush.',
          },
          {
            id: 'oriental-armoury',
            order: 2,
            title: 'Princely Indian, Mughal & Sikh Treasury',
            artistOrOrigin: '17th–19th Century Mughal & Lahore Court Craft',
            location: 'Ground Floor · Oriental Armoury',
            durationMinutes: 10,
            image: '/images/wallace_armoury.jpg',
            summary:
              'One of the finest collections of non-European courtly arms in the West, featuring jade-hilted Mughal daggers and treasures associated with Maharaja Ranjit Singh’s Lahore court.',
            lookClosely:
              'Spot the white nephrite jade khanjar daggers inlaid with rubies, emeralds, and gold kundan settings.',
            audioUrl: '/audio/wallace-collection-oriental-armoury.mp3',
            audioScript:
              'On the Ground Floor, step into the Oriental Armoury — a dazzling surprise inside a French-style townhouse. Sir Richard Wallace assembled magnificent courtly pieces from Mughal India, Persia, and Maharaja Ranjit Singh’s Sikh Empire. Lean close to the display cases to admire translucent white jade dagger hilts carved into floral buds and inlaid with Burmese rubies and Colombian emeralds.',
          },
          {
            id: 'fragonard-swing',
            order: 3,
            title: 'The Swing (Les Hasards heureux de l’escarpolette, 1767)',
            artistOrOrigin: 'Jean-Honoré Fragonard · French Rococo',
            location: 'First Floor · Back State Room',
            durationMinutes: 10,
            image: '/images/fragonard_swing.jpg',
            summary:
              'The sparkling, mischievous masterpiece of 18th-century French Rococo painting, glowing with coral-pink silk and frothy foliage.',
            lookClosely:
              'Follow the flying pink satin mule slipper kicked off her foot toward the stone statue of Cupid holding one finger to his lips ("shhh!").',
            audioUrl: '/audio/wallace-collection-fragonard-swing.mp3',
            audioScript:
              'Upstairs in the silk-hung Back State Room hangs the ultimate icon of eighteenth-century French Rococo: Fragonard’s The Swing. As an unsuspecting older bishop pulls the ropes in the shadows on the right, a young nobleman hides in the rosebushes on the left with an unobstructed view up her billowing coral-pink silk gown. Look up left: even the stone statue of Cupid presses a finger to his lips to keep the secret.',
          },
          {
            id: 'laughing-cavalier',
            order: 4,
            title: 'The Laughing Cavalier (1624)',
            artistOrOrigin: 'Frans Hals · Dutch Golden Age',
            location: 'First Floor · Great Gallery',
            durationMinutes: 10,
            image: '/images/laughing_cavalier.jpg',
            summary:
              'Painted in Haarlem when the unknown 26-year-old gentleman was likely celebrating his betrothal, famous for his upturned moustache and twinkling eyes.',
            lookClosely:
              'He isn’t actually laughing — his enigmatic smirk comes from his upturned moustache and lively eyebrows! Inspect the embroidered bees, arrows, and flaming cornucopias on his doublet.',
            audioUrl: '/audio/wallace-collection-laughing-cavalier.mp3',
            audioScript:
              'In the monumental sky-lit Great Gallery, meet Frans Hals’s sixteen twenty-four Laughing Cavalier. Look closely at his mouth: he is not truly laughing at all, yet his upturned moustache, cocked elbow, and twinkling eyes radiate irrepressible swagger. Inspect his black-and-white silk doublet embroidered with lovers’ emblems — winged arrows, bees, and flames — suggesting a twenty-six-year-old bridegroom posing proudly for his betrothal.',
          },
        ],
      },
    },
    {
      id: 'mon-frameless',
      time: '11:15 a.m.–12:45 p.m.',
      title: 'FRAMELESS Immersive Art Experience',
      subtitle: '360-Degree Floor-to-Ceiling Masterpieces & Orchestral Score',
      category: 'museum',
      bookingStatus: 'confirmed',
      neighborhood: 'Marble Arch',
      address: '6 Marble Arch, London W1H 7AP',
      coordinates: { lat: 51.5141, lng: -0.1597 },
      walkOrTransit: 'Easy 9-minute walk southwest from Manchester Square down Orchard/Portman Street to Marble Arch.',
      image: '/images/frameless_art.jpg',
      summary:
        'The UK’s largest permanent multi-sensory digital art experience. Over 42 masterpieces by Van Gogh, Monet, Dalí, Klimt, Hokusai, Canaletto, and Kandinsky dissolve off their frames across four dramatic mirrored and projection-mapped halls.',
      insiderTips: [
        'Each of the 4 galleries loops every ~20 minutes, so 90 minutes lets you experience every single room effortlessly with cushioned seating inside each hall.',
      ],
      links: buildVenueLinks({
        name: 'Frameless London',
        city: 'London',
        lat: 51.5141,
        lng: -0.1597,
        tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g186338-d25132446-Reviews-Frameless-London_England.html',
        officialUrl: 'https://frameless.com/',
      }),
      museumTour: {
        tourId: 'frameless-london',
        tourTitle: 'Four Immersive Galleries — Companion Audio Guide',
        narrator: 'Dr. Eleanor Vance · Contemporary Curation Guide',
        voiceId: 'en-GB-SoniaNeural',
        totalDurationMinutes: 80,
        routeStrategy:
          'Take the escalator down into the subterranean Marble Arch vaults and move at your own pace through the four themed rooms: Beyond Reality, Colour in Motion, The World Around Us, and The Art of Abstraction.',
        introAudioUrl: '/audio/frameless-london-intro.mp3',
        introTranscript:
          'Welcome to FRAMELESS at Marble Arch. After seeing centuries-old oil glazes up close at the National Gallery and Wallace Collection, here forty-two iconic works break free of their wooden frames entirely, projected at architectural scale with bespoke spatial symphonies. Listen briefly before entering each of the four galleries so you know the visual surprises waiting inside.',
        highlights: [
          {
            id: 'beyond-reality',
            order: 1,
            title: 'Gallery 1: Beyond Reality (Klimt, Dalí, Bosch & Munch)',
            artistOrOrigin: 'Surrealism, Symbolism & Dreamscapes',
            location: 'Gallery 1 · Mirrored Infinity Vault',
            durationMinutes: 20,
            image: '/images/frameless_art.jpg',
            summary:
              'Mirrored floors and ceilings wrap you inside Gustav Klimt’s shimmering gold leaf, Salvador Dalí’s melting clocks, and Rousseau’s tropical jungle.',
            lookClosely:
              'Stand near the center bench during Gustav Klimt’s Tree of Life sequence as golden spirals cascade across floor and ceiling.',
            audioUrl: '/audio/frameless-london-beyond-reality.mp3',
            audioScript:
              'Gallery One, Beyond Reality, uses mirrored surfaces to dissolve the boundaries of the room. Watch Gustav Klimt’s Byzantine gold spirals unfurl overhead, Salvador Dalí’s Persistence of Memory ripple across dreamlike desert horizons, and Henri Rousseau’s lush jungle foliage part before a sudden lightning flash.',
          },
          {
            id: 'colour-in-motion',
            order: 2,
            title: 'Gallery 2: Colour in Motion (Monet, Van Gogh & Seurat)',
            artistOrOrigin: 'Impressionism & Post-Impressionism (Interactive Floor)',
            location: 'Gallery 2 · Motion-Reactive Hall',
            durationMinutes: 20,
            image: '/images/van_gogh_sunflowers.jpg',
            summary:
              'Motion sensors track your footsteps across the floor, scattering Impressionist brushstrokes of Monet’s Water Lilies and Van Gogh’s Starry Night beneath your shoes.',
            lookClosely:
              'Walk gently across the open floor space — brushstrokes and petals part and swirl interactively around your feet!',
            audioUrl: '/audio/frameless-london-colour-in-motion.mp3',
            audioScript:
              'In Gallery Two, Colour in Motion, high-precision sensors turn the floor itself into a living palette. As you stroll across the room, thousands of pointillist dots from Georges Seurat and swirling cobalt brushstrokes from Vincent van Gogh’s Starry Night ripple outward from your footsteps like water in Claude Monet’s Giverny lily pond.',
          },
          {
            id: 'world-around-us',
            order: 3,
            title: 'Gallery 3: The World Around Us (Hokusai, Turner & Canaletto)',
            artistOrOrigin: 'Six-Sided Panoramic Seascapes & Cities',
            location: 'Gallery 3 · Monumental Main Hall',
            durationMinutes: 20,
            image: '/images/fighting_temeraire.jpg',
            summary:
              'The largest room in FRAMELESS: Hokusai’s Great Wave off Kanagawa crashes around all four walls, followed by Canaletto’s Piazza San Marco and Rembrandt’s Storm on the Sea of Galilee.',
            lookClosely:
              'Sit on the central leather banquettes during Hokusai’s Great Wave and Vesuvius eruption for full 360-degree immersion.',
            audioUrl: '/audio/frameless-london-world-around-us.mp3',
            audioScript:
              'Take a seat in the center of Gallery Three, the grandest hall in FRAMELESS. Here six-sided projection surrounds you completely inside nature’s power: Hokusai’s towering Prussian-blue Great Wave crests thirty feet high around you, Rembrandt’s fishing boat pitches on stormy seas, and Canaletto’s sunlit Venice serenely restores calm.',
          },
          {
            id: 'art-of-abstraction',
            order: 4,
            title: 'Gallery 4: The Art of Abstraction (Kandinsky, Mondrian & Klee)',
            artistOrOrigin: '20th-Century Geometric & Jazz-Synced Pioneers',
            location: 'Gallery 4 ·Layered Mesh Labyrinth',
            durationMinutes: 18,
            image: '/images/chihuly_va.jpg',
            summary:
              'Translucent floor-to-ceiling gauze screens float throughout the room so Kandinsky circles, Mondrian grids, and Hilma af Klint spirals dance in three-dimensional depth.',
            lookClosely:
              'Wander between the sheer mesh layers as jazz rhythms animate Piet Mondrian’s primary-colored Broadway Boogie Woogie.',
            audioUrl: '/audio/frameless-london-art-of-abstraction.mp3',
            audioScript:
              'Our final gallery replaces solid walls with semi-transparent architectural mesh screens, allowing light and geometry to float in mid-air. Wassily Kandinsky possessed synesthesia — he literally heard musical chords when viewing colors — and here his floating circles, Paul Klee’s warm colour blocks, and Piet Mondrian’s rhythmic grids dance through space to a vibrant jazz score.',
          },
        ],
      },
    },
    {
      id: 'mon-mayfair-lunch',
      time: '12:45–1:45 p.m.',
      title: 'Marble Arch & Mayfair Curated Lunch',
      subtitle: 'Effortless Gourmet Walk Toward Albemarle Street',
      category: 'dining',
      bookingStatus: 'included',
      neighborhood: 'North Mayfair / Marylebone',
      address: 'North Audley Street / New Quebec Street, Mayfair W1K',
      coordinates: { lat: 51.5131, lng: -0.1524 },
      walkOrTransit: 'Directly on your 15-minute walk from Marble Arch toward the Royal Institution on Albemarle Street.',
      image: '/images/selfridges.jpg',
      summary:
        'A perfectly placed one-hour lunch break as you stroll east from Marble Arch into Mayfair before the Faraday Museum and Nutan’s Bond Street session.',
      insiderTips: [
        'Mercato Mayfair (inside a breathtaking deconsecrated 1828 Grade I church on North Audley St) is unbeatable for a quick 45-minute gourmet lunch with zero wait!',
      ],
      links: buildVenueLinks({
        name: 'Mercato Mayfair',
        city: 'London',
        lat: 51.5131,
        lng: -0.1524,
        tripadvisorUrl: 'https://www.tripadvisor.com/Restaurant_Review-g186338-d19426213-Reviews-Mercato_Mayfair-London_England.html',
        officialUrl: 'https://mercatometropolitano.com/mercato-mayfair/',
      }),
      diningGuide: {
        cuisine: 'Artisanal Mayfair Food Hall or British Gastropub',
        priceRange: '££–£££',
        accolades: ['Grade I Listed St Mark’s Church Setting'],
        vibe: 'Stained-glass vaulted nave with fresh truffle pasta, bao, and espresso bars',
        featuredDishes: [
          {
            name: 'Fresh Black Truffle Tagliolini (Pasta Lovers at Mercato Mayfair)',
            badge: 'Viral Instagram Favorite',
            description:
              'Handmade egg pasta tossed in aged Parmigiano wheel with shaved Umbrian black truffle beneath stained-glass church windows.',
            dietary: 'Vegetarian Option',
          },
          {
            name: 'Steamed Duck & Prawn Dumplings / Gourmet Pad Thai',
            badge: 'Fast 45-Min Lunch Pick',
            description:
              'Ideal warm, flavourful lunch that keeps your 2:00 p.m. Faraday Museum and Bond Street schedule effortless.',
            dietary: 'Quick Gourmet',
          },
        ],
        nearbyOptions: [
          {
            name: 'Mercato Mayfair (St Mark’s Church)',
            cuisine: 'Artisanal Food Hall in Historic Church',
            walkTime: '6 min walk from FRAMELESS',
            famousFor: 'Vaulted nave architecture, fresh truffle pasta, bao & rooftop terrace',
            tripadvisorUrl: 'https://www.tripadvisor.com/Restaurant_Review-g186338-d19426213-Reviews-Mercato_Mayfair-London_England.html',
            googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mercato+Mayfair+North+Audley+Street',
          },
          {
            name: 'The Grazing Goat (Marylebone)',
            cuisine: 'Refined British Country-Style Pub',
            walkTime: '4 min walk from FRAMELESS (New Quebec St)',
            famousFor: 'aged Cornish steaks, roast cod, squash risotto & cozy fireplaces',
            tripadvisorUrl: 'https://www.tripadvisor.com/Restaurant_Review-g186338-d2095679-Reviews-The_Grazing_Goat-London_England.html',
            googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Grazing+Goat+London',
          },
          {
            name: 'BiBi Mayfair (North Audley St)',
            cuisine: 'Michelin-Guide Contemporary Indian Grill',
            walkTime: '7 min walk from FRAMELESS',
            famousFor: 'Chet Sharma’s Sharmaji Lahori Chana, Wagyu Chapli & Chaats (if table booked)',
            tripadvisorUrl: 'https://www.tripadvisor.com/Restaurant_Review-g186338-d23718604-Reviews-BiBi-London_England.html',
            googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=BiBi+Mayfair+London',
          },
        ],
      },
    },
    {
      id: 'mon-faraday-museum',
      time: '2:00–2:45 p.m.',
      title: 'Faraday Museum at the Royal Institution',
      subtitle: 'Birthplace of Electric Power & 10 Chemical Elements (Open Mondays)',
      category: 'museum',
      bookingStatus: 'included',
      neighborhood: 'Mayfair (Albemarle Street)',
      address: '21 Albemarle Street, Mayfair, London W1S 4BS',
      coordinates: { lat: 51.5097, lng: -0.1423 },
      walkOrTransit: '12-minute walk across Grosvenor Square and down New Bond Street to Albemarle Street.',
      image: '/images/royal_institution.jpg',
      summary:
        'Founded in 1799, 21 Albemarle Street is one of the most consequential addresses in human civilization: fourteen Nobel Laureates worked here, ten chemical elements were isolated in its basement, and Michael Faraday built the world’s first electric motor and transformer right beneath your feet.',
      insiderTips: [
        'Open Mondays 9:00 a.m.–5:00 p.m. and free to enter!',
        'Positioned steps off Bond Street, so when you finish at 2:45 p.m. you are literally already in the heart of Mayfair’s top boutiques.',
      ],
      links: buildVenueLinks({
        name: 'Faraday Museum at the Royal Institution',
        city: 'London',
        lat: 51.5097,
        lng: -0.1423,
        tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g186338-d214879-Reviews-Faraday_Museum-London_England.html',
        officialUrl: 'https://www.rigb.org/visit-us/faraday-museum',
      }),
      museumTour: {
        tourId: 'faraday-museum',
        tourTitle: 'Where Modern Electricity Was Born — 45-Min Science Tour',
        narrator: 'Dr. Julian Vance · History of Science Narrator',
        voiceId: 'en-GB-RyanNeural',
        totalDurationMinutes: 40,
        routeStrategy:
          'Head straight downstairs to Lower Ground for Faraday’s preserved 1850s Magnetic Laboratory and the 1831 Induction Ring, then visit the Ground & First Floor displays outside the historic Lecture Theatre.',
        introAudioUrl: '/audio/faraday-museum-intro.mp3',
        introTranscript:
          'Welcome to twenty-one Albemarle Street — the quiet Georgian facade where the modern electrical age began. Incidentally, Albemarle Street became London’s very first one-way street in the nineteenth century because horse-drawn carriages jammed the road rushing to hear Royal Institution science lectures! Descend the stairs to stand before the exact workbench of Michael Faraday, the blacksmith’s son and former bookbinder’s apprentice whose experiments power every turbine, grid, and smartphone on Earth today.',
        highlights: [
          {
            id: 'faraday-magnetic-lab',
            order: 1,
            title: 'Michael Faraday’s Original 1850s Magnetic Laboratory',
            artistOrOrigin: 'Preserved In-Situ Basement Vault · 21 Albemarle St',
            location: 'Lower Ground Floor · Faraday Laboratory',
            durationMinutes: 15,
            image: '/images/faraday_lab.jpg',
            summary:
              'Reconstructed from contemporary watercolors using thousands of Faraday’s own glass bottles, electrostatic jars, electromagnet coils, and handwritten chemical labels.',
            lookClosely:
              'Spot Faraday’s neat handwriting on the glass reagent bottles and the giant electromagnet made from an old ship’s anchor chain.',
            audioUrl: '/audio/faraday-museum-faraday-magnetic-lab.mp3',
            audioScript:
              'Look through the glass into Michael Faraday’s basement Magnetic Laboratory, preserved on the very spot where he worked for nearly half a century. With almost no formal mathematics, Faraday visualized invisible lines of magnetic and electric force stretching through space — inspiring James Clerk Maxwell’s equations and Albert Einstein, who kept a portrait of Faraday on his study wall alongside Isaac Newton.',
          },
          {
            id: 'induction-ring',
            order: 2,
            title: 'The 1831 Electromagnetic Induction Ring & First Electric Motor',
            artistOrOrigin: 'Michael Faraday · August 29, 1831',
            location: 'Lower Ground · Electricity & Magnetism Cases',
            durationMinutes: 15,
            image: '/images/faraday_ring.jpg',
            summary:
              'A humble six-inch iron ring hand-wound with cotton-insulated copper wire — the world’s very first electrical transformer and proof of electromagnetic induction.',
            lookClosely:
              'Look at the frayed calico cotton strips Faraday wrapped by hand between every turn of copper wire so the coils wouldn’t short-circuit.',
            audioUrl: '/audio/faraday-museum-induction-ring.mp3',
            audioScript:
              'Pause before this unassuming iron ring wrapped in rough twine and copper wire. On August twenty-ninth, eighteen thirty-one, Faraday connected a battery to one side of this ring and saw a compass needle twitch on the opposite unconnected coil. In that single instant he discovered electromagnetic induction and invented the electrical transformer. Every power station and electric motor in human industry descends directly from this hand-wound ring.',
          },
          {
            id: 'ri-elements-theatre',
            order: 3,
            title: 'Humphry Davy’s 10 Elements, Miners’ Lamp & Lecture Theatre',
            artistOrOrigin: 'Sodium, Potassium, Calcium, Benzene & Bragg X-Rays',
            location: 'Lower Ground Corridor & First Floor Grand Staircase',
            durationMinutes: 10,
            image: '/images/royal_institution.jpg',
            summary:
              'Explore Sir Humphry Davy’s Miners’ Safety Lamp, Faraday’s original sample vial of liquid benzene (1825), John Tyndall’s greenhouse-gas apparatus, and the home of the 1825 Christmas Lectures.',
            lookClosely:
              'Find the tiny sealed glass phial labelled in Faraday’s own hand: "Bicarburet of Hydrogen" — the discovery sample of benzene!',
            audioUrl: '/audio/faraday-museum-ri-elements-theatre.mp3',
            audioScript:
              'Along the gallery cases you encounter an astonishing roll call of breakthroughs: Humphry Davy’s wire-gauze safety lamp that saved thousands of coal miners’ lives; ten elements of the periodic table including sodium, potassium, magnesium, and calcium first isolated in this building; Faraday’s original eighteen twenty-five glass vial of benzene; and William and Lawrence Bragg’s X-ray crystallography instruments.',
          },
        ],
      },
    },
    {
      id: 'mon-bond-street-shopping',
      time: '2:45–4:00 p.m.',
      title: 'SHOPPING: New Bond Street & Old Bond Street',
      subtitle: 'Nutan’s Principal Luxury Handbags, Shoes & European Maisons Session',
      category: 'shopping',
      bookingStatus: 'included',
      neighborhood: 'Mayfair',
      address: 'New Bond Street & Old Bond Street, Mayfair, London W1S',
      coordinates: { lat: 51.5105, lng: -0.1436 },
      walkOrTransit: '1-minute walk west from Albemarle Street onto Old/New Bond Street.',
      image: '/images/bond_street.jpg',
      summary:
        'Reserved specifically for serious luxury shopping: Albemarle Street steps directly onto the world’s highest concentration of flagship couture houses, handbag salons, fine shoemakers, and Haute Joaillerie under Bond Street’s royal crown Christmas lights.',
      insiderTips: [
        '75–90 dedicated minutes right in Mayfair’s core — prioritize Nutan’s top 2–3 fashion houses so boutique sales associates have time to show full leather/footwear collections.',
        'Burlington Arcade sits just 2 minutes south off Old Bond Street / Piccadilly if Nutan prefers smaller luxury accessory & cashmere boutiques.',
      ],
      links: buildVenueLinks({
        name: 'Bond Street',
        city: 'London',
        lat: 51.5105,
        lng: -0.1436,
        tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g186338-d211859-Reviews-Bond_Street-London_England.html',
        officialUrl: 'https://www.bondstreet.co.uk/',
      }),
      shoppingGuide: {
        priceTier: '£££££',
        bestFor: 'Chanel, Dior, Hermès, Louis Vuitton, Loewe, Celine, Prada handbags & shoes',
        walkFromHotel: '15–20 min walk south of The Langham',
        highlights: [
          {
            storeName: 'Chanel (158–159 New Bond St) & House of Dior (160–162 New Bond St)',
            category: 'Couture, Handbags & Footwear',
            mustSee: 'Three-storey Chanel global flagship & Peter Marino-designed House of Dior side by side right at the Bruton Street corner.',
            locationNote: 'Corner of New Bond St & Bruton St',
          },
          {
            storeName: 'Hermès (155 New Bond St) & Loewe Casa Loewe (41–42 New Bond St)',
            category: 'Silk, Leather Goods & European Design',
            mustSee: 'Hermès silk carrés, enamel bracelets & leather goods; Casa Loewe’s art-gallery-style three-floor flagship.',
            locationNote: 'New Bond Street',
          },
          {
            storeName: 'Louis Vuitton Maison & Old Bond Street Jewellers',
            category: 'Trunks, Bags & Fine Jewellery',
            mustSee: 'Redesigned LV Maison (17–20 New Bond St) plus Cartier, Tiffany & Co., and Ferragamo / Tod’s / Jimmy Choo footwear.',
            locationNote: 'Junction of New & Old Bond Street',
          },
        ],
        photographyTip: 'Pause at the Lawrence Holofcener "Allies" bronze bench sculpture of Churchill & FDR on New Bond Street — especially fitting right after seeing Churchill’s paintings this morning!',
      },
    },
    {
      id: 'mon-50-kalo-dinner',
      time: '4:45–5:45 p.m.',
      title: 'Early Pre-Opera Dinner at 50 Kalò di Ciro Salvo',
      subtitle: 'Europe’s #1 Ranked Artisan Neapolitan Pizzeria · Proposed',
      category: 'dining',
      bookingStatus: 'proposed',
      neighborhood: 'Trafalgar Square / Westminster',
      address: '7 Northumberland Avenue, London WC2N 5BY',
      coordinates: { lat: 51.5071, lng: -0.1264 },
      walkOrTransit: '15-minute stroll down Piccadilly/Haymarket from Bond Street (or brief rest at The Langham first).',
      image: '/images/neapolitan_pizza.jpg',
      summary:
        'Third-generation Neapolitan master dough-maker Ciro Salvo’s only outpost outside Italy, repeatedly crowned #1 Pizzeria in London by 50 Top Pizza Europe and Gambero Rosso. High-hydration ("kalò" = good dough) ultra-digestible crusts make an ideal, unhurried 4:45 p.m. pre-theatre meal.',
      insiderTips: [
        '4:45 p.m. beats the 6:00 p.m. West End rush completely — pizzas arrive blistering hot from the custom mosaic oven in under 6 minutes!',
        'Right beside Embankment Tube (District Line direct east to Tower Hill / Aldgate East for Wilton’s Music Hall).',
      ],
      links: buildVenueLinks({
        name: '50 Kalo di Ciro Salvo London',
        city: 'London',
        lat: 51.5071,
        lng: -0.1264,
        tripadvisorUrl: 'https://www.tripadvisor.co.uk/Restaurant_Review-g186338-d14887461-Reviews-50_Kalo_di_Ciro_Salvo-London_England.html',
        officialUrl: 'https://www.50kalo.it/en/london/',
      }),
      diningGuide: {
        cuisine: 'Artisanal High-Hydration Neapolitan Pizza',
        priceRange: '££',
        accolades: [
          '50 Top Pizza Europe — Best Pizzeria in England',
          'Gambero Rosso Tre Spicchi Honoree',
        ],
        vibe: 'Grand high-ceilinged Westminster dining room with custom tiled Neapolitan wood/electric ovens',
        featuredDishes: [
          {
            name: 'Pizza 50 Kalò (House Signature)',
            badge: 'Internet #1 Order',
            description:
              'Casa Marrazzo yellow and red sweet datterini cherry tomatoes, smoked provola from Campania, extra-virgin olive oil, and 24-month Parmigiano Reggiano on Ciro Salvo’s cloud-light high-hydration crust.',
            dietary: 'Vegetarian',
          },
          {
            name: 'Margherita DOP / Marinara Con Scarola',
            badge: 'Neapolitan Purist Classic',
            description:
              'San Marzano DOP tomatoes, fresh Campania buffalo mozzarella, and fragrant basil — praised online for zero heaviness.',
            dietary: 'Vegetarian',
          },
          {
            name: 'Frittatina di Pasta Napoletana & Crocchè di Patate',
            badge: 'Must-Order Starter',
            description:
              'Crispy golden Neapolitan bucatini & béchamel pasta croquette alongside smoked-provola mashed potato crocchè.',
            dietary: 'Starter',
          },
          {
            name: 'Diavola & Tartufo Specials',
            badge: 'Savoury Favorite',
            description:
              'Artisanal spicy Irpinia salami with fior di latte, or seasonal white/black truffle cream pizza.',
            dietary: 'Savoury',
          },
          {
            name: 'Homemade Neapolitan Tiramisù',
            badge: 'Sweet Finale',
            description:
              'Light mascarpone and espresso savoiardi whipped in-house daily.',
            dietary: 'Dessert',
          },
        ],
      },
    },
    {
      id: 'mon-wiltons-figaro',
      time: '7:00 p.m. Arrival (7:30 p.m. Curtain)',
      title: 'Confirmed: The Marriage of Figaro at Wilton’s Music Hall',
      subtitle: 'World’s Oldest Surviving Grand Music Hall (1859) · Ian McMillan Production',
      category: 'performance',
      bookingStatus: 'confirmed',
      neighborhood: 'Whitechapel / Tower Hill (Graces Alley)',
      address: '1 Graces Alley, London E1 8JB',
      coordinates: { lat: 51.5107, lng: -0.0668 },
      walkOrTransit: 'District Line from Embankment (2 min walk from 50 Kalò) 5 stops east to Tower Hill or Aldgate East + 7-min walk, or 20-min black cab.',
      image: '/images/wiltons_music_hall.jpg',
      summary:
        'A magical finale evening in London’s most atmospheric hidden venue: Wilton’s Music Hall (1859), preserved with its original barley-sugar cast-iron pillars and distressed Victorian grandeur, hosting Bradford Opera Festival’s acclaimed three-night-only adaptation of Mozart’s Marriage of Figaro by poet Ian McMillan starring Oscar Castellino as The Count.',
      insiderTips: [
        'Timing Note: Your itinerary lists 7:00 p.m., while Wilton’s official box office lists 7:30 p.m. curtain (Nov 23–25 run) — arriving at 7:00 p.m. is ideal to enjoy a drink in the historic 1859 Mahogany Bar & inspect the mini music-hall history display!',
        'Ask a black cab or Uber at the end of the opera to pick you up on Ensign Street / Cable Street for an easy 22-minute ride straight back to The Langham.',
      ],
      links: buildVenueLinks({
        name: "Wilton's Music Hall",
        city: 'London',
        lat: 51.5107,
        lng: -0.0668,
        tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g186338-d658728-Reviews-Wilton_s_Music_Hall-London_England.html',
        officialUrl: 'https://wiltons.org.uk/whats-on/the-marriage-of-figaro/',
      }),
    },
  ],
};

export const DAY_7_TUESDAY = {
  id: 'day-7-tue-nov-24',
  dayNumber: 7,
  dateLabel: 'Tue Nov 24',
  fullDate: 'Tuesday, November 24, 2026',
  title: 'Langham Breakfast & Heathrow Departure via Dublin',
  theme: 'Unhurried checkout, private Heathrow transfer & Aer Lingus flight via Dublin to BDL',
  shoppingSummary: 'No sightseeing or shopping scheduled — relaxed travel morning',
  weatherTip: 'Allow 60–75 minutes for morning weekday traffic between Marylebone and Heathrow Terminal 2.',
  stops: [
    {
      id: 'tue-langham-departure',
      time: '7:30–7:45 a.m. Pickup → Noon Flight',
      title: 'Checkout at The Langham & Heathrow Transfer (Aer Lingus via Dublin)',
      subtitle: 'Noon Aer Lingus Flight to Dublin (DUB) Continuing to Bradley (BDL)',
      category: 'transit',
      bookingStatus: 'confirmed',
      neighborhood: 'Marylebone → Heathrow Terminal 2',
      address: 'The Langham, 1C Portland Place → Heathrow Terminal 2 (The Queen’s Terminal)',
      coordinates: { lat: 51.4700, lng: -0.4543 },
      walkOrTransit: 'Prebooked private car from The Langham at 7:30–7:45 a.m. (or taxi to Paddington + 15-min Heathrow Express).',
      image: '/images/heathrow_airport.jpg',
      summary:
        'Enjoy an early breakfast at The Langham, complete checkout, and depart around 7:30–7:45 a.m. for Heathrow Terminal 2 ahead of your approximately noon Aer Lingus departure to Dublin and onward connection to Hartford/Bradley (BDL).',
      insiderTips: [
        'Aer Lingus departs from Heathrow Terminal 2 (The Queen’s Terminal).',
        'Dublin US Preclearance Advantage: During your Dublin connection (Terminal 2), you clear US Customs & Border Protection in Ireland — meaning when you land at BDL you walk straight out like a domestic arrival!',
      ],
      links: buildVenueLinks({
        name: 'London Heathrow Airport Terminal 2',
        city: 'London',
        lat: 51.4700,
        lng: -0.4543,
        tripadvisorUrl: 'https://www.tripadvisor.com/Airport-g186338-qLHR-London_England.html',
        officialUrl: 'https://www.heathrow.com/',
      }),
    },
  ],
};

export const LONDON_DAYS_PART2 = [
  DAY_4_SATURDAY,
  DAY_5_SUNDAY,
  DAY_6_MONDAY,
  DAY_7_TUESDAY,
];
