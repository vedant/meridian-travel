import { buildVenueLinks } from './schema.js';

export const WORLD_ITINERARIES = [
  {
    id: 'rome-renaissance-showcase',
    city: 'Rome & Florence',
    country: 'Italy',
    region: 'Centro Storico, Vatican City, Villa Borghese & Renaissance Florence',
    title: 'Eternal Renaissance: Rome & Florence',
    subtitle: 'Multi-City Italian Art, Architecture & Trattoria Companion',
    travelers: 'Global Showcase Itinerary',
    dates: '3-Day Curated Cultural Edition',
    currency: 'EUR (€)',
    timezone: 'CET (Europe/Rome)',
    heroImage: '/images/rome_hero.jpg',
    summary:
      'Demonstrates Meridian’s multi-city Italian infrastructure: room-by-room museum audio tours of the Vatican Museums, Galleria Borghese, and Florence’s Uffizi Gallery paired with Rome and Florence’s most celebrated internet-famous dishes.',
    stats: [
      { label: 'Cities', value: '2' },
      { label: 'Museum Audio Tours', value: '3' },
      { label: 'Iconic Trattorias', value: '3' },
      { label: 'Masterpieces', value: '9' },
    ],
    baseHotel: {
      name: 'Hotel de Russie, Rome',
      address: 'Via del Babuino 9, 00187 Roma RM, Italy',
      coordinates: { lat: 41.9095, lng: 12.4773 },
      image: '/images/rome_hero.jpg',
      notes: 'Nestled between Piazza del Popolo and the Spanish Steps with terraced secret gardens.',
      links: buildVenueLinks({
        name: 'Hotel de Russie',
        city: 'Rome',
        lat: 41.9095,
        lng: 12.4773,
        tripadvisorUrl: 'https://www.tripadvisor.com/Hotel_Review-g187791-d191125-Reviews-Hotel_de_Russie-Rome_Lazio.html',
        officialUrl: 'https://www.roccofortehotels.com/hotels-and-resorts/hotel-de-russie/',
      }),
    },
    pendingReservations: [
      {
        id: 'rome-borghese',
        day: 'Day 2',
        title: 'Galleria Borghese Strict 2-Hour Timed Entry',
        status: 'action_needed',
        note: 'Capped at 180 visitors per two-hour window; book 30 days ahead.',
        url: 'https://galleriaborghese.beniculturali.it/en/',
      },
    ],
    shoppingAtlas: [
      {
        area: 'Via Condotti & Piazza di Spagna',
        priceLevel: '€€€€€',
        bestFor: 'Bulgari historical flagship, Gucci, Valentino, Fendi Palazzo',
        walkFromLangham: '6 min walk from Hotel de Russie',
        coordinates: { lat: 41.9057, lng: 12.4809 },
        image: '/images/rome_hero.jpg',
        keyStores: ['Bulgari (10 Via dei Condotti)', 'Palazzo Fendi', 'Caffè Greco'],
        links: buildVenueLinks({ name: 'Via dei Condotti', city: 'Rome', lat: 41.9057, lng: 12.4809 }),
      },
    ],
    days: [
      {
        id: 'rome-day-1',
        dayNumber: 1,
        dateLabel: 'Day 1 · Rome',
        fullDate: 'Day 1 — Vatican City & Campo de’ Fiori',
        title: 'Vatican Masterpieces & Roman Salumeria Icons',
        theme: 'Raphael, Michelangelo’s Sistine Ceiling & Legendary Carbonara',
        shoppingSummary: 'Artisanal leather & paper marbling near Via dei Coronari',
        weatherTip: 'Shoulders and knees must be covered inside the Sistine Chapel and St. Peter’s Basilica.',
        stops: [
          {
            id: 'rome-vatican-museums',
            time: '9:00 a.m.–12:30 p.m.',
            title: 'Vatican Museums, Raphael Rooms & Sistine Chapel',
            subtitle: 'Papal Antiquities, School of Athens & Michelangelo’s Vault',
            category: 'museum',
            bookingStatus: 'confirmed',
            neighborhood: 'Vatican City',
            address: 'Viale Vaticano, 00165 Vatican City',
            coordinates: { lat: 41.9065, lng: 12.4536 },
            walkOrTransit: '12-minute taxi across the Tiber from Piazza del Popolo.',
            image: '/images/vatican_school_athens.jpg',
            summary:
              'Nine miles of papal collections culminating in Raphael’s frescoed papal apartments and Michelangelo’s breathtaking Sistine Chapel ceiling and Last Judgment.',
            insiderTips: ['Keep eyes up in the Gallery of Maps — its painted 3D ceiling stucco rivals the frescoes below.'],
            links: buildVenueLinks({
              name: 'Vatican Museums',
              city: 'Rome',
              lat: 41.9065,
              lng: 12.4536,
              tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g187793-d190996-Reviews-Vatican_Museums-Vatican_City_Lazio.html',
              officialUrl: 'https://www.museivaticani.va/',
            }),
            museumTour: {
              tourId: 'vatican-museums',
              tourTitle: 'Raphael Rooms & Sistine Chapel Audio Tour',
              narrator: 'Meridian Renaissance Curator',
              voiceId: 'en-GB-RyanNeural',
              totalDurationMinutes: 120,
              routeStrategy: 'Proceed through the Pine Cone Courtyard and Gallery of Maps directly to the Stanze di Raffaello before descending into the Sistine Chapel.',
              introAudioUrl: '/audio/vatican-museums-intro.mp3',
              introTranscript:
                'Welcome to the Vatican Museums, founded by Pope Julius the Second in fifteen oh six when the marble Laocoön was unearthed in a Roman vineyard. Ahead of us unfold two supreme summits of the High Renaissance painted simultaneously just corridors apart: twenty-five-year-old Raphael painting The School of Athens while Michelangelo lay on high scaffolding transforming the Sistine ceiling.',
              highlights: [
                {
                  id: 'school-of-athens',
                  order: 1,
                  title: 'The School of Athens (1509–1511)',
                  artistOrOrigin: 'Raphael · Stanza della Segnatura',
                  location: 'Second Floor · Papal Apartments (Raphael Rooms)',
                  durationMinutes: 25,
                  image: '/images/vatican_school_athens.jpg',
                  summary:
                    'Classical philosophy harmonized with High Renaissance architecture, featuring Plato (with Leonardo’s face) and Aristotle striding forward.',
                  lookClosely:
                    'Find Michelangelo brooding on the front steps in stonecutter’s boots — added by Raphael at the last moment after sneaking a peek at the Sistine ceiling!',
                  audioUrl: '/audio/vatican-museums-school-of-athens.mp3',
                  audioScript:
                    'Stand in Pope Julius the Second’s private library before Raphael’s School of Athens. At the vanishing point walk Plato, pointing upward to eternal ideals with the bearded features of Leonardo da Vinci, and Aristotle, gesturing outward toward empirical Earth. Down on the marble steps leans a solitary brooding thinker in leather boots: Raphael’s tribute to Michelangelo, added into fresh plaster after seeing the Sistine ceiling next door.',
                },
                {
                  id: 'sistine-ceiling',
                  order: 2,
                  title: 'The Sistine Chapel Ceiling & Creation of Adam',
                  artistOrOrigin: 'Michelangelo Buonarroti · 1508–1512',
                  location: 'Sistine Chapel Vault (Silence Required)',
                  durationMinutes: 30,
                  image: '/images/sistine_chapel.jpg',
                  summary:
                    'Nine Genesis panels framed by muscular ignudi, sibyls, and prophets, centered on the electric millimeter gap between God’s finger and Adam’s.',
                  lookClosely:
                    'Listen to this audio BEFORE stepping past the velvet curtain since talking is prohibited inside; look at how God’s swirling crimson cloak mirrors the silhouette of the human brain.',
                  audioUrl: '/audio/vatican-museums-sistine-ceiling.mp3',
                  audioScript:
                    'Play this chapter just before entering the hushed Sistine Chapel. Protesting that he was a sculptor rather than a painter, Michelangelo spent four grueling years standing — not lying — on arched wooden bridging sixty feet up, craning his neck backward as wet fresco plaster dripped onto his brow. At the center of the vault, God surges forward inside a billowing crimson mantle while a single millimeter of unpainted plaster charges the spark of human consciousness.',
                },
              ],
            },
          },
          {
            id: 'rome-roscioli',
            time: '1:30–3:00 p.m.',
            title: 'Salumeria Roscioli',
            subtitle: 'Rome’s Most Iconic Deli-Restaurant Near Campo de’ Fiori',
            category: 'dining',
            bookingStatus: 'confirmed',
            neighborhood: 'Centro Storico / Regola',
            address: 'Via dei Giubbonari 21, 00186 Roma RM',
            coordinates: { lat: 41.8942, lng: 12.4744 },
            walkOrTransit: '15-minute stroll across Ponte Sant’Angelo and Piazza Navona.',
            image: '/images/carbonara_rome.jpg',
            summary:
              'A fourth-generation Roman baking and gastronomic dynasty combining a gleaming marble salumeria counter with a 2,800-label wine cellar and Rome’s most talked-about Roman pastas.',
            insiderTips: ['Ask for a table downstairs in the brick-vaulted wine cellar or right beside the cheese counter.'],
            links: buildVenueLinks({
              name: 'Salumeria Roscioli',
              city: 'Rome',
              lat: 41.8942,
              lng: 12.4744,
              tripadvisorUrl: 'https://www.tripadvisor.com/Restaurant_Review-g187791-d782951-Reviews-Salumeria_Roscioli-Rome_Lazio.html',
              officialUrl: 'https://www.salumeriaroscioli.com/',
            }),
            diningGuide: {
              cuisine: 'Historic Roman Salumeria & Pasta Temple',
              priceRange: '€€€',
              accolades: ['Eater, Stanley Tucci & Michelin Bib Highlight', 'TripAdvisor 10,000+ Reviews'],
              vibe: 'Bustling cured-meat and artisanal cheese counter with sommelier wine walls',
              featuredDishes: [
                {
                  name: 'La Carbonara di Roscioli',
                  badge: 'Global Internet Legend',
                  description:
                    'Spaghettoni tossed with crispy artisanal guanciale, Paolo Parisi golden egg yolks, Three-Pepper blend, and aged Pecorino Romano.',
                  dietary: 'Signature Pasta',
                },
                {
                  name: 'Burrata Pugliese with Semi-Dried Pachino Tomatoes',
                  badge: 'Must-Order Starter',
                  description:
                    'Flown up fresh from Andria daily and served with crusty Roman pizza bianca from Antico Forno Roscioli around the corner.',
                  dietary: 'Vegetarian',
                },
                {
                  name: 'Cacio e Pepe with Aged Sheep’s Milk Cheeses',
                  badge: 'Roman Classic',
                  description:
                    'Whipped to glossy perfection using three distinct aged pecorino cheeses and toasted Sarawak peppercorns.',
                  dietary: 'Vegetarian',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'rome-day-2',
        dayNumber: 2,
        dateLabel: 'Day 2 · Borghese & Florence',
        fullDate: 'Day 2 — Galleria Borghese & High-Speed Train to Florence',
        title: 'Bernini Marble Miracles, Botticelli’s Venus & Butter Chicken of Florence',
        theme: 'Baroque sculpture, Uffizi Renaissance & Trattoria Sostanza',
        shoppingSummary: 'Santa Maria Novella Officina Profumo-Farmaceutica (1221)',
        weatherTip: '90-minute Frecciarossa high-speed rail links Roma Termini directly to Firenze Santa Maria Novella.',
        stops: [
          {
            id: 'rome-galleria-borghese',
            time: '9:00–11:00 a.m.',
            title: 'Galleria Borghese',
            subtitle: 'Bernini’s Apollo & Daphne and Six Caravaggios',
            category: 'museum',
            bookingStatus: 'action_needed',
            neighborhood: 'Villa Borghese Gardens',
            address: 'Piazzale Scipione Borghese 5, 00197 Roma',
            coordinates: { lat: 41.9142, lng: 12.4922 },
            walkOrTransit: '15-minute scenic walk through Villa Borghese park from Hotel de Russie.',
            image: '/images/apollo_daphne.jpg',
            summary:
              'Cardinal Scipione Borghese’s jewel-box pleasure villa housing Gian Lorenzo Bernini’s astonishing early marble sculptures alongside six Caravaggio canvases.',
            insiderTips: ['Walk a full 360-degree circle around Bernini’s Apollo and Daphne in Room III to watch flesh turn into laurel bark before your eyes.'],
            links: buildVenueLinks({
              name: 'Galleria Borghese',
              city: 'Rome',
              lat: 41.9142,
              lng: 12.4922,
              tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g187791-d190136-Reviews-Galleria_Borghese-Rome_Lazio.html',
            }),
            museumTour: {
              tourId: 'galleria-borghese',
              tourTitle: 'Bernini & Caravaggio Jewel-Box Audio Tour',
              narrator: 'Meridian Baroque Specialist',
              voiceId: 'en-GB-SoniaNeural',
              totalDurationMinutes: 90,
              routeStrategy: 'Begin on the Ground Floor sculptures (Rooms I–VIII) before ascending to the Pinacoteca.',
              introAudioUrl: '/audio/galleria-borghese-intro.mp3',
              introTranscript:
                'Welcome to Villa Borghese, the seventeenth-century suburban palace built by Cardinal Scipione Borghese — history’s most ruthless and discerning art collector. Within these frescoed salons, a twenty-four-year-old Gian Lorenzo Bernini made cold Carrara marble dimple like warm skin and flutter like tender laurel leaves.',
              highlights: [
                {
                  id: 'apollo-and-daphne',
                  order: 1,
                  title: 'Apollo and Daphne (1622–1625)',
                  artistOrOrigin: 'Gian Lorenzo Bernini · Carrara Marble',
                  location: 'Ground Floor · Room III',
                  durationMinutes: 25,
                  image: '/images/apollo_daphne.jpg',
                  summary:
                    'Carved when Bernini was just twenty-four, capturing the split-second metamorphosis as river nymph Daphne’s fingers sprout translucent marble leaves.',
                  lookClosely:
                    'Look at how Bernini drilled paper-thin marble laurel leaves at the tips of Daphne’s outstretched fingers without shattering the stone.',
                  audioUrl: '/audio/galleria-borghese-apollo-and-daphne.mp3',
                  audioScript:
                    'Circle slowly around Room Three from left to right. As sun-god Apollo’s hand grazes Daphne’s waist, bark sweeps upward over her ribs, roots lock her toes into the earth, and her fingertips dissolve into paper-thin marble laurel leaves that ring like porcelain if tapped. Nobody since antiquity had dared carve stone with such weightless motion.',
                },
              ],
            },
          },
          {
            id: 'florence-uffizi-sostanza',
            time: '3:30–8:30 p.m.',
            title: 'Uffizi Gallery & Dinner at Trattoria Sostanza ("Il Troia")',
            subtitle: 'Botticelli’s Birth of Venus + Florence’s Viral Butter Chicken Skillet',
            category: 'museum',
            bookingStatus: 'confirmed',
            neighborhood: 'Florence Historic Center',
            address: 'Piazzale degli Uffizi 6 & Via del Porcellana 25/R, Firenze',
            coordinates: { lat: 43.7678, lng: 11.2553 },
            walkOrTransit: 'High-speed train to Florence + 12-minute walk across Piazza della Signoria.',
            image: '/images/birth_of_venus.jpg',
            summary:
              'Pair Sandro Botticelli’s luminous Birth of Venus and Primavera on the Uffizi’s top corridor with Florence’s legendary 1869 Trattoria Sostanza for sizzling butter-poached chicken breast and meringue cake.',
            insiderTips: ['Book either the 7:30 p.m. or 9:00 p.m. seating at tiny 10-table Trattoria Sostanza weeks ahead!'],
            links: buildVenueLinks({
              name: 'Uffizi Galleries',
              city: 'Florence',
              lat: 43.7678,
              lng: 11.2553,
              tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g187895-d191153-Reviews-Gallerie_degli_Uffizi-Florence_Tuscany.html',
              extraLinks: [
                {
                  label: 'Trattoria Sostanza (TripAdvisor)',
                  platform: 'tripadvisor',
                  url: 'https://www.tripadvisor.com/Restaurant_Review-g187895-d716455-Reviews-Trattoria_Sostanza-Florence_Tuscany.html',
                },
              ],
            }),
            museumTour: {
              tourId: 'uffizi-florence',
              tourTitle: 'Medici Masterpieces at the Uffizi',
              narrator: 'Meridian Renaissance Curator',
              voiceId: 'en-GB-RyanNeural',
              totalDurationMinutes: 90,
              routeStrategy: 'Take the grand Vasari staircase directly to the Second Floor East Corridor (Rooms 10–14 for Botticelli).',
              introAudioUrl: '/audio/uffizi-florence-intro.mp3',
              introTranscript:
                'Welcome to the Uffizi in Florence, built in fifteen sixty by Giorgio Vasari as the administrative offices — uffizi — of Cosimo de’ Medici, before the Medici dynasty crowned the top floor with the greatest collection of Italian Renaissance painting on Earth.',
              highlights: [
                {
                  id: 'birth-of-venus',
                  order: 1,
                  title: 'The Birth of Venus (c. 1485)',
                  artistOrOrigin: 'Sandro Botticelli · Tempera on Canvas',
                  location: 'Second Floor · Rooms 10–14 (Botticelli Hall)',
                  durationMinutes: 25,
                  image: '/images/birth_of_venus.jpg',
                  summary:
                    'Painted on linen canvas rather than heavy wood panel for the Medici family, Botticelli’s goddess glides ashore on a gilded scallop shell.',
                  lookClosely:
                    'Spot the fine strokes of real powdered gold brushed into Venus’s windblown tresses and the trunks of the coastal orange trees.',
                  audioUrl: '/audio/uffizi-florence-birth-of-venus.mp3',
                  audioScript:
                    'Before Sandro Botticelli’s Birth of Venus, notice how ethereal and luminous the surface appears: unusually for fifteenth-century Florence, Botticelli painted on woven canvas rather than gessoed wood, Highlighting every lock of hair and coastal bay leaf with shimmering strokes of pure shell gold.',
                },
              ],
            },
            diningGuide: {
              cuisine: 'Historic 1869 Florentine Trattoria (Trattoria Sostanza)',
              priceRange: '€€€',
              accolades: ['Opened 1869 · Beloved by Julia Child, Anthony Bourdain & TikTok'],
              vibe: 'White-tiled communal tables and open wood-charcoal kitchen',
              featuredDishes: [
                {
                  name: 'Petto di Pollo al Burro (Sizzling Butter Chicken Breast)',
                  badge: 'Internet Cult Phenomenon',
                  description:
                    'Served bubbling furiously in its miniature oval pewter pan of clarified sweet Tuscan butter with a squeeze of lemon — arguably the single most famous non-steak dish in Florence.',
                  dietary: 'Signature',
                },
                {
                  name: 'Tortino di Carciofi (Florentine Artichoke Omelette)',
                  badge: 'Must-Order Starter',
                  description:
                    'Silky flash-cooked violet artichoke frittata charred lightly over wood coals.',
                  dietary: 'Vegetarian',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'kyoto-serenity-showcase',
    city: 'Kyoto',
    country: 'Japan',
    region: 'Higashiyama, Kinugasa, Fushimi & Nishiki',
    title: 'Kyoto: Zen Gardens, Torii Trails & Michelin Kaiseki',
    subtitle: 'Imperial Temples, Market Craft & Three-Star Culinary Heritage',
    travelers: 'Global Showcase Itinerary',
    dates: '2-Day Curated Cultural Edition',
    currency: 'JPY (¥)',
    timezone: 'JST (Asia/Tokyo)',
    heroImage: '/images/kyoto_hero.jpg',
    summary:
      'Proves Meridian’s global versatility outside Europe: meditative audio tours through Kinkaku-ji, Ryoan-ji’s Zen rock garden, and Fushimi Inari’s vermilion mountain shrines alongside Nishiki Market bites and Kikunoi Honten kaiseki.',
    stats: [
      { label: 'UNESCO Sites', value: '3' },
      { label: 'Audio Tours', value: '2' },
      { label: 'Michelin Stars', value: '3★' },
      { label: 'Market Stalls', value: '100+' },
    ],
    baseHotel: {
      name: 'The Ritz-Carlton, Kyoto',
      address: 'Kamogawa Nijo-Ohashi Hotori, Nakagyo-ku, Kyoto',
      coordinates: { lat: 35.0116, lng: 135.7712 },
      image: '/images/kyoto_hero.jpg',
      notes: 'Overlooking the Kamo River and Higashiyama mountains, minutes from Pontocho and Nishiki Market.',
      links: buildVenueLinks({
        name: 'The Ritz-Carlton Kyoto',
        city: 'Kyoto',
        lat: 35.0116,
        lng: 135.7712,
        tripadvisorUrl: 'https://www.tripadvisor.com/Hotel_Review-g298564-d5481363-Reviews-The_Ritz_Carlton_Kyoto-Kyoto_Kyoto_Prefecture_Kinki.html',
      }),
    },
    pendingReservations: [
      {
        id: 'kyoto-kikunoi',
        day: 'Day 1 Evening',
        title: 'Kikunoi Honten Kaiseki Reservation via Hotel Concierge',
        status: 'action_needed',
        note: 'Private tatami rooms book 4–8 weeks ahead via hotel concierge.',
        url: 'https://kikunoi.jp/english/',
      },
    ],
    days: [
      {
        id: 'kyoto-day-1',
        dayNumber: 1,
        dateLabel: 'Day 1 · Zen & Kaiseki',
        fullDate: 'Day 1 — Kinkaku-ji, Ryoan-ji, Nishiki Market & Kikunoi',
        title: 'Golden Pavilion Reflections, Zen Stone Garden & Three-Star Kaiseki',
        theme: 'Muromachi aesthetics, Kyoto’s Kitchen & seasonal haute cuisine',
        shoppingSummary: 'Aritsugu 450-year-old handcrafted kitchen knives & Uji matcha in Nishiki Market',
        weatherTip: 'Slip-on shoes make stepping onto Ryoan-ji’s polished cedar veranda effortless.',
        stops: [
          {
            id: 'kyoto-kinkaku-ryoanji',
            time: '8:45–11:30 a.m.',
            title: 'Kinkaku-ji (Golden Pavilion) & Ryoan-ji Zen Rock Garden',
            subtitle: 'Gold-Leaf Shogun Villa & Fifteen-Stone Karesansui Masterpiece',
            category: 'museum',
            bookingStatus: 'included',
            neighborhood: 'Kita-ku / Ukyo-ku',
            address: '1 Kinkakujicho, Kita Ward, Kyoto',
            coordinates: { lat: 35.0394, lng: 135.7292 },
            walkOrTransit: '20-minute taxi northwest from Kamo River; 15-min walk along the Kinukake-no-Michi path to Ryoan-ji.',
            image: '/images/kyoto_hero.jpg',
            summary:
              'Contrast the dazzling gold-leaf splendor of Ashikaga Yoshimitsu’s Mirror Pond pavilion with the austere wabi-sabi stillness of Ryoan-ji’s world-famous dry landscape rock garden just down the road.',
            insiderTips: ['Arrive at Kinkaku-ji right at 9:00 a.m. gate opening when Kyoko-chi Mirror Pond is glass-still.'],
            links: buildVenueLinks({
              name: 'Kinkakuji Temple',
              city: 'Kyoto',
              lat: 35.0394,
              lng: 135.7292,
              tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g298564-d321456-Reviews-Kinkakuji_Temple-Kyoto_Kyoto_Prefecture_Kinki.html',
            }),
            museumTour: {
              tourId: 'kyoto-zen-gardens',
              tourTitle: 'Gold & Stillness — Kinkaku-ji & Ryoan-ji Audio Guide',
              narrator: 'Meridian East Asian Art Guide',
              voiceId: 'en-GB-SoniaNeural',
              totalDurationMinutes: 90,
              routeStrategy: 'View Kinkaku-ji across Mirror Pond first, follow the moss tea-house path, then sit quietly on the wooden hojo veranda at Ryoan-ji.',
              introAudioUrl: '/audio/kyoto-zen-gardens-intro.mp3',
              introTranscript:
                'Welcome to northern Kyoto’s twin UNESCO masterpieces, embodying the two poles of Muromachi-period Japanese culture: Kitayama brilliance in the shimmering gold leaf of Kinkaku-ji, and Higashiyama Zen restraint in the raked white gravel of Ryoan-ji.',
              highlights: [
                {
                  id: 'golden-pavilion',
                  order: 1,
                  title: 'Kinkaku-ji — Three Architectural Styles in Pure Gold Leaf',
                  artistOrOrigin: '1397 Shogun Ashikaga Yoshimitsu Villa',
                  location: 'Kyoko-chi (Mirror Pond) Viewing Promenade',
                  durationMinutes: 25,
                  image: '/images/kyoto_hero.jpg',
                  summary:
                    'Each of the pavilion’s three tiers represents a distinct era: Heian aristocratic palace (1st floor), Kamakura samurai residence (2nd floor), and Chinese Zen temple hall (3rd floor).',
                  lookClosely:
                    'Notice that the ground floor is deliberately left un-gilded white plaster and natural wood so the top two pure-gold floors appear to float above the water.',
                  audioUrl: '/audio/kyoto-zen-gardens-golden-pavilion.mp3',
                  audioScript:
                    'Look across Mirror Pond at the three tiers of Kinkaku-ji. Notice a subtle architectural secret: the lowest floor is left entirely un-gilded in dark wood and white plaster, while the upper two stories are wrapped in twenty kilograms of pure Kanazawa gold leaf. As sunlight reflects off the ripples of the pond onto the eaves, the golden stories appear to hover weightlessly above the water.',
                },
                {
                  id: 'ryoanji-rocks',
                  order: 2,
                  title: 'Ryoan-ji — The Mystery of the Fifteen Stones',
                  artistOrOrigin: 'Late 15th Century · Rinzai Zen Karesansui',
                  location: 'Hojo Abbot’s Hall Wooden Veranda',
                  durationMinutes: 25,
                  image: '/images/ryoan_ji.jpg',
                  summary:
                    'Fifteen moss-rimmed stones arranged across raked white Shirakawa gravel — composed so that from any seated vantage point on the veranda, at least one stone always remains hidden from view.',
                  lookClosely:
                    'Move slowly from one end of the cedar deck to the other and try counting the stones: whichever spot you choose, only fourteen are visible at once, symbolizing human incompleteness before enlightenment.',
                  audioUrl: '/audio/kyoto-zen-gardens-ryoanji-rocks.mp3',
                  audioScript:
                    'Take a seat on the smooth cedar boards of Ryoan-ji’s veranda. Before you stretches a tennis-court-sized rectangle of raked white gravel holding fifteen natural stones in five mossy clusters, enclosed by clay walls boiled in rapeseed oil that have aged like abstract watercolors. Try counting the stones from where you sit: you will find only fourteen. Only from the perspective of spiritual awakening can all fifteen be perceived together.',
                },
              ],
            },
          },
          {
            id: 'kyoto-nishiki-kikunoi',
            time: '12:30 p.m. Market Lunch & 6:30 p.m. Kikunoi Honten',
            title: 'Nishiki Market Tasting Walk & Kikunoi Honten (3 Michelin Stars)',
            subtitle: '400-Year-Old "Kyoto’s Kitchen" Arcade & Legendary Kaiseki',
            category: 'dining',
            bookingStatus: 'confirmed',
            neighborhood: 'Nakagyo-ku & Higashiyama',
            address: 'Nishikikoji-dori & 459 Shimokawaracho, Higashiyama-ku, Kyoto',
            coordinates: { lat: 35.0050, lng: 135.7649 },
            walkOrTransit: 'Central Kyoto covered arcade; evening taxi to quiet forested Maruyama foothills for Kikunoi.',
            image: '/images/kaiseki_kyoto.jpg',
            summary:
              'Graze Kyoto’s five-block lantern-lit culinary arcade at midday, then experience Chef Yoshihiro Murata’s three-Michelin-starred seasonal kaiseki artistry at Kikunoi Honten.',
            insiderTips: ['In Nishiki Market, eat standing directly in front of the stall where you purchased your skewer rather than walking while eating.'],
            links: buildVenueLinks({
              name: 'Nishiki Market',
              city: 'Kyoto',
              lat: 35.0050,
              lng: 135.7649,
              tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g298564-d321401-Reviews-Nishiki_Market-Kyoto_Kyoto_Prefecture_Kinki.html',
              extraLinks: [
                {
                  label: 'Kikunoi Honten (TripAdvisor)',
                  platform: 'tripadvisor',
                  url: 'https://www.tripadvisor.com/Restaurant_Review-g298564-d1177582-Reviews-Kikunoi_Honten-Kyoto_Kyoto_Prefecture_Kinki.html',
                },
              ],
            }),
            diningGuide: {
              cuisine: 'Kyoto Market Street Delicacies & 3-Michelin-Star Kaiseki',
              priceRange: '¥–¥¥¥¥',
              accolades: ['3 Michelin Stars (Kikunoi Honten)', '400-Year Imperial Market (Nishiki)'],
              vibe: 'Vibrant stained-glass market canopy by day; hushed tatami garden pavilion by night',
              featuredDishes: [
                {
                  name: 'Miki Keiran Rolled Dashi Tamagoyaki & Soy Milk Doughnuts (Nishiki)',
                  badge: 'Viral Nishiki Icons',
                  description:
                    'Fluffy Kyoto-style rolled omelette whisked with rich kelp dashi stock, paired with hot bite-sized Konnaze豆乳 (soy-milk) doughnuts.',
                  dietary: 'Market Favorites',
                },
                {
                  name: 'Kikunoi Seasonal Hassun Platter & Sea Bream Sashimi with Chrysanthemum',
                  badge: '3-Michelin-Star Signature',
                  description:
                    'Chef Murata’s poetic seasonal tableau arranged with autumn maple leaves, chestnuts, and pristine tai sashimi.',
                  dietary: 'Kaiseki Course',
                },
              ],
            },
          },
          {
            id: 'kyoto-fushimi-inari',
            time: 'Next Morning · 7:30–9:30 a.m.',
            title: 'Fushimi Inari Taisha — Ten Thousand Vermilion Torii Gates',
            subtitle: 'Sacred Mount Inari Shrine Tunnel Audio Walk',
            category: 'museum',
            bookingStatus: 'included',
            neighborhood: 'Fushimi-ku',
            address: '68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto',
            coordinates: { lat: 34.9671, lng: 135.7727 },
            walkOrTransit: '10 minutes south via JR Nara Line or Keihan Main Line to Fushimi-Inari Station.',
            image: '/images/fushimi_inari.jpg',
            summary:
              'Founded in 711 AD before Kyoto even became capital, Fushimi Inari winds four kilometers up wooded Mount Inari beneath mesmerizing twin tunnels of donated vermilion torii gates.',
            insiderTips: ['Walk 20 minutes past the crowded Senbon Torii lower loop up to Yotsutsuji intersection for sweeping views over southern Kyoto!'],
            links: buildVenueLinks({
              name: 'Fushimi Inari-taisha Shrine',
              city: 'Kyoto',
              lat: 34.9671,
              lng: 135.7727,
              tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g298564-d321459-Reviews-Fushimi_Inari_taisha_Shrine-Kyoto_Kyoto_Prefecture_Kinki.html',
            }),
            museumTour: {
              tourId: 'fushimi-inari',
              tourTitle: 'Sacred Foxes & Vermilion Gates — Mountain Trail Audio',
              narrator: 'Meridian Cultural Historian',
              voiceId: 'en-GB-RyanNeural',
              totalDurationMinutes: 60,
              routeStrategy: 'Enter via Toyotomi Hideyoshi’s 1589 Romon Gate, pass the Main Honden Shrine, and walk through the twin Senbon Torii colonnades.',
              introAudioUrl: '/audio/fushimi-inari-intro.mp3',
              introTranscript:
                'Welcome to Fushimi Inari Taisha, head shrine of thirty thousand Inari shrines across Japan dedicated to agriculture, rice, sake, and merchant prosperity. Look closely at the stone fox guardians — kitsune — holding granary keys and jewel scrolls in their jaws before stepping into the glowing vermilion tunnel.',
              highlights: [
                {
                  id: 'senbon-torii',
                  order: 1,
                  title: 'Senbon Torii — The Thousand Vermilion Gates',
                  artistOrOrigin: '711 AD Foundation · Edo-to-Modern Merchant Dedications',
                  location: 'Lower Mountain Trail Behind Inner Shrine',
                  durationMinutes: 30,
                  image: '/images/fushimi_inari.jpg',
                  summary:
                    'Thousands of closely spaced cinnabar-orange gates split into twin forest tunnels up Mount Inari.',
                  lookClosely:
                    'Pause and turn backward for a moment: the black calligraphy of every donor company and date is brushed only on the back side of each gate facing downhill!',
                  audioUrl: '/audio/fushimi-inari-senbon-torii.mp3',
                  audioScript:
                    'As you walk uphill through the hypnotic rhythm of Senbon Torii, notice how clean and uninscribed the orange pillars look facing you — then glance over your shoulder! Every single gate’s back face carries bold black calligraphy recording the merchant, artisan, or technology company across Japan that donated it in gratitude for prosperity, using traditional vermilion pigment prized since antiquity to ward off misfortune.',
                },
              ],
            },
          },
        ],
      },
    ],
  },
];
