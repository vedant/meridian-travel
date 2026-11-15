import { buildVenueLinks } from './schema.js';

const LANGHAM_SHOPPING_WALK = [
  {
    step: 1,
    name: '1. The Langham Portland Place',
    walkMinutes: 0,
    highlight:
      'Step out the grand Victorian portico at 1C Portland Place and head south across Oxford Circus onto John Nash’s sweeping Regent Street curve.',
    lat: 51.5178,
    lng: -0.144,
  },
  {
    step: 2,
    name: '2. Upper Regent Street Flagships',
    walkMinutes: 4,
    highlight:
      'Glide beneath the illuminated "Spirit of Christmas" angel canopy past Apple Regent Street (historic 1898 Venetian mosaic facade), Mulberry, Tory Burch, and Burberry’s global flagship at No. 121.',
    lat: 51.515,
    lng: -0.1419,
  },
  {
    step: 3,
    name: '3. Liberty London Tudor Store',
    walkMinutes: 3,
    highlight:
      'Turn onto Great Marlborough Street for the 1924 half-timbered Tudor icon built from two Royal Navy warships — explore silk scarves, Tana Lawn prints, and the soaring central atrium Christmas shop.',
    lat: 51.5139,
    lng: -0.1402,
  },
  {
    step: 4,
    name: '4. Carnaby Street Festive Arch',
    walkMinutes: 2,
    highlight:
      'Slip right behind Liberty into pedestrianized Carnaby Street and charming Kingly Court for festive overhead light installations and independent British lifestyle boutiques.',
    lat: 51.5132,
    lng: -0.1389,
  },
  {
    step: 5,
    name: '5. New Bond Street Maisons',
    walkMinutes: 7,
    highlight:
      'Cross Regent Street west into Mayfair’s haute-luxury artery for the theatrical holiday facades of Dior, Chanel, Louis Vuitton, Hermès, and Loewe.',
    lat: 51.5125,
    lng: -0.145,
  },
  {
    step: 6,
    name: '6. Old Bond Street Jewellers',
    walkMinutes: 5,
    highlight:
      'Continue south toward Piccadilly past Cartier’s red-ribboned flagship, Tiffany & Co., Van Cleef & Arpels, Patek Philippe, and Royal Warrant fine jewellers.',
    lat: 51.5096,
    lng: -0.1417,
  },
  {
    step: 7,
    name: '7. Burlington Arcade Piccadilly',
    walkMinutes: 3,
    highlight:
      'Finish inside Britain’s most storied 1819 covered Regency promenade, patrolled by top-hatted Beadles over a crimson festive carpet lined with Manolo Blahnik, Strathberry, N.Peal cashmere, and Lalique.',
    lat: 51.5091,
    lng: -0.1404,
  },
];

const SHOPPING_ATLAS = [
  {
    area: 'Bond Street / Mayfair',
    priceLevel: '£££££',
    bestFor:
      'Haute couture flagships, high jewellery, Swiss horology, and London’s most extravagant Christmas store facades',
    walkFromLangham: '15–20 min walk',
    coordinates: { lat: 51.5113, lng: -0.1436 },
    image: '/images/bond_street.jpg',
    keyStores: [
      'Chanel',
      'Dior',
      'Hermès',
      'Louis Vuitton',
      'Cartier',
      'Tiffany & Co.',
      'Ralph Lauren Flagship',
    ],
    links: buildVenueLinks({
      name: 'Bond Street Mayfair',
      city: 'London',
      lat: 51.5113,
      lng: -0.1436,
      tripadvisorUrl:
        'https://www.tripadvisor.com/Attraction_Review-g186338-d214802-Reviews-Bond_Street-London_England.html',
      officialUrl: 'https://www.bondstreet.co.uk/',
    }),
  },
  {
    area: 'Burlington Arcade',
    priceLevel: '£££££',
    bestFor:
      'Heritage British leather goods, Scottish cashmere, vintage Rolex watches, fine crystal, and Regency charm under glass',
    walkFromLangham: '20–25 min walk',
    coordinates: { lat: 51.5091, lng: -0.1404 },
    image: '/images/burlington_arcade.jpg',
    keyStores: [
      'Manolo Blahnik',
      'Strathberry',
      'N.Peal Cashmere',
      'Lalique',
      'Penhaligon’s',
      'Ciro Jewellery',
    ],
    links: buildVenueLinks({
      name: 'Burlington Arcade',
      city: 'London',
      lat: 51.5091,
      lng: -0.1404,
      tripadvisorUrl:
        'https://www.tripadvisor.com/Attraction_Review-g186338-d187676-Reviews-Burlington_Arcade-London_England.html',
      officialUrl: 'https://www.burlingtonarcade.com/',
    }),
  },
  {
    area: 'Harrods (Knightsbridge)',
    priceLevel: '££££–£££££',
    bestFor:
      'World-famous Edwardian Food Halls, Harrods signature hampers & tea caddies, Salon de Parfums, and luxury gifts',
    walkFromLangham: 'Underground / 15 min taxi',
    coordinates: { lat: 51.4994, lng: -0.1632 },
    image: '/images/harrods.jpg',
    keyStores: [
      'Harrods Roastery & Bakehall',
      'Tea & Chocolate Hall',
      'Christmas World (Lower Ground)',
      'Shoe Heaven',
      'Fine Watches & Jewellery',
    ],
    links: buildVenueLinks({
      name: 'Harrods',
      city: 'London',
      lat: 51.4994,
      lng: -0.1632,
      tripadvisorUrl:
        'https://www.tripadvisor.com/Attraction_Review-g186338-d187679-Reviews-Harrods-London_England.html',
      officialUrl: 'https://www.harrods.com/',
    }),
  },
  {
    area: 'Selfridges',
    priceLevel: '£££–£££££',
    bestFor:
      'Spectacular theatrical Christmas windows, contemporary designer fashion, The Wonder Room, and iconic yellow-bag beauty hall',
    walkFromLangham: '15–20 min walk',
    coordinates: { lat: 51.5144, lng: -0.1528 },
    image: '/images/selfridges.jpg',
    keyStores: [
      'Selfridges Beauty Hall',
      'The Accessories Hall',
      'Selfridges Foodhall',
      'The Wonder Room (Fine Jewellery & Watches)',
      'Christmas Shop (4th Floor)',
    ],
    links: buildVenueLinks({
      name: 'Selfridges London',
      city: 'London',
      lat: 51.5144,
      lng: -0.1528,
      tripadvisorUrl:
        'https://www.tripadvisor.com/Attraction_Review-g186338-d194285-Reviews-Selfridges-London_England.html',
      officialUrl: 'https://www.selfridges.com/',
    }),
  },
  {
    area: 'Liberty London',
    priceLevel: '£££–££££',
    bestFor:
      'Artisanal silk scarves, Tana Lawn prints, niche perfumery, curated homeware, and London’s most atmospheric timbered Christmas Loft',
    walkFromLangham: '5–7 min walk',
    coordinates: { lat: 51.5139, lng: -0.1402 },
    image: '/images/liberty_london.jpg',
    keyStores: [
      'Liberty Silk & Scarf Hall',
      'The Christmas Shop (4th Floor)',
      'Liberty Beauty & Fragrance Apothecary',
      'Artisanal Jewellery Hall',
      'Haberdashery & Fabrics',
    ],
    links: buildVenueLinks({
      name: 'Liberty London',
      city: 'London',
      lat: 51.5139,
      lng: -0.1402,
      tripadvisorUrl:
        'https://www.tripadvisor.com/Attraction_Review-g186338-d189033-Reviews-Liberty_London-London_England.html',
      officialUrl: 'https://www.libertylondon.com/',
    }),
  },
  {
    area: 'Regent Street',
    priceLevel: '££–££££',
    bestFor:
      'Grand Grade II-listed Portland stone architecture, British heritage flagships, Hamleys toys, and the overhead Angel Christmas lights',
    walkFromLangham: '3–10 min walk',
    coordinates: { lat: 51.5126, lng: -0.1398 },
    image: '/images/regent_street_lights.jpg',
    keyStores: [
      'Burberry Global Flagship (121 Regent St)',
      'Mulberry',
      'Tory Burch',
      'Hamleys',
      'Jo Malone London',
      'Fortnum & Mason (nearby on Piccadilly)',
    ],
    links: buildVenueLinks({
      name: 'Regent Street',
      city: 'London',
      lat: 51.5126,
      lng: -0.1398,
      tripadvisorUrl:
        'https://www.tripadvisor.com/Attraction_Review-g186338-d211859-Reviews-Regent_Street-London_England.html',
      officialUrl: 'https://www.regentstreetonline.com/',
    }),
  },
  {
    area: 'Carnaby Street',
    priceLevel: '££–£££',
    bestFor:
      'Pedestrian-only Soho charm, playful annual holiday light themes, independent British boutiques, and Kingly Court cafés',
    walkFromLangham: '8–12 min walk',
    coordinates: { lat: 51.5132, lng: -0.1389 },
    image: '/images/carnaby_street.jpg',
    keyStores: [
      'Barbour Heritage',
      'Paul Smith Soho',
      ' Astrid & Miyu',
      'Pangaia',
      'Kingly Court Courtyards',
    ].map((s) => s.trim()),
    links: buildVenueLinks({
      name: 'Carnaby Street',
      city: 'London',
      lat: 51.5132,
      lng: -0.1389,
      tripadvisorUrl:
        'https://www.tripadvisor.com/Attraction_Review-g186338-d187677-Reviews-Carnaby_Street-London_England.html',
      officialUrl: 'https://www.carnaby.co.uk/',
    }),
  },
  {
    area: 'Oxford Street',
    priceLevel: '£–£££',
    bestFor:
      'Classic British high-street staples, Marks & Spencer gourmet food & cashmere, John Lewis right near The Langham, and festive starlight canopy',
    walkFromLangham: '5–15 min walk',
    coordinates: { lat: 51.5152, lng: -0.1445 },
    image: '/images/oxford_street.jpg',
    keyStores: [
      'John Lewis & Partners Flagship',
      'Marks & Spencer Pantheon & Marble Arch',
      'Uniqlo 311 Oxford Street',
      'Boots Flagship',
      'Dyson Demo Store',
    ],
    links: buildVenueLinks({
      name: 'Oxford Street',
      city: 'London',
      lat: 51.5152,
      lng: -0.1445,
      tripadvisorUrl:
        'https://www.tripadvisor.com/Attraction_Review-g186338-d187683-Reviews-Oxford_Street-London_England.html',
      officialUrl: 'https://www.oxfordstreet.co.uk/',
    }),
  },
];

Object.defineProperty(SHOPPING_ATLAS, 'langhamShoppingWalk', {
  value: LANGHAM_SHOPPING_WALK,
  enumerable: false,
});

export const LONDON_META = {
  id: 'london-anniversary-2026',
  city: 'London',
  country: 'United Kingdom',
  region: 'Mayfair, Westminster, Bloomsbury, South Kensington & The Cotswolds',
  title: 'London Anniversary & Luxury Companion',
  subtitle: 'November 18–24, 2026 · Six Nights at The Langham, London',
  travelers: 'Curated for Dad & Nutan',
  dates: 'Nov 18 – Nov 24, 2026',
  currency: 'GBP (£)',
  timezone: 'GMT (Europe/London)',
  heroImage: '/images/london_hero.jpg',
  summary:
    'Designed for Dad & Nutan’s November anniversary week at The Langham, this bespoke London companion weaves together a thousand years of royal history, two landmark autumn 2026 exhibitions — Van Eyck: The Portraits at the National Gallery and Winston Churchill: The Painter at The Wallace Collection — and two confirmed theatrical evenings: the National Theatre’s dazzling new Olivier staging of The Jungle Book and Mozart’s The Marriage of Figaro inside Victorian gem Wilton’s Music Hall. Every day is paced with afternoon rest windows, celebrated Michelin-starred Indian and artisanal Neapolitan dining, and 6–8 hours of curated luxury shopping across 8 prime London districts concentrated on Wednesday Nov 18, Saturday Nov 21, and Monday Nov 23 beneath London’s illuminated Christmas canopies.',
  stats: [
    { label: 'Nights at The Langham', value: '6' },
    { label: 'Audio-Guided Tours', value: '10' },
    { label: 'Shopping Districts', value: '8' },
    { label: 'Planned Shopping', value: '6–8 hrs' },
  ],
  baseHotel: {
    name: 'The Langham, London',
    address: '1C Portland Place, Regent Street, Marylebone, London W1B 1JA',
    coordinates: { lat: 51.5178, lng: -0.144 },
    image: '/images/langham_london.jpg',
    notes:
      'Europe’s original Grand Hotel (opened 1865) at the top of Regent Street — steps from Oxford Circus Tube, Liberty London (5–7 min walk), and Mayfair.',
    links: buildVenueLinks({
      name: 'The Langham, London',
      city: 'London',
      lat: 51.5178,
      lng: -0.144,
      tripadvisorUrl:
        'https://www.tripadvisor.com/Hotel_Review-g186338-d187569-Reviews-The_Langham_London-London_England.html',
      officialUrl: 'https://www.langhamhotels.com/en/the-langham/london/',
    }),
  },
  pendingReservations: [
    {
      id: 'res-tower',
      day: 'Thu Nov 19',
      title: 'Tower of London Timed Entry (Noon)',
      status: 'action_needed',
      note: 'Book 12:00 p.m. timed entry including Jewel House access before departing.',
      url: 'https://www.hrp.org.uk/tower-of-london/',
    },
    {
      id: 'res-cruise',
      day: 'Thu Nov 19',
      title: 'City Cruises Thames Sightseeing (4:35 p.m. Tower Pier → Westminster)',
      status: 'action_needed',
      note: 'Winter timetable 4:35 p.m. departure; boarding starts at 4:25 p.m. Tickets still need to be reserved.',
      url: 'https://www.cityexperiences.com/london/city-cruises/',
    },
    {
      id: 'res-tea',
      day: 'Sat Nov 21',
      title: 'Palm Court Festive Afternoon Tea at The Langham (3:30 p.m.)',
      status: 'proposed',
      note: 'Proposed 3:30–5:00 p.m. reservation right inside your hotel before evening Liberty shopping.',
      url: 'https://www.palm-court.co.uk/',
    },
    {
      id: 'res-cotswolds',
      day: 'Sun Nov 22',
      title: 'Private Cotswolds Countryside Tour (8:00 a.m. Langham Pickup)',
      status: 'action_needed',
      note: 'Private driver-guide pickup at The Langham for Stow-on-the-Wold, Lower Slaughter & Bourton-on-the-Water (or swap for Royal Albert Hall Carmina Burana).',
      url: 'https://www.tripadvisor.com/Attractions-g186338-Activities-c42-London_England.html',
    },
  ],
  shoppingAtlas: SHOPPING_ATLAS,
  langhamShoppingWalk: LANGHAM_SHOPPING_WALK,
};

export const LONDON_DAYS_PART1 = [
  // =========================================================================
  // DAY 1 — WEDNESDAY, NOVEMBER 18, 2026
  // =========================================================================
  {
    id: 'london-day-1',
    dayNumber: 1,
    dateLabel: 'Wed Nov 18',
    fullDate: 'Wednesday, November 18, 2026',
    title: 'Anniversary, Luxury Shopping & Christmas Lights',
    theme:
      'Grand arrival at The Langham, golden-hour anniversary portraits beneath Regent Street’s Christmas angels, Mayfair arcade browsing, and Michelin-starred Indian celebratory dining at Benares.',
    shoppingSummary:
      '70 mins curated afternoon luxury stroll (4:15–5:25 p.m.) covering Regent Street flagships, Old & New Bond Street maisons, and historic Burlington Arcade under festive lights.',
    weatherTip:
      'Mid-November London highs hover around 10–12°C (50–54°F) with sunset at 4:08 p.m. — wear tailored wool coats and comfortable leather walking shoes so you stay warm during twilight portraits.',
    stops: [
      {
        id: 'd1-heathrow-arrival',
        time: '9:15 a.m.',
        title: 'Arrive at London Heathrow on Aer Lingus',
        subtitle: 'Terminal 2 Arrival · Smooth Transfer into Marylebone & Mayfair',
        category: 'transit',
        bookingStatus: 'confirmed',
        neighborhood: 'Heathrow → West End',
        address: 'Heathrow Airport, Terminal 2 (The Queen’s Terminal), Hounslow TW6 1EW',
        coordinates: { lat: 51.4706, lng: -0.4543 },
        walkOrTransit:
          'Pre-booked executive chauffeur (50–65 mins door-to-door) or direct Elizabeth Line to Bond Street (33 mins train + 6 min black cab to The Langham)',
        image: '/images/heathrow_airport.jpg',
        summary:
          'Touch down at Heathrow Terminal 2 at 9:15 a.m. on Aer Lingus. Because Terminal 2 connects via covered lifts directly to the Heathrow Central rail hub, you have two effortless ways to reach The Langham: a pre-booked Mercedes S-Class/E-Class chauffeur waiting in Arrivals with a name board, or the spacious, step-free Elizabeth Line straight to Bond Street Station (Hanover Square exit), just half a mile from Portland Place.',
        insiderTips: [
          'If riding the Elizabeth Line, simply tap a contactless credit card or Apple Pay at the purple Oyster gates — no paper ticket needed.',
          'At Bond Street Station, take the lift up to the Hanover Square / Davies Street exit where black cabs wait right at the curb for the 3-minute hop to The Langham.',
          'If booking a private car after an overnight journey, request a 10:15 a.m. pickup buffer so immigration and baggage claim feel completely unhurried.',
        ],
        links: buildVenueLinks({
          name: 'London Heathrow Airport Terminal 2',
          city: 'London',
          lat: 51.4706,
          lng: -0.4543,
          tripadvisorUrl:
            'https://www.tripadvisor.com/Airport-g186338-qLHR-London_Heathrow_Airport-London_England.html',
          officialUrl: 'https://www.heathrow.com/',
        }),
      },
      {
        id: 'd1-langham-checkin',
        time: '11:30 a.m.–2:45 p.m.',
        title: 'Check-in, Light Lunch & Rest at The Langham, London',
        subtitle:
          '11:30 a.m.–12:30 p.m. Arrival & Bag Drop · 12:30–2:45 p.m. The Wigmore Toastie & Rest',
        category: 'hotel',
        bookingStatus: 'confirmed',
        neighborhood: 'Marylebone / Upper Regent Street',
        address: '1C Portland Place, Regent Street, Marylebone, London W1B 1JA',
        coordinates: { lat: 51.5178, lng: -0.144 },
        walkOrTransit: 'Base Hotel · Zero transit required',
        image: '/images/langham_london.jpg',
        summary:
          'Arrive beneath the wrought-iron canopy of Europe’s first "Grand Hotel" (opened by the Prince of Wales in 1865 and scented with The Langham’s signature ginger flower fragrance). Check in — mentioning your anniversary celebration at the front desk — and slip next door into The Wigmore, The Langham’s refined Victorian tavern overseen by chef Michel Roux Jr., for a relaxed arrival bite before resting and dressing for your afternoon photo walk (12:30–2:45 p.m.).',
        insiderTips: [
          'Order The Wigmore’s internet-famous XXL Stovetop Three-Cheese & Mustard Toastie (Montgomery’s Cheddar, Ogleshield, and Raclette with sweet onion & cornichon relish, sliced right at the table) — one toastie shared with soup or spiced masala chips is arrival perfection.',
          'Let Guest Relations know you are celebrating your anniversary; The Langham is renowned for thoughtful in-room touches and priority early room readiness.',
          'Use the 1:15–2:45 p.m. window to unpack coats, steam evening attire, and recharge before stepping out into the crisp afternoon light.',
        ],
        links: buildVenueLinks({
          name: 'The Langham, London',
          city: 'London',
          lat: 51.5178,
          lng: -0.144,
          tripadvisorUrl:
            'https://www.tripadvisor.com/Hotel_Review-g186338-d187569-Reviews-The_Langham_London-London_England.html',
          officialUrl: 'https://www.langhamhotels.com/en/the-langham/london/',
        }),
      },
      {
        id: 'd1-anniversary-photo-session',
        time: '3:00–4:15 p.m.',
        title: 'Anniversary Photo Session at The Langham & Regent Street',
        subtitle: 'Golden Hour into Twilight Beneath the "Spirit of Christmas" Angels',
        category: 'scenic',
        bookingStatus: 'included',
        neighborhood: 'Portland Place & Regent Street',
        address: 'Portland Place & Regent Street Quadrant, London W1B 1JA',
        coordinates: { lat: 51.5162, lng: -0.1431 },
        walkOrTransit: 'Begins on The Langham front steps · Gentle 5–8 min stroll south',
        image: '/images/regent_street_lights.jpg',
        summary:
          'Timed intentionally around mid-November’s 4:08 p.m. sunset, this 75-minute window captures two completely different moods in a single walk: soft golden-hour light against The Langham’s creamy Victorian stone facade and John Nash’s classical All Souls Church spire at 3:00 p.m., transitioning seamlessly at 3:50–4:15 p.m. into velvety cobalt "blue hour" as 300,000 warm-white LEDs ignite across Regent Street’s soaring "Spirit of Christmas" angel wings.',
        insiderTips: [
          'Start at 3:00 p.m. on the quiet Portland Place median opposite The Langham entrance and beside the circular colonnade of All Souls Langham Place before crowds build further south.',
          'By 3:55 p.m., position yourselves on the wide central pedestrian island near Little Argyll Street or New Burlington Street looking south down the sweeping curve of Regent Street — the perspective stacks four rows of glowing angels overhead with red double-decker buses trailing behind you.',
          'On iPhone, tap to focus on your faces and slide exposure slightly down (-0.3 EV) at twilight so the overhead angel wings show crisp individual feathers rather than blowing out white.',
        ],
        links: buildVenueLinks({
          name: 'Regent Street Christmas Lights',
          city: 'London',
          lat: 51.5162,
          lng: -0.1431,
          tripadvisorUrl:
            'https://www.tripadvisor.com/Attraction_Review-g186338-d211859-Reviews-Regent_Street-London_England.html',
          officialUrl: 'https://www.regentstreetonline.com/',
        }),
      },
      {
        id: 'd1-shopping-regent-street',
        time: '4:15–4:45 p.m.',
        title: 'SHOPPING: Regent Street Boutiques & Christmas Lights',
        subtitle: 'British Heritage Flagships Along John Nash’s Grand Sweep',
        category: 'shopping',
        bookingStatus: 'included',
        neighborhood: 'Regent Street',
        address: '121 Regent Street, St. James’s, London W1B 4TB',
        coordinates: { lat: 51.5112, lng: -0.1391 },
        walkOrTransit: 'Leisurely stroll down Regent Street from Oxford Circus toward Piccadilly',
        image: '/images/regent_street_lights.jpg',
        summary:
          'Kick off your London luxury shopping beneath the newly lit Regent Street angels. Built in 1819 as London’s first purpose-designed ceremonial shopping boulevard, Regent Street pairs grand Grade II-listed Portland stone facades with spacious, unhurried British and international flagship stores.',
        insiderTips: [
          'Step inside Burberry’s monumental flagship at 121 Regent Street — formerly a 1920s cinema — to feel heritage Yorkshire-woven cashmere scarves and classic Kensington trench coats around its sweeping central staircase.',
          'Keep hands free on night one: ask any Regent Street flagship to courier purchases complimentary to the Concierge Desk at The Langham, or earmark favourites to revisit on Saturday afternoon.',
          'Fortnum & Mason on nearby Piccadilly stays open until 8:00 p.m. (9:00 p.m. in peak festive weeks), with its famous advent-calendar facade lighting up every window just two minutes past the southern curve.',
        ],
        links: buildVenueLinks({
          name: 'Burberry 121 Regent Street',
          city: 'London',
          lat: 51.5112,
          lng: -0.1391,
          tripadvisorUrl:
            'https://www.tripadvisor.com/Attraction_Review-g186338-d211859-Reviews-Regent_Street-London_England.html',
          officialUrl: 'https://www.regentstreetonline.com/',
        }),
        shoppingGuide: {
          priceTier: '££–££££',
          bestFor:
            'British trench coats & cashmere scarves, leather handbags, fragrance, and royal-warrant gourmet teas nearby',
          walkFromHotel: '3–10 min walk south down Regent Street',
          highlights: [
            {
              storeName: 'Burberry Global Flagship',
              category: 'British Luxury Heritage',
              mustSee:
                'Bespoke monogrammed Scottish cashmere check scarves and heritage trench coats inside a soaring 1921 Beaux-Arts theatre space.',
              locationNote: '121 Regent Street (West pavement)',
            },
            {
              storeName: 'Mulberry',
              category: 'Somerset Leather Goods',
              mustSee:
                'Iconic Bayswater and Amberley leather handbags crafted in Somerset with warm brass hardware.',
              locationNote: '100 Regent Street',
            },
            {
              storeName: 'Tory Burch',
              category: 'Contemporary Luxury Ready-to-Wear & Accessories',
              mustSee:
                'Jewel-toned velvet evening bags, silk resort pieces, and sculpted flats in an intimate townhouse-style salon.',
              locationNote: '149 Regent Street',
            },
            {
              storeName: 'Fortnum & Mason (Nearby Detour)',
              category: 'Royal Grocer Since 1707',
              mustSee:
                'Animated Christmas window displays, Royal Blend loose-leaf tea tins, and hand-iced festive biscuits.',
              locationNote: '181 Piccadilly (3 min walk from lower Regent Street)',
            },
          ],
          photographyTip:
            'Pause at the Vigo Street / Glasshouse Street junction looking north to frame the entire illuminated S-curve of Regent Street.',
        },
      },
      {
        id: 'd1-shopping-burlington-bond',
        time: '4:45–5:25 p.m.',
        title: 'SHOPPING: Burlington Arcade & Bond Street',
        subtitle: '1819 Regency Glass Arcade, Top-Hatted Beadles & Haute Couture Maisons',
        category: 'shopping',
        bookingStatus: 'included',
        neighborhood: 'Piccadilly & Mayfair',
        address: '51 Piccadilly, Mayfair, London W1J 0QJ',
        coordinates: { lat: 51.5091, lng: -0.1404 },
        walkOrTransit: '4 min walk west via Vigo Street / Burlington Gardens',
        image: '/images/burlington_arcade.jpg',
        summary:
          'Turn off Regent Street along Burlington Gardens to enter the jewel-box northern arch of Burlington Arcade (opened in 1819 by Lord George Cavendish so his wife and polite society could shop sheltered from mud and horse-drawn carriages), then emerge onto Old and New Bond Street where the world’s grand luxury houses unveil multi-storey holiday light sculptures.',
        insiderTips: [
          'Say hello to the Burlington Beadles — Britain’s oldest private police force in Victorian frock coats and top hats — who still enforce the whimsical 1819 rules forbidding whistling, running, or opening an umbrella inside the arcade!',
          'Walk south-to-north or north-to-south along the plush crimson holiday carpet inside Burlington Arcade, then step onto Old Bond Street to admire Cartier’s entire building wrapped like a glowing red-and-gold gift box.',
          'Strathberry (No. 32–33 Burlington Arcade) is beloved by Catherine, Princess of Wales for its signature gold-bar midi totes — a quintessential British keepsake.',
        ],
        links: buildVenueLinks({
          name: 'Burlington Arcade',
          city: 'London',
          lat: 51.5091,
          lng: -0.1404,
          tripadvisorUrl:
            'https://www.tripadvisor.com/Attraction_Review-g186338-d187676-Reviews-Burlington_Arcade-London_England.html',
          officialUrl: 'https://www.burlingtonarcade.com/',
        }),
        shoppingGuide: {
          priceTier: '£££££',
          bestFor:
            'Artisanal British leather bags, Scottish cashmere, French crystal, couture shoes, and Bond Street flagship window displays',
          walkFromHotel: '18–22 min walk (or 8 min taxi back along Regent Street)',
          highlights: [
            {
              storeName: 'Manolo Blahnik',
              category: 'Couture Footwear',
              mustSee:
                'Jewel-buckled Hangisi satin pumps and velvet evening slippers displayed across two intimate Regency jewel-box rooms.',
              locationNote: '32–33 Burlington Arcade',
            },
            {
              storeName: 'Strathberry & N.Peal Cashmere',
              category: 'Royal-Favourite Leather & Cashmere',
              mustSee:
                'Strathberry’s structured Mosaic and Midi Tote handbags alongside N.Peal’s ultra-soft Mongolian cashmere wraps (supplier to 007 films since 1936).',
              locationNote: 'Burlington Arcade Central Promenade',
            },
            {
              storeName: 'Lalique',
              category: 'Fine French Crystal & Art Deco',
              mustSee:
                'Luminous satin-finished crystal sculptures, perfume flacons, and jewellery glowing beneath the arcade’s festive garlands.',
              locationNote: '47 Burlington Arcade & 162 New Bond Street',
            },
            {
              storeName: 'Chanel, Dior, Hermès & Louis Vuitton',
              category: 'New & Old Bond Street Flagships',
              mustSee:
                'London’s most theatrical Christmas facades — Dior’s celestial carousel motifs, Chanel’s glowing tweed-and-pearl installations, Hermès at 155 New Bond St, and Louis Vuitton’s Maison d’Art.',
              locationNote: 'Intersection of New Bond Street & Bruton Street',
            },
          ],
          photographyTip:
            'Stand just inside the Burlington Gardens entrance of Burlington Arcade for a symmetrical shot down the red carpet beneath suspended golden Christmas baubles, then capture Dior and Cartier at the Bruton Street / Bond Street corner.',
        },
      },
      {
        id: 'd1-berkeley-square-aperitif',
        time: '5:25–6:30 p.m.',
        title: 'Stroll to Berkeley Square & Pre-Dinner Anniversary Aperitif',
        subtitle: 'Historic London Plane Trees & Intimate Mayfair Cocktail Pause',
        category: 'scenic',
        bookingStatus: 'included',
        neighborhood: 'Mayfair',
        address: 'Berkeley Square, Mayfair, London W1J 6BR',
        coordinates: { lat: 51.5097, lng: -0.1455 },
        walkOrTransit: '5 min gentle stroll west along Bruton Street from Bond Street',
        image: '/images/berkeley_square.jpg',
        summary:
          'Follow elegant Bruton Street — birthplace of Queen Elizabeth II at No. 17 — straight into leafy Berkeley Square, shaded by colossal London plane trees planted in 1789 (among the oldest surviving trees in central London). With an unhurried hour before your 6:45 p.m. reservation, settle in for a celebratory anniversary toast either at the world-renowned Connaught Bar just off the square on Mount Street or right upstairs in the glowing lounge bar of Benares on Berkeley Square.',
        insiderTips: [
          'If you fancy one of the world’s most legendary martinis or non-alcoholic botanical elixirs, The Connaught Bar (Carlos Place, 3 mins from the square) mixes bespoke bitters tableside from its silver trolley — walk-ins at 5:30 p.m. often snag a plush leather banquette.',
          'Prefer zero extra walking before dinner? Head straight into Benares Lounge at 45 Berkeley Square around 6:00 p.m., where passionfruit-cardamom mocktails and champagne are served beside tranquil floating-flower water pools.',
          'Listen for the quiet hush under Berkeley Square’s 235-year-old plane trees — immortalized in the 1940 wartime ballad "A Nightingale Sang in Berkeley Square."',
        ],
        links: buildVenueLinks({
          name: 'Berkeley Square Mayfair',
          city: 'London',
          lat: 51.5097,
          lng: -0.1455,
          tripadvisorUrl:
            'https://www.tripadvisor.com/Attraction_Review-g186338-d214804-Reviews-Berkeley_Square-London_England.html',
          officialUrl: 'https://www.the-connaught.co.uk/restaurants-bars/connaught-bar/',
        }),
      },
      {
        id: 'd1-benares-dinner',
        time: '6:45 p.m.',
        title: 'Confirmed Anniversary Dinner at Benares Mayfair',
        subtitle: 'Michelin-Starred Modern Indian Gastronomy Overlooking Berkeley Square',
        category: 'dining',
        bookingStatus: 'confirmed',
        neighborhood: 'Mayfair',
        address: '45 Berkeley Square, Mayfair, London W1J 5AS',
        coordinates: { lat: 51.5092, lng: -0.1463 },
        walkOrTransit: 'On Berkeley Square · 6 min black cab back to The Langham after dinner',
        image: '/images/indian_fine_dining.jpg',
        summary:
          'Celebrate your anniversary evening at Benares, one of Mayfair’s crown-jewel Michelin-starred Indian restaurants, named after India’s sacred riverside city of Varanasi. Ascend the candlelit staircase past shimmering lily ponds filled with floating marigold and rose petals into a warm, moody dining room where Executive Chef Sameer Taneja pairs prime Scottish seafood and British game with deeply aromatic regional Indian spices — offering dedicated Tasting Menus (including a full Vegetarian Tasting Menu) as well as à la carte classics.',
        insiderTips: [
          'Confirm that your reservation notes "Wedding Anniversary Celebration" — the pastry team plates a bespoke chocolate-and-gold celebratory message with petit fours.',
          'Both the 8-course Tasting Menu and full Vegetarian Tasting Menu can be ordered across the same table, or order à la carte so you don’t miss the 24-hour Dal Benares and warm truffle or garlic naan.',
          'After dinner, the Benares doorman will hail an iconic London black cab right outside 45 Berkeley Square for an effortless 6-minute ride straight back up Regent Street to The Langham.',
        ],
        links: buildVenueLinks({
          name: 'Benares Restaurant & Bar',
          city: 'London',
          lat: 51.5092,
          lng: -0.1463,
          tripadvisorUrl:
            'https://www.tripadvisor.com/Restaurant_Review-g186338-d731399-Reviews-Benares_Restaurant_Bar-London_England.html',
          michelinUrl:
            'https://guide.michelin.com/gb/en/greater-london/london/restaurant/benares',
          officialUrl: 'https://www.benaresrestaurant.com/',
        }),
        diningGuide: {
          cuisine: 'Modern Indian Fine Dining',
          priceRange: '££££',
          accolades: [
            '1 Michelin Star (Michelin Guide Great Britain & Ireland)',
            'TripAdvisor Travellers’ Choice Best of the Best · 3,500+ Reviews',
            '3 AA Rosettes for Culinary Excellence',
          ],
          vibe: 'Candlelit floating-petal water features, warm silk-panelled glamour, and polished Mayfair hospitality.',
          dressCode: 'Smart Elegant (collared shirts / smart knitwear & tailored trousers; no athletic wear)',
          featuredDishes: [
            {
              name: 'Hand-Dived Scottish Scallops with Malabar Curry',
              badge: 'Michelin Icon',
              description:
                'Caramelized Orkney scallops resting on fragrant coastal Kerala coconut-tamarind Malabar sauce with crispy curry leaves — Benares’s single most photographed starter.',
              dietary: 'Seafood',
            },
            {
              name: 'Tandoori Raan & Smoked Kashmiri Lamb Chops',
              badge: 'Chef Signature',
              description:
                'Slow-braised and clay-oven roasted lamb finished with smoky Kashmiri chilli, clove, and rogan josh jus that melts off the bone.',
              dietary: 'Meat',
            },
            {
              name: 'Samosa Ragda Tartlet / Banarasi Street Chaat',
              badge: 'Internet Icon',
              description:
                'A jewel-like fine-dining tribute to Varanasi street food: gossamer pastry shell filled with spiced white-pea ragda, sweet tamarind, yoghurt pearls, and pomegranate.',
              dietary: 'Vegetarian',
            },
            {
              name: 'Old Delhi Murgh Makhani & 24-Hour Dal Benares',
              badge: 'Crowd Favourite',
              description:
                'Charcoal-smoked tandoori chicken in velvety heirloom-tomato fenugreek glaze, paired with black urad lentils simmered overnight for 24 hours.',
              dietary: 'Meat / Vegetarian Side',
            },
            {
              name: 'Tandoori Paneer Tikka & Subz Tarkari Dum Biryani',
              badge: 'Vegetarian Star',
              description:
                'Artisanal paneer marinated in saffron and roasted bell pepper alongside aged basmati rice sealed under flaky puff-pastry parda with seasonal root vegetables and rosewater.',
              dietary: 'Vegetarian',
            },
            {
              name: 'Steamed Passionfruit Bhapa Doi / Saffron Rasmalai',
              badge: 'Must-Order Dessert',
              description:
                'Silky Bengali steamed yoghurt cheesecake lifted with bright passionfruit gel and pistachio crumble, or feather-light saffron milk dumplings.',
              dietary: 'Sweet / Vegetarian',
            },
          ],
        },
      },
    ],
  },

  // =========================================================================
  // DAY 2 — THURSDAY, NOVEMBER 19, 2026
  // =========================================================================
  {
    id: 'london-day-2',
    dayNumber: 2,
    dateLabel: 'Thu Nov 19',
    fullDate: 'Thursday, November 19, 2026',
    title: 'Borough Market, Tower of London & Thames Cruise',
    theme:
      'A thousand years of London riverside flavours and royal drama — from viral gourmet bites at Borough Market to the Crown Jewels, Koh-i-Noor history, and a twilight Thames glide to Big Ben.',
    shoppingSummary:
      'Artisanal edible gift browsing at Borough Market (10:00–11:15 a.m.) for small-batch British preserves, single-estate teas, truffle oils, and handmade chocolates.',
    weatherTip:
      'Today involves exposed medieval battlements at the Tower of London and open-air river views at 4:35 p.m. — bring warm scarves, gloves, and sit inside the heated glass cabin on City Cruises until stepping onto the stern deck for photos.',
    stops: [
      {
        id: 'd2-borough-market',
        time: '9:15 a.m. Depart → 10:00–11:15 a.m.',
        title: 'Borough Market — Specialty Foods & Early Grazing Lunch',
        subtitle:
          '9:15 a.m. Depart The Langham · Arrive Right at 10:00 a.m. Opening Before Midday Queues',
        category: 'dining',
        bookingStatus: 'included',
        neighborhood: 'Southwark / London Bridge',
        address: '8 Southwark Street, London SE1 1TL',
        coordinates: { lat: 51.5055, lng: -0.091 },
        walkOrTransit:
          'Depart 9:15 a.m.: Oxford Circus → Waterloo (Bakerloo Line) → London Bridge (Jubilee Line, ~22 mins total) or 25 min black cab',
        image: '/images/borough_market.jpg',
        summary:
          'Operating on the southern approach to London Bridge since at least 1014 AD, Borough Market is Britain’s oldest and greatest gourmet food hall beneath Victorian wrought-iron and glass arches dressed in festive evergreen wreaths. Arriving right at the 10:00 a.m. bell is the ultimate insider move: you beat the 12:30 p.m. office and TikTok crowds completely, letting you share freshly griddled cheese toasties, warm spiced apple crumble, and artisan coffee in total comfort.',
        insiderTips: [
          'Arrive at Three Crown Square right at 10:00 a.m. — queues at Humble Crumble, Kappacasein, and Bread Ahead are under 3 minutes at 10:10 a.m. versus 35+ minutes by noon!',
          'Share half-portions across three or four stalls rather than filling up at one spot, then browse the covered Green Market aisle for lightweight gourmet gifts to pack home.',
          'Most stalls are 100% cashless — tap contactless card or Apple Pay everywhere.',
        ],
        links: buildVenueLinks({
          name: 'Borough Market',
          city: 'London',
          lat: 51.5055,
          lng: -0.091,
          tripadvisorUrl:
            'https://www.tripadvisor.com/Attraction_Review-g186338-d187716-Reviews-Borough_Market-London_England.html',
          officialUrl: 'https://boroughmarket.org.uk/',
        }),
        diningGuide: {
          cuisine: 'Historic British & Global Artisanal Food Market',
          priceRange: '£–££',
          accolades: [
            'London’s #1 Culinary Landmark (1,000+ Years of History)',
            'TripAdvisor 4.5★ (31,000+ Traveller Reviews)',
          ],
          vibe: 'Bustling Victorian ironwork arches scented with melting Somerset cheddar, mulled wine spices, and roasting Monmouth coffee.',
          featuredDishes: [
            {
              name: 'Kappacasein Ogleshield Cheese Toastie & Raclette',
              badge: 'Legendary Classic',
              description:
                'Anthony Bourdain’s favourite London bite: Poilâne sourdough pressed golden around a fiery-savory blend of Montgomery’s Cheddar, Ogleshield, Comté, and three kinds of chopped onions, plus molten raclette scraped over baby potatoes.',
              dietary: 'Vegetarian',
            },
            {
              name: 'Ginger Pig Hot Free-Range Sausage Roll',
              badge: 'British Icon',
              description:
                'Flaky, deeply golden all-butter puff pastry wrapped around coarsely ground Yorkshire pork seasoned with sage and cracked black pepper, served piping hot from the oven.',
              dietary: 'Meat',
            },
            {
              name: 'Humble Crumble Hot Apple & Berry Crumble with Custard',
              badge: 'Viral Sensation',
              description:
                'Cinnamon-braised Bramley apples and winter berries topped with buttery shortbread crumble, blowtorched marshmallow or edible rose petals, and drowned in unlimited hot vanilla custard.',
              dietary: 'Sweet / Vegetarian',
            },
            {
              name: 'Bread Ahead Pistachio & Crème Brûlée Doughnuts',
              badge: 'Internet Icon',
              description:
                'Pillowy brioche doughnuts bursting with velvety roasted Sicilian pistachio cream or crackly caramelized vanilla custard.',
              dietary: 'Sweet / Vegetarian',
            },
            {
              name: 'Turnips Chocolate-Covered Strawberries',
              badge: 'TikTok Viral',
              description:
                'Juicy jumbo strawberries ladled under a warm fountain of silky Belgian milk chocolate inside a reusable cup.',
              dietary: 'Sweet / Vegetarian',
            },
            {
              name: 'Neal’s Yard Dairy British Farmhouse Cheeses',
              badge: 'Artisanal Tasting',
              description:
                'World-renowned cheesemongers offering generous tastings of Colston Bassett Stilton, Cornish Yarg wrapped in nettles, and aged Westcombe Cheddar.',
              dietary: 'Vegetarian',
            },
            {
              name: 'Padella Fresh Pici Cacio e Pepe (Stoney Street Edge)',
              badge: 'Michelin Bib Gourmand',
              description:
                'Hand-rolled thick Tuscan pici pasta tossed in aged Parmigiano-Reggiano and cracked black pepper right at the edge of the market (virtual queue opens right before noon if craving pasta).',
              dietary: 'Vegetarian',
            },
            {
              name: 'Monmouth Coffee Company Filter Pour-Over & Flat White',
              badge: 'Cult Coffee',
              description:
                'London’s pioneering specialty roaster on Park Street pouring single-estate filter coffees and velvety flat whites alongside warm morning pastries.',
              dietary: 'Vegetarian',
            },
          ],
        },
        shoppingGuide: {
          priceTier: '££',
          bestFor:
            'Packable gourmet souvenirs: small-batch British fruit preserves, single-estate teas, truffle condiments, and artisan chocolates',
          walkFromHotel: '22 mins via Jubilee & Bakerloo Lines',
          highlights: [
            {
              storeName: 'Rosebud Preserves & Artisan Pantry Stalls',
              category: 'Small-Batch British Jams & Chutneys',
              mustSee:
                'Yorkshire Seville orange marmalade, raspberry preserve, and spiced Christmas fig chutney in luggage-friendly jars.',
              locationNote: 'Three Crown Square & Green Market',
            },
            {
              storeName: 'East India Company / Single-Estate Tea Merchants',
              category: 'Fine Loose-Leaf Teas & Spices',
              mustSee:
                'First-flush Darjeeling, Assam golden tips, and festive spiced chai blends in decorative tins.',
              locationNote: 'Middle Road Covered Aisle',
            },
            {
              storeName: 'Artisan du Chocolat & Rabot Estate Cacao',
              category: 'Handmade British Chocolates',
              mustSee:
                'Sea-salted caramels in blown-glass pearls and single-estate Saint Lucian dark chocolate bars.',
              locationNote: 'Park Street & Winchester Walk',
            },
          ],
        },
      },
      {
        id: 'd2-southwark-river-walk',
        time: '11:15 a.m.–12:00 p.m.',
        title: 'Scenic Walk via Southwark Riverfront to Tower of London',
        subtitle: 'Southwark Cathedral, Hay’s Galleria, HMS Belfast & Crossing Tower Bridge',
        category: 'scenic',
        bookingStatus: 'included',
        neighborhood: 'Southwark → Tower Bridge → Tower Hill',
        address: 'The Queen’s Walk, South Bank, London SE1 2AA',
        coordinates: { lat: 51.5065, lng: -0.0813 },
        walkOrTransit: 'Flat, pedestrianized 1.1-mile Thames Path stroll (35–40 mins with photo stops)',
        image: '/images/hms_belfast.jpg',
        summary:
          'Walk off your Borough Market feast along one of London’s finest traffic-free riverside promenades. Pass the Gothic choir of 13th-century Southwark Cathedral, cut beneath the soaring glass barrel vault of Hay’s Galleria (a converted Victorian tea clipper wharf), stroll past the formidable WWII cruiser HMS Belfast, and walk right across the Victorian Gothic bascules of Tower Bridge to arrive at the Tower of London’s West Gate by noon.',
        insiderTips: [
          'As you approach City Hall (The Scoop), pause at the riverside railing: it frames the single cleanest, widest two-shot of both HMS Belfast and Tower Bridge together.',
          'Walk across Tower Bridge on the WEST pavement (upstream side) for panoramic views back toward the Shard, London Bridge, and the City skyscrapers, or cross to the EAST pavement mid-span to look down-river toward Canary Wharf.',
          'Restrooms and warm cafés are conveniently tucked inside Hay’s Galleria halfway along the walk.',
        ],
        links: buildVenueLinks({
          name: 'The Queen’s Walk & HMS Belfast Viewpoint',
          city: 'London',
          lat: 51.5065,
          lng: -0.0813,
          tripadvisorUrl:
            'https://www.tripadvisor.com/Attraction_Review-g186338-d187549-Reviews-HMS_Belfast-London_England.html',
          officialUrl: 'https://www.iwm.org.uk/visits/hms-belfast',
        }),
      },
      {
        id: 'd2-tower-of-london',
        time: '12:00–3:45 p.m.',
        title: 'Tower of London — Complete Royal Fortress & Crown Jewels Tour',
        subtitle:
          'UNESCO World Heritage Fortress · Jewel House, Koh-i-Noor History, White Tower & Yeoman Warders',
        category: 'museum',
        bookingStatus: 'action_needed',
        neighborhood: 'Tower Hill',
        address: 'Tower of London, St Katharine’s & Wapping, London EC3N 4AB',
        coordinates: { lat: 51.5081, lng: -0.0759 },
        walkOrTransit: 'Arrive on foot directly off the north end of Tower Bridge',
        image: '/images/tower_of_london.jpg',
        summary:
          'Founded by William the Conqueror in 1066 to awe Saxon London into submission, His Majesty’s Royal Palace and Fortress of the Tower of London has served simultaneously as royal residence, treasury, mint, menagerie, armoury, and notorious Tudor state prison. Over nearly four unhurried hours, you will visit the heavily vaulted Jewel House first, explore the complex Indian-British history of the Koh-i-Noor diamond, climb into the Norman White Tower, stand on quiet Tower Green where Tudor queens met their fate, decipher 16th-century prisoner carvings in Beauchamp Tower, and meet the legendary Ravens and Yeoman Warders.',
        insiderTips: [
          'ACTION NEEDED: Pre-book the 12:00 p.m. timed-entry ticket online at hrp.org.uk (Crown Jewels access is included in standard admission, and pre-booked barcode holders breeze straight through the Middle Drawbridge).',
          'Go straight to the Jewel House at Waterloo Barracks FIRST upon entering at noon while tour groups are at lunch — then loop back to join one of the included 45-minute Yeoman Warder ("Beefeater") tours departing every 30 minutes near the main Bell Tower entrance.',
          'Take a mid-afternoon hot tea break at the New Armouries Café inside the Inner Ward around 2:30 p.m. before finishing Beauchamp Tower and the Ravens.',
        ],
        links: buildVenueLinks({
          name: 'Tower of London',
          city: 'London',
          lat: 51.5081,
          lng: -0.0759,
          tripadvisorUrl:
            'https://www.tripadvisor.com/Attraction_Review-g186338-d187547-Reviews-Tower_of_London-London_England.html',
          officialUrl: 'https://www.hrp.org.uk/tower-of-london/',
        }),
        museumTour: {
          tourId: 'tower-of-london',
          tourTitle: 'The Tower of London: Crowns, Conquest & Tudor Intrigue',
          narrator: 'Julian Vance · Royal Heritage Audio Guide (British Narration)',
          voiceId: 'en-GB-RyanNeural',
          totalDurationMinutes: 180,
          routeStrategy:
            'Enter through West Gate and head immediately to the Jewel House in Waterloo Barracks (Highlights 1 & 2) before afternoon queues build. Exit onto the central Parade Ground to enter the Norman White Tower (Highlight 3), cross quiet Tower Green beside the Chapel Royal (Highlight 4), step into Beauchamp Tower on the western wall (Highlight 5), and finish on the South Lawn with the Royal Ravens and Yeoman Warders (Highlight 6).',
          introAudioUrl: '/audio/tower-of-london-intro.mp3',
          introTranscript:
            'Welcome to His Majesty’s Royal Palace and Fortress of the Tower of London. Standing sentinel beside the River Thames for nearly a thousand years, these concentric stone walls hold the entire arc of British monarchy: Norman conquest, glittering coronation regalia, Tudor ambition, and tragic betrayal. Today, we begin straight inside the high-security vaults of the Jewel House while the midday walkways are calm, before stepping into William the Conqueror’s eleventh-century keep and the hushed cobblestones of Tower Green. Take your time, stay warm, and let the stones speak.',
          highlights: [
            {
              id: 'crown-jewels',
              order: 1,
              title: 'Jewel House — Imperial State Crown & Sovereign’s Sceptre (Cullinan I)',
              artistOrOrigin: '1661 – Present · Royal Regalia (23,578 Gemstones)',
              location: 'Ground Level · Waterloo Barracks Vault',
              durationMinutes: 35,
              image: '/images/crown_jewels.jpg',
              summary:
                'After Oliver Cromwell melted down England’s medieval regalia following the execution of Charles I in 1649, a dazzling new suite of sacred coronation objects was forged for Charles II’s Restoration in 1661. As you glide along the moving walkway inside the bomb-proof vault, you witness working ceremonial treasures still used at Westminster Abbey coronations — climaxing with St Edward’s solid-gold Crown and the Imperial State Crown set with 2,868 diamonds.',
              lookClosely:
                'Spot the heart-shaped 530.2-carat Cullinan I ("Great Star of Africa") atop the Sovereign’s Sceptre — the largest clear cut diamond on Earth — and the uncut red spinel ("Black Prince’s Ruby") glowing front-and-centre on the Imperial State Crown, worn according to legend by Henry V at Agincourt.',
              audioUrl: '/audio/tower-of-london-crown-jewels.mp3',
              audioScript:
                'Step onto the softly lit travellator inside the Waterloo Barracks vault, where more than twenty-three thousand gemstones blaze out of the darkness. Unlike museum relics locked permanently away, the Crown Jewels are living sacred regalia, carried out to Westminster Abbey whenever a British monarch is crowned. Look first for the Sovereign’s Sceptre with Cross: sparkling at its tip is Cullinan One, the Great Star of Africa, weighing an astonishing five hundred and thirty carats. Right beside it rests the Imperial State Crown. Notice the crimson stone directly above the brow: it is actually not a ruby at all, but a medieval spinel once owned by fourteenth-century Moorish rulers in Granada and worn into battle by Henry the Fifth at Agincourt.',
            },
            {
              id: 'koh-i-noor',
              order: 2,
              title: 'The Koh-i-Noor Diamond & Queen Mother’s Crown',
              artistOrOrigin: '105.6-Carat Golconda Diamond · Subcontinental & Imperial History',
              location: 'Jewel House · Central Treasury Case',
              durationMinutes: 20,
              image: '/images/koh_i_noor.jpg',
              summary:
                'Few objects in London carry deeper subcontinental resonance than the 105.6-carat Koh-i-Noor ("Mountain of Light"), mined from the alluvial riverbeds of Golconda in southern India and treasured across centuries by Kakatiya, Mughal (where it adorned Shah Jahan’s Peacock Throne), Persian, Afghan Durrani, and Sikh rulers before being ceded from ten-year-old Maharaja Duleep Singh under the 1849 Treaty of Lahore to Queen Victoria. Historic Royal Palaces’ revamped display presents this layered, contested history candidly alongside the 1937 platinum crown made for Queen Elizabeth The Queen Mother.',
              lookClosely:
                'Look both at the platinum 1937 Queen Mother’s Crown frame and the crystal replica showing the Koh-i-Noor’s original high-domed Mughal cut before Prince Albert ordered Garrard to re-cut it in 1852 — reducing its weight by over forty percent to heighten European brilliance.',
              audioUrl: '/audio/tower-of-london-koh-i-noor.mp3',
              audioScript:
                'Pause before the dedicated display recounting the extraordinary journey of the Koh-i-Noor, Persian for Mountain of Light. Mined centuries ago in the storied Golconda region of India, this diamond passed through the hands of Mughal emperors, mounted high in Shah Jahan’s fabled Peacock Throne, before travelling to Persia under Nader Shah, Afghanistan, and finally the court of Ranjit Singh, the Lion of Punjab, in Lahore. In eighteen forty-nine, following the Second Anglo-Sikh War, the East India Company compelled the boy Maharaja Duleep Singh to sign the Treaty of Lahore, surrendering both sovereignty and the gem to Queen Victoria. Compare the crystal model of its majestic original Mughal dome with the smaller oval brilliant cut ordered by Prince Albert in eighteen fifty-two.',
            },
            {
              id: 'white-tower',
              order: 3,
              title: 'The White Tower & Henry VIII’s "Line of Kings" Armour',
              artistOrOrigin: 'c. 1078–1100 AD · Norman Keep & Royal Armouries Collection',
              location: 'Central Keep · Floors 1–2 & Chapel of St John the Evangelist',
              durationMinutes: 40,
              image: '/images/white_tower_armour.jpg',
              summary:
                'Built with pale Caen limestone shipped across the English Channel from Normandy and whitewashed in 1240 (giving the "White Tower" its name), this 90-foot-tall keep was the tallest secular building in medieval London. Inside sits the Royal Armouries’ celebrated "Line of Kings" — the world’s oldest museum exhibition, welcoming paying visitors since the 1660s — featuring wooden cavalry chargers and three monumental suits of Greenwich steel armour forged for Henry VIII as his waistline expanded from a trim young athlete to a 54-inch-girth monarch.',
              lookClosely:
                'Compare Henry VIII’s silvered 1514 wedding armour on the first floor with his cavernous 1540 tournament suit, then step into the barrel-vaulted Chapel of St John on the second floor — the purest, completely intact 11th-century Norman church interior in Britain.',
              audioUrl: '/audio/tower-of-london-white-tower.mp3',
              audioScript:
                'Rising ninety feet from the heart of the fortress is the White Tower, begun by William the Conqueror around ten seventy-eight using creamy limestone ferried straight from Normandy. Step inside to experience the Line of Kings, arguably the oldest continually running public exhibition anywhere in the world. Here stand life-sized carved wooden horses bearing the personal Greenwich steel armours of Tudor and Stuart monarchs. Look closely at Henry the Eighth’s three surviving suits: they chart his physical transformation from a tall, athletic renaissance prince into an imposing, fifty-four-inch-waisted sovereign crippled by a jousting wound. Before heading back downstairs, step quietly into the Chapel of Saint John, whose unadorned Romanesque columns remain virtually unchanged since eleven hundred.',
            },
            {
              id: 'tower-green',
              order: 4,
              title: 'Tower Green, Scaffold Site & Chapel Royal of St Peter ad Vincula',
              artistOrOrigin: '1536–1554 · Tudor Private Execution Ground & Royal Burial Chapel',
              location: 'Inner Ward · Tower Green (West of the White Tower)',
              durationMinutes: 25,
              image: '/images/yeoman_warder.jpg',
              summary:
                'While over a hundred prisoners were executed before raucous crowds outside the walls on Tower Hill, high-ranking aristocrats — including three Queens of England — were granted the grim privilege of private execution inside the fortress walls on Tower Green. Today a gentle glass-and-granite cushion memorial by Brian Catling marks the spot where Anne Boleyn (1536), Catherine Howard (1542), and sixteen-year-old "Nine Days Queen" Lady Jane Grey (1554) knelt before the scaffold, before being laid to rest beneath the nave stones of the adjacent Chapel Royal of St Peter ad Vincula.',
              lookClosely:
                'Read the circular bronze inscription bordering the glass pillow sculpture on Tower Green ("Gentle visitor pause awhile: where you stand death cut away the light of many days"), and look toward the Tudor half-timbered King’s House behind it where Anne Boleyn spent her final night.',
              audioUrl: '/audio/tower-of-london-tower-green.mp3',
              audioScript:
                'Out on the quiet cobblestones of Tower Green, the mood softens into solemn reflection. Public executions took place up on Tower Hill before thousands of spectators, so dying privately here inside the walls was reserved for only a handful of royal figures too sensitive to expose to the crowd. Beneath the modern glass pillow memorial stood the timber scaffold for three English queens: Anne Boleyn, executed with a French swordsman’s single stroke in fifteen thirty-six; teenage Catherine Howard six years later; and scholarly sixteen-year-old Lady Jane Grey in fifteen fifty-four. Just steps away stands the Chapel Royal of Saint Peter ad Vincula, where all three queens lie buried alongside Saint Thomas More beneath the altar.',
            },
            {
              id: 'beauchamp-tower',
              order: 5,
              title: 'Beauchamp Tower Prisoners’ Stone Carvings',
              artistOrOrigin: '1281 Tower · 16th-Century Tudor Graffiti Inscriptions',
              location: 'Inner Curtain Wall West · First Floor Chamber',
              durationMinutes: 20,
              image: '/images/beauchamp_tower.jpg',
              summary:
                'Constructed by Edward I around 1281, this D-shaped defensive tower overlooking Tower Green became the preferred confinement chamber for high-born Tudor political and religious prisoners awaiting interrogation or death. Allowed servants and small pocket knives, ninety-one captives spent agonizing months carving intricate coats of arms, Latin prayers, Astrological symbols, and farewell messages deep into the soft limestone walls.',
              lookClosely:
                'Find the extraordinarily intricate heraldic carving by the five Dudley brothers right beside the fireplace (featuring acorns, roses, oak leaves, and a bear and ragged staff), and the simple five-letter word "IANE" — believed to have been carved by Guilford Dudley in heartbreak for his wife, Lady Jane Grey.',
              audioUrl: '/audio/tower-of-london-beauchamp-tower.mp3',
              audioScript:
                'Climb the short spiral stair into the sunlit octagon of Beauchamp Tower, where Tudor history feels startlingly intimate. During the religious upheavals of the sixteenth century, noblemen imprisoned here used penknives and nails to chisel deeply personal memorials into the limestone blocks so history would not erase their names. Beside the fireplace, marvel at the virtuoso relief carved by John Dudley and his four brothers, weaving roses, carnations, and oak sprigs around the Warwick bear. Then look near the northern window embrasure for a tiny, haunting four-letter inscription in Latin capitals: I-A-N-E, Jane, almost certainly etched by young Lord Guilford Dudley in the final days before both he and his wife, Lady Jane Grey, walked to the block.',
            },
            {
              id: 'tower-ravens',
              order: 6,
              title: 'The Royal Ravens & Yeoman Warders ("Beefeaters")',
              artistOrOrigin: '1485 Tudor Bodyguard Tradition & Charles II Raven Decree',
              location: 'South Lawn Outside Wakefield Tower & Lanthorn Tower',
              durationMinutes: 20,
              image: '/images/tower_ravens.jpg',
              summary:
                'No visit is complete without meeting the Tower’s two living guardians. Since Charles II supposedly decreed that if six ravens ever leave the fortress, both the White Tower and the Kingdom will fall, the Tower keeps at least seven giant corvids (six plus a spare!) cared for by the Ravenmaster. Guarding them are the 35 Yeoman Warders — every single one a retired senior warrant officer with at least 22 years of spotless British Armed Forces service — living inside the fortress walls with their families.',
              lookClosely:
                'Notice the everyday dark-blue undress uniform embroidered in red with "CIIIR" — King Charles III’s royal cypher — and watch the giant ravens hopping across the South Lawn benches showing off their mischievous vocal mimicry.',
              audioUrl: '/audio/tower-of-london-tower-ravens.mp3',
              audioScript:
                'Finish your exploration on the South Lawn outside Wakefield Tower, territory of the Royal Ravens. Legend holds that King Charles the Second, ignoring complaints from his Royal Astronomer John Flamsteed that the birds were blocking his telescope, decreed that at least six ravens must always dwell at the Tower lest the monarchy crumble into dust. Today the Ravenmaster tends a pampered flock fed on prime raw meat and blood-soaked biscuits. Chat with one of the Yeoman Warders strolling nearby: far from actors in costume, every Beefeater has served a minimum of twenty-two years in the British Armed Forces, and look closely at the scarlet gold-trimmed monogram on their chest, newly updated with the cypher of King Charles the Third.',
            },
          ],
        },
      },
      {
        id: 'd2-tower-bridge-photos',
        time: '3:45–4:15 p.m.',
        title: 'Tower Bridge Photographs & Walk to Tower Pier',
        subtitle: 'Twilight Illumination Over the Thames & Pre-Boarding Stroll',
        category: 'scenic',
        bookingStatus: 'included',
        neighborhood: 'Tower Wharf & Tower Pier',
        address: 'Tower Wharf, Lower Thames Street, London EC3N 4DT',
        coordinates: { lat: 51.5067, lng: -0.0754 },
        walkOrTransit: '5 min flat riverside walk along Tower Wharf directly to Lower Thames Street / Tower Pier',
        image: '/images/tower_bridge.jpg',
        summary:
          'Step out onto broad, cobbled Tower Wharf right between the fortress moat and the Thames just as the 4:08 p.m. sunset washes Victorian-Gothic Tower Bridge in amber and silver floodlights. After capturing classic riverside portraits without crowds blocking the water’s edge, walk five minutes west past the old Traitor’s Gate arch directly onto Tower Millennium Pier for your 4:25 p.m. boarding call.',
        insiderTips: [
          'The cast-iron cannons lined up along Tower Wharf point directly toward Tower Bridge — stand just east of Traitor’s Gate for an unobstructed waist-up portrait with both Gothic bridge towers reflected in the rising tide.',
          'Arrive at Tower Millennium Pier by 4:20–4:25 p.m. so you are near the front of the boarding queue for the 4:35 p.m. City Cruises departure and can pick window seats inside the warm lower saloon.',
        ],
        links: buildVenueLinks({
          name: 'Tower Bridge',
          city: 'London',
          lat: 51.5055,
          lng: -0.0754,
          tripadvisorUrl:
            'https://www.tripadvisor.com/Attraction_Review-g186338-d187555-Reviews-Tower_Bridge-London_England.html',
          officialUrl: 'https://www.towerbridge.org.uk/',
        }),
      },
      {
        id: 'd2-thames-cruise',
        time: '4:35–5:15 p.m.',
        title: 'Thames Sightseeing Cruise (Tower Pier → Westminster Pier)',
        subtitle:
          'Boarding 4:25 p.m. · Illuminated Evening Glide Past St Paul’s, Globe Theatre & Big Ben',
        category: 'historic',
        bookingStatus: 'action_needed',
        neighborhood: 'River Thames (Pool of London → Westminster)',
        address: 'Tower Millennium Pier, Lower Thames Street, London EC3N 4DT',
        coordinates: { lat: 51.5074, lng: -0.0789 },
        walkOrTransit:
          '40 min scenic river voyage to Westminster Pier (followed by brief Jubilee/Victoria Tube or cab to hotel/dinner)',
        image: '/images/thames_cruise.jpg',
        summary:
          'Trade weary afternoon feet for London’s oldest royal highway. Departing Tower Pier at 4:35 p.m. on the winter schedule means you sail upriver in full evening splendour: office towers shimmer like diamonds across the water, St Paul’s dome glows white above Millennium Bridge, and your boat docks right beneath the golden clockface of Big Ben and the floodlit Palace of Westminster at 5:15 p.m.',
        insiderTips: [
          'ACTION NEEDED: Reserve one-way Tower Pier → Westminster Pier tickets on City Cruises (4:35 p.m. winter timetable; boarding starts 4:25 p.m.).',
          'Choose window seats on the RIGHT (starboard/north) side if you prioritize St Paul’s Cathedral, Somerset House, and the Palace of Westminster approach — or sit inside near the rear glass doors so you can step out onto the open stern balcony for 360-degree photos without wind chill!',
          'There is an onboard café-bar serving hot tea, mulled wine, and coffee for the 40-minute glide.',
        ],
        links: buildVenueLinks({
          name: 'City Cruises Tower Millennium Pier',
          city: 'London',
          lat: 51.5074,
          lng: -0.0789,
          tripadvisorUrl:
            'https://www.tripadvisor.com/Attraction_Review-g186338-d1147345-Reviews-City_Cruises_London-London_England.html',
          officialUrl: 'https://www.cityexperiences.com/london/city-cruises/',
        }),
        museumTour: {
          tourId: 'thames-cruise',
          tourTitle: 'Twilight on the Thames: Tower Pier to Westminster',
          narrator: 'Dr. Clara Pembroke · Architectural & River Historian (British Audio)',
          voiceId: 'en-GB-SoniaNeural',
          totalDurationMinutes: 40,
          routeStrategy:
            'Board at Tower Millennium Pier by 4:25 p.m. Start at the rear viewing deck or panoramic glass saloon as the vessel swings out into the Pool of London (Highlight 1), look left to Bankside after London Bridge (Highlight 2), look right as you pass beneath the Millennium Bridge toward St Paul’s (Highlight 3), and step outside during the final five minutes for the breathtaking illuminated reveal of Big Ben and Parliament (Highlight 4).',
          introAudioUrl: '/audio/thames-cruise-intro.mp3',
          introTranscript:
            'Welcome aboard as we cast off from Tower Pier onto the tidal River Thames. For two millennia, before subterranean railways or wide boulevards existed, this silver ribbon of water was London’s grand ceremonial boulevard, carrying Roman galleys, Tudor royal barges draped in cloth of gold, and spice clippers from Bombay and Calcutta. Sailing west at twilight is pure magic: the daytime bustle recedes, bridges light up in jewel tones beneath our hull, and London’s greatest landmarks reveal the exact riverfront facades their architects designed to be seen from the water.',
          highlights: [
            {
              id: 'tower-bridge-glide',
              order: 1,
              title: 'Passing Frame of Tower Bridge & HMS Belfast in the Pool of London',
              artistOrOrigin: '1894 Bascule Bridge & 1938 Royal Navy Town-Class Cruiser',
              location: 'Port & Starboard · Pool of London Departure',
              durationMinutes: 10,
              image: '/images/hms_belfast.jpg',
              summary:
                'As the boat pulls out from Tower Pier into the historic Pool of London — once the busiest port basin on Earth — look back behind the stern at Tower Bridge’s twin neo-Gothic towers lit against the dusk sky, while to port (left) floats the nine-deck Royal Navy cruiser HMS Belfast, whose six-inch guns helped spearhead the D-Day landings at Normandy on June 6, 1944.',
              lookClosely:
                'Notice HMS Belfast’s distinctive dazzle-camouflage paint pattern of interlocking blues and greys, originally designed to confuse enemy U-boat rangefinders in Arctic convoys.',
              audioUrl: '/audio/thames-cruise-tower-bridge-glide.mp3',
              audioScript:
                'Look back over the stern as we swing out into the Pool of London, framed by the floodlit Gothic towers of Tower Bridge, completed in eighteen ninety-four with steam-powered hydraulic bascules hidden inside its piers. Gliding close off our port side is H M S Belfast, the most significant surviving Second World War Royal Navy warship in Europe. Painted in geometric Admiralty Disruptive Camouflage, she escorted perilous Arctic convoys to Russia, helped sink the German battlecruiser Scharnhorst, and fired some of the opening naval salvos supporting Allied troops on Gold and Juno beaches on D-Day morning.',
            },
            {
              id: 'globe-southbank',
              order: 2,
              title: 'Shakespeare’s Globe & Historic Bankside',
              artistOrOrigin: '1599 Original / 1997 Authentic Oak & Norfolk Reed Reconstruction',
              location: 'Port Side (Left) · Southwark Bankside',
              durationMinutes: 10,
              image: '/images/shakespeares_globe.jpg',
              summary:
                'After slipping beneath London Bridge and Southwark Bridge, look to the southern bank where a gleaming whitewashed, twenty-sided timber polygon stands out sharply against modern glass: Shakespeare’s Globe. Championed over decades by American actor-director Sam Wanamaker, it stands just yards from the 1599 Elizabethan playhouse where Hamlet, Othello, King Lear, and Macbeth were first performed — crowned with the first thatched roof permitted in central London since the Great Fire of 1666.',
              lookClosely:
                'Spot the steep dark-grey Norfolk water-reed thatch rimming the open-air "wooden O" — fitted with discrete modern water sprinklers along the ridge to satisfy post-1666 fire laws — right beside the towering brick chimney of Tate Modern.',
              audioUrl: '/audio/thames-cruise-globe-southbank.mp3',
              audioScript:
                'After passing beneath the green-and-gold arches of Southwark Bridge, turn your eyes left toward Bankside. Glowing brightly against the dark brick warehouses is the white lime-plaster ring of Shakespeare’s Globe. In Elizabethan times, Southwark lay conveniently outside the strict Puritan jurisdiction of the City of London, making this shoreline a lively playground of taverns and open-air theatres. Built using green English oak, mortise-and-tenon joints without structural steel, and genuine Norfolk reed thatch, it is the first thatched building allowed in central London since the Great Fire of sixteen sixty-six.',
            },
            {
              id: 'st-pauls-millennium',
              order: 3,
              title: 'Millennium Bridge & Sir Christopher Wren’s St Paul’s Cathedral Dome',
              artistOrOrigin: '1675–1710 English Baroque Masterpiece & 2000 "Blade of Light" Footbridge',
              location: 'Starboard Side (Right) · City of London Skyline',
              durationMinutes: 10,
              image: '/images/st_pauls_millennium.jpg',
              summary:
                'As our boat glides directly under Sir Norman Foster and Sir Anthony Caro’s slender steel Millennium Bridge, look straight up to starboard (right) along the protected sightline to see Sir Christopher Wren’s monumental 365-foot-tall dome of St Paul’s Cathedral floating serenely above the City. Rebuilt from Portland stone after old Gothic St Paul’s burned in 1666, this dome famously survived German incendiary bombs during the 1940 Blitz thanks to volunteer St Paul’s Watch fireguards.',
              lookClosely:
                'As you pass directly beneath the centre of the Millennium Bridge, look straight north through the pedestrian span: the bridge’s axis aligns down to the inch with the southern transept and golden cross of St Paul’s dome.',
              audioUrl: '/audio/thames-cruise-st-pauls-millennium.mp3',
              audioScript:
                'Get your camera ready as we approach the slender silver ribbon of the Millennium Footbridge. Look right up the northern slope and watch how the bridge frames a protected axial vista straight to Sir Christopher Wren’s Baroque dome of Saint Paul’s Cathedral. Completed in seventeen ten after the Great Fire reduced medieval London to ash, its ingenious triple-shell dome rises three hundred and sixty-five feet — one foot for every day of the year. During the darkest nights of the nineteen forty Blitz, Prime Minister Winston Churchill ordered that Saint Paul’s must be saved at all costs as the unbroken symbol of London’s endurance.',
            },
            {
              id: 'westminster-finale',
              order: 4,
              title: 'London Eye, Big Ben & Illuminated Palace of Westminster',
              artistOrOrigin: '1840–1870 Charles Barry & Augustus Pugin Gothic Revival Palace',
              location: 'Port & Starboard Approach · Westminster Pier Arrival',
              durationMinutes: 10,
              image: '/images/london_hero.jpg',
              summary:
                'Rounding the sweeping Victoria Embankment bend past Cleopatra’s Needle and grand Whitehall ministries, the river opens onto London’s signature night panorama. To port rises the glowing 443-foot wheel of the London Eye; dead ahead and to starboard stretches Charles Barry and Augustus Pugin’s gilded honey-stone Palace of Westminster and the newly restored Elizabeth Tower — its Prussian-blue and 23.75-karat gold leaf clock dials shining crisply following its six-year conservation.',
              lookClosely:
                'Look above the four illuminated clock faces of Big Ben for the Ayrton Light lantern at the very tip of the spire: if that white light is shining tonight, it means either the House of Commons or the House of Lords is sitting in live evening session right now!',
              audioUrl: '/audio/thames-cruise-westminster-finale.mp3',
              audioScript:
                'Now step toward the open deck if you can as the Thames curves south along Victoria Embankment for one of the grandest urban finales on Earth. On our left spins the illuminated rim of the London Eye, while ahead on the right rises the honey-gold Gothic filigree of the Houses of Parliament and the Elizabeth Tower, home to the thirteen-ton Great Bell known the world over as Big Ben. Notice the rich Prussian blue and gleaming gold leaf on the clock dials, restored to Augustus Pugin’s original eighteen fifty-nine colour scheme, and check the lantern at the pinnacle: when lit after dark, Parliament is actively in session below.',
            },
          ],
        },
      },
      {
        id: 'd2-colonel-saab-dinner',
        time: '6:45 p.m.',
        title: 'Proposed Dinner at Colonel Saab High Holborn',
        subtitle:
          'Heritage Indian Dining Amid Museum-Grade Tanjore Art & Firozabad Chandeliers',
        category: 'dining',
        bookingStatus: 'proposed',
        neighborhood: 'High Holborn / Covent Garden Border',
        address: 'Holborn Town Hall, 193–197 High Holborn, London WC1V 7BD',
        coordinates: { lat: 51.5169, lng: -0.1229 },
        walkOrTransit:
          'From Westminster Pier at 5:15 p.m., take a quick cab back to The Langham to freshen up (45 mins rest), then an 8 min cab east to High Holborn (or go straight via Covent Garden)',
        image: '/images/butter_chicken.jpg',
        summary:
          'Set inside the grand red-brick Victorian chamber of the former Holborn Town Hall, Colonel Saab is restaurateur Roop Partap Choudhary’s deeply personal "love letter to India," inspired by the culinary and cultural travels of his father, Colonel Manbeer Choudhary, and mother, Binny Choudhary, across military postings from Rajasthan and Punjab to Kerala. The soaring dining room feels like an Indian decorative-arts palace, hung with 17th- and 18th-century gold-leaf Tanjore paintings, brass temple bells, Persian carpets, and a breathtaking canopy of hand-crafted Firozabad glass chandeliers.',
        insiderTips: [
          'Arrive 10 minutes early just to admire the staircase gallery of antique brassware, vintage Anglo-Indian army photographs, and museum-grade Tanjore art collected across decades by the Choudhary family.',
          'Request a plush velvet booth on the mezzanine balcony overlooking the chandelier-lit main hall for quieter conversation and the best architectural view.',
          'Both meat lovers and vegetarians eat royally here — the Falahari Kofta Curry and crispy lotus-stem starters are among the highest-rated vegetarian dishes on TripAdvisor in central London.',
        ],
        links: buildVenueLinks({
          name: 'Colonel Saab High Holborn',
          city: 'London',
          lat: 51.5169,
          lng: -0.1229,
          tripadvisorUrl:
            'https://www.tripadvisor.co.uk/Restaurant_Review-g186338-d23632334-Reviews-Colonel_Saab_High_Holborn-London_England.html',
          officialUrl: 'https://colonelsaab.co.uk/',
        }),
        diningGuide: {
          cuisine: 'Regional Heritage Indian Cuisine',
          priceRange: '£££',
          accolades: [
            'TripAdvisor Travellers’ Choice · 4.8★ (2,500+ Reviews)',
            'Asian Curry Awards — Best Newcomer & Fine Dining Winner',
            'Featured in Forbes, Time Out London & Evening Standard',
          ],
          vibe: 'Opulent former Victorian Town Hall glowing beneath dozens of Firozabad chandeliers and antique Tanjore gold paintings.',
          dressCode: 'Smart Casual',
          featuredDishes: [
            {
              name: 'Colonel Saab’s Signature Butter Chicken',
              badge: 'House Legend',
              description:
                'Succulent tandoor-charred chicken thighs simmered in a velvety, smoky heirloom tomato, butter, and kasuri methi reduction passed down from Colonel Choudhary’s officer’s-mess postings.',
              dietary: 'Meat',
            },
            {
              name: 'Falahari Kofta Curry',
              badge: 'Vegetarian Star',
              description:
                'Melt-in-the-mouth paneer and lotus-seed dumplings stuffed with figs and pistachios in a fragrant white cashew-cardamom korma gravy — originally created for festive fasting days and adored by reviewers.',
              dietary: 'Vegetarian',
            },
            {
              name: 'Sunday Lamb Curry Tiffin / Shikari Raan',
              badge: 'Chef Signature',
              description:
                'Homestyle bone-in Anglo-Indian railway/camp lamb curry slow-cooked with baby potatoes, whole garam masala, and caramelized onions.',
              dietary: 'Meat',
            },
            {
              name: 'Crispy Bhindi & Dahi Sev Puri',
              badge: 'Crowd Favourite Starter',
              description:
                'Paper-thin spiced crispy okra fries tossed with mango powder alongside crunchy puris filled with spiced potato, sweet yoghurt, tamarind, and sev.',
              dietary: 'Vegetarian',
            },
            {
              name: 'Gutthi / Nadru Kashmiri Crispy Lotus Stem',
              badge: 'Internet Icon',
              description:
                'Lacy slices of Kashmiri lotus root flash-fried crisp and glazed in tangy honey-tamarind chilli — impossibly addictive texture.',
              dietary: 'Vegetarian',
            },
            {
              name: 'Rasmalai Milk Cake',
              badge: 'Must-Order Dessert',
              description:
                'Sponge cake soaked in chilled saffron-cardamom rabri milk, topped with whipped cream, rose petals, and crushed pistachios.',
              dietary: 'Sweet / Vegetarian',
            },
          ],
        },
      },
    ],
  },

  // =========================================================================
  // DAY 3 — FRIDAY, NOVEMBER 20, 2026
  // =========================================================================
  {
    id: 'london-day-3',
    dayNumber: 3,
    dateLabel: 'Fri Nov 20',
    fullDate: 'Friday, November 20, 2026',
    title: 'British Library, British Museum & The Jungle Book',
    theme:
      'Literary treasures and ancient civilizations across scholarly Bloomsbury — from Magna Carta and Mughal manuscripts to the Rosetta Stone and Amaravati sculptures — capped by the National Theatre’s flagship autumn staging of The Jungle Book.',
    shoppingSummary:
      'Optional 15-min museum bookshop browse at the British Library & British Museum Grenville Room for literary facsimiles, silk bookmarks, and museum-replica gifts.',
    weatherTip:
      'Almost entirely indoors in climate-controlled Bloomsbury galleries and the Olivier Theatre — dress in light breathable layers under a warm coat so you never overheat inside museum halls.',
    stops: [
      {
        id: 'd3-british-library',
        time: '10:00–11:30 a.m.',
        title: 'The British Library — Sir John Ritblat Treasures Gallery & King’s Library',
        subtitle:
          'Free Entry · Magna Carta, Gutenberg Bible, First Folio, Da Vinci & Indian Sacred Texts',
        category: 'museum',
        bookingStatus: 'included',
        neighborhood: 'St Pancras / Bloomsbury',
        address: '96 Euston Road, London NW1 2DB',
        coordinates: { lat: 51.5299, lng: -0.1277 },
        walkOrTransit:
          '10 min black cab down Marylebone/Euston Road from The Langham (or Victoria Line: Oxford Circus → King’s Cross St Pancras, 4 mins)',
        image: '/images/british_library.jpg',
        summary:
          'Holding over 170 million items across nearly 400 miles of underground shelving, the British Library is the largest national library in the world. Yet its single greatest room — the free, softly lit Sir John Ritblat "Treasures of the British Library" Gallery — can be savoured intimately in 90 minutes, placing you inches from the original 1215 Magna Carta, Gutenberg’s 1455 Bible, Shakespeare’s 1623 First Folio, Leonardo da Vinci’s mirror-script notebook, Jane Austen’s writing desk, Beatles lyrics scribbled on hotel stationery, and exquisite Mughal and Buddhist illuminated manuscripts.',
        insiderTips: [
          'Entry to both the building and the Sir John Ritblat Treasures Gallery (Ground Floor, straight left past the King’s Library glass tower) is completely free and uncrowded at 10:00 a.m.',
          'After the Treasures Gallery, ride the escalator up one level to stand face-to-face with the bronzed leather bindings of King George III’s 65,000-volume King’s Library Tower.',
          'Note that flash photography is prohibited inside the darkened Treasures room to protect 800-year-old vellum and natural pigments.',
        ],
        links: buildVenueLinks({
          name: 'The British Library',
          city: 'London',
          lat: 51.5299,
          lng: -0.1277,
          tripadvisorUrl:
            'https://www.tripadvisor.com/Attraction_Review-g186338-d187675-Reviews-British_Library-London_England.html',
          officialUrl: 'https://www.bl.uk/',
        }),
        museumTour: {
          tourId: 'british-library',
          tourTitle: 'The British Library: Words That Shaped Humanity',
          narrator: 'Dr. Clara Pembroke · Literary & Manuscript Curator (British Audio)',
          voiceId: 'en-GB-SoniaNeural',
          totalDurationMinutes: 85,
          routeStrategy:
            'Pause first in the sun-drenched brick-and-travertine entrance hall to admire the six-storey King’s Library Tower (Highlight 1). Then turn left on the Ground Floor into the hushed Sir John Ritblat Treasures Gallery: enter the dedicated Magna Carta vault at the rear (Highlight 2), inspect the Gutenberg Bible in Early Printing (Highlight 3), linger over Shakespeare, Jane Austen, and the Beatles in Literature & Music (Highlight 4), and conclude at the Leonardo da Vinci and Sacred Indian/Mughal manuscript cases (Highlight 5).',
          introAudioUrl: '/audio/british-library-intro.mp3',
          introTranscript:
            'Welcome to the British Library, custodian of more than one hundred and seventy million written works spanning three thousand years of human thought. Designed by architect Colin St John Wilson to evoke the sunlit timber deck and brick hull of a great ocean liner of knowledge, this building houses one of London’s quietest miracles: the Sir John Ritblat Treasures Gallery. Within a single softly lit room, you will stand inches from the ink that established constitutional law, launched modern printing, preserved Shakespeare’s plays, and illuminated sacred traditions across India and Europe.',
          highlights: [
            {
              id: 'kings-library',
              order: 1,
              title: 'The King’s Library Six-Storey Glass & Bronze Tower',
              artistOrOrigin: '1763–1820 · King George III’s 65,000-Volume Enlightenment Collection',
              location: 'Central Atrium · Rising Through Floors 1–6',
              durationMinutes: 15,
              image: '/images/kings_library.jpg',
              summary:
                'Rising straight out of the main piazza floor like a glowing monument of leather and gold leaf is the King’s Library Tower: 65,000 printed books and 19,000 pamphlets assembled from scratch by King George III after George II donated the older Royal Library to the British Museum. Donated to the nation by George IV in 1823, these volumes remain an active working collection — librarians still unlock the smoked-glass doors daily to fetch 18th-century scientific and geographical atlases for researchers.',
              lookClosely:
                'Watch behind the bronze-framed UV-filtering glass walls: you may spot a curator walking along the internal catwalks retrieving a gold-tooled calfskin folio for the Rare Books Reading Room.',
              audioUrl: '/audio/british-library-kings-library.mp3',
              audioScript:
                'Look straight ahead across the travertine entrance hall at the soaring glass-and-bronze monument anchoring the entire building: the King’s Library Tower. Assembled over six decades by King George the Third, a passionate scholar of science, geography, and architecture, these sixty-five thousand leather-bound volumes represent an entire Enlightenment mind made visible. Far from a decorative prop, this six-storey humidity-controlled tower is a living working library. Every day, curators step inside those smoked-glass walkways to retrieve eighteenth-century folios for readers waiting upstairs.',
            },
            {
              id: 'magna-carta',
              order: 2,
              title: 'Magna Carta of 1215',
              artistOrOrigin: 'June 15, 1215 · Runnymede (Iron-Gall Ink on Sheepskin Parchment)',
              location: 'Sir John Ritblat Gallery · Magna Carta Vault',
              durationMinutes: 20,
              image: '/images/magna_carta.jpg',
              summary:
                'Sealed under duress by King John in a water-meadow at Runnymede beside the Thames in June 1215, Magna Carta ("The Great Charter") declared for the first time in European history that even the monarch was bound by the rule of law — planting the direct constitutional seed for habeas corpus, trial by jury, the US Bill of Rights, and India’s Fundamental Rights. Only four original 1215 charters survive anywhere on Earth, and two of them reside right here in the British Library.',
              lookClosely:
                'Lean close to the dense medieval Latin script (3,500 words crammed onto a single sheepskin without paragraphs!) and notice the puckered corner damage on the Cotton copy caused by a catastrophic 1731 library house fire — plus King John’s surviving beeswax Great Seal.',
              audioUrl: '/audio/british-library-magna-carta.mp3',
              audioScript:
                'Step into the darkened inner chamber at the back of the gallery to meet one of the foundational documents of human liberty: an original twelve fifteen engrossment of Magna Carta. Facing open rebellion from his barons at Runnymede, King John affixed his Great Seal to sixty-three clauses written in abbreviated Latin across a single sheet of sheepskin parchment. Most clauses dealt with feudal grievances about fish-weirs and baronial taxes, yet clauses thirty-nine and forty rang down the centuries: no free person shall be imprisoned or stripped of rights except by the lawful judgment of equals or the law of the land, and to no one will we sell, deny, or delay right or justice.',
            },
            {
              id: 'gutenberg-bible',
              order: 3,
              title: 'The Gutenberg Bible of 1455',
              artistOrOrigin: 'c. 1455 · Johannes Gutenberg, Mainz, Germany (Movable Metal Type)',
              location: 'Treasures Gallery · Early Printing Case',
              durationMinutes: 15,
              image: '/images/gutenberg_bible.jpg',
              summary:
                'Printed by goldsmith Johannes Gutenberg in Mainz around 1455, this magnificent folio was the first major book produced in Europe using movable cast-metal type — igniting an information revolution every bit as transformative as the modern internet. While Gutenberg printed the crisp black Gothic Latin text mechanically in oil-based ink, wealthy buyers hired master rubricators to paint the vibrant red, lapis-blue, and gold-leaf floral initials entirely by hand so no two surviving copies look alike.',
              lookClosely:
                'Admire how rock-steady and razor-sharp the right-hand margin alignment is on every 42-line column — Gutenberg cast nearly 300 slightly varied letterforms and ligatures just to mimic the flowing rhythm of a master medieval scribe.',
              audioUrl: '/audio/british-library-gutenberg-bible.mp3',
              audioScript:
                'Before you lies a fifteen-century technological thunderbolt: Johannes Gutenberg’s forty-two-line Bible, completed in Mainz around fourteen fifty-five. Prior to Gutenberg, copying a single Bible by hand took a monastic scribe up to three years; suddenly, one workshop could print one hundred and eighty copies with astonishing precision. Notice how this volume straddles two worlds at once. The jet-black Gothic columns were stamped mechanically using Gutenberg’s secret alloy of lead, tin, and antimony, yet the glowing crimson headings and delicate leafy borders were painted entirely by hand afterward to reassure Renaissance collectors accustomed to illuminated manuscripts.',
            },
            {
              id: 'shakespeare-folio',
              order: 4,
              title: 'Shakespeare’s First Folio (1623), Jane Austen & Beatles Lyrics',
              artistOrOrigin: '1623 Folio · 18th–20th Century Literary & Musical Autographs',
              location: 'Treasures Gallery · Literature & Music Cases',
              durationMinutes: 20,
              image: '/images/shakespeare_first_folio.jpg',
              summary:
                'Had Shakespeare’s fellow actors John Heminge and Henry Condell not gathered 36 of his plays into this 1623 "First Folio" seven years after his death, eighteen immortal masterpieces — including Macbeth, Julius Caesar, Twelfth Night, The Tempest, and Antony and Cleopatra — would have vanished forever, as no manuscript in Shakespeare’s hand survives for them. Surrounding cases create pure goosebumps: Jane Austen’s portable mahogany writing desk alongside drafts of Persuasion, Charlotte Brontë’s fair copy of Jane Eyre, and John Lennon and Paul McCartney’s handwritten lyrics to "Yesterday," "In My Life," and "A Hard Day’s Night" scribbled on the backs of birthday cards and envelopes.',
              lookClosely:
                'Look at Martin Droeshout’s famous copperplate portrait of Shakespeare on the 1623 title page — approved by people who actually knew his face — and then spot the energetic ballpoint cross-outs on John Lennon’s original lyric sheets nearby.',
              audioUrl: '/audio/british-library-shakespeare-folio.mp3',
              audioScript:
                'Pause before the sixteen twenty-three First Folio of William Shakespeare, arguably the single most important secular book in the English language. During his lifetime, Shakespeare wrote scripts for working actors rather than posterity, leaving half his plays unpublished when he died in sixteen sixteen. Only because two loyal friends from the King’s Men pooled his papers into this volume do we still possess Macbeth, Twelfth Night, Julius Caesar, and The Tempest today. Now glance at the neighbouring cases to watch genius caught mid-thought: Jane Austen’s tiny mahogany travelling desk, and Beatles lyrics dashed onto envelopes and greeting cards with crossed-out lines still visible.',
            },
            {
              id: 'leonardo-sacred',
              order: 5,
              title: 'Leonardo da Vinci’s Notebook (Codex Arundel) & Mughal/Indian Sacred Manuscripts',
              artistOrOrigin: '1480–1518 Leonardo Mirror Script · 16th–18th Century South Asian Illumination',
              location: 'Treasures Gallery · Science & Sacred Texts Cases',
              durationMinutes: 15,
              image: '/images/leonardo_notebook.jpg',
              summary:
                'The gallery culminates where Renaissance inquiry meets sacred artistry. In the Science section sits Leonardo da Vinci’s personal working notebook (Codex Arundel), filled with diving apparatus sketches, optical geometry, and mechanics written right-to-left in his famous left-handed mirror script. Steps away in the World Faiths display glow jewel-like South Asian manuscripts — from imperial Mughal miniature paintings brushed with crushed lapis lazuli and shell gold (such as Akbar’s court ateliers) to palm-leaf Buddhist sutras, Jaina Kalpasutras, and illuminated Sikh, Hindu, and Islamic calligraphy.',
              lookClosely:
                'Try reading a single word of Leonardo’s Italian backwards from right to left (left-handed Leonardo wrote that way largely to avoid smudging wet ink with his palm!), then lean close to the Mughal and Indian folios to see eyelashes painted with single-hair squirrel brushes.',
              audioUrl: '/audio/british-library-leonardo-sacred.mp3',
              audioScript:
                'In the final corner of the gallery, human curiosity and devotion shine side by side. Peer first into Leonardo da Vinci’s Codex Arundel, spanning nearly forty years of his restless life. Notice how every line of Italian runs backwards from right to left in mirror script, sketched naturally by a left-handed polymath jumping from underwater breathing tubes to the reflection of moonlight on waves. Then step over to the Sacred Texts cases, where extraordinary South Asian manuscripts — imperial Mughal court paintings, gilded Ramayana and Gurmukhi folios, and ancient Buddhist palm leaves — glow with mineral pigments of crushed lapis lazuli, malachite, and burnished gold.',
            },
          ],
        },
      },
      {
        id: 'd3-bloomsbury-lunch',
        time: '12:00–1:00 p.m.',
        title: 'Bloomsbury Curated Lunch',
        subtitle: 'Warm Georgian Streets Between the British Library & British Museum',
        category: 'dining',
        bookingStatus: 'included',
        neighborhood: 'Bloomsbury',
        address: 'Lamb’s Conduit Street & Museum Street, Bloomsbury, London WC1N',
        coordinates: { lat: 51.5218, lng: -0.1205 },
        walkOrTransit:
          '10–14 min stroll south through Georgian garden squares (Cartwright Gardens & Russell Square) or 4 min cab directly to your chosen lunch spot',
        image: '/images/bloomsbury_london.jpg',
        summary:
          'Bridging the half-mile literary neighbourhood of Virginia Woolf’s Bloomsbury Group between the British Library and the British Museum, this midday hour lets you pick the exact mood you crave: jewel-toned Middle Eastern mezze and London’s most famous feta-and-honey cheesecake on pedestrianized Lamb’s Conduit Street at Honey & Co., iconic Bombay Irani-café comfort at Dishoom, or cosy Italian/British café fare steps from the British Museum gates on Museum Street.',
        insiderTips: [
          'Honey & Co. Bloomsbury (54 Lamb’s Conduit Street) sits on arguably the prettiest independent village street in central London — booking a 12:00 p.m. table guarantees you’re out by 12:55 p.m. for the 8-minute walk to the British Museum.',
          'If you prefer zero detour, Museum Street right opposite the British Museum’s Great Russell Street gates is lined with charming tea rooms, Ruskin’s Café, and The Plough.',
        ],
        links: buildVenueLinks({
          name: 'Honey & Co. Bloomsbury',
          city: 'London',
          lat: 51.5218,
          lng: -0.1189,
          tripadvisorUrl:
            'https://www.tripadvisor.com/Restaurant_Review-g186338-d24159469-Reviews-Honey_Co_Bloomsbury-London_England.html',
          officialUrl: 'https://honeyandco.co.uk/',
        }),
        diningGuide: {
          cuisine: 'Curated Bloomsbury Midday Picks (Middle Eastern, Bombay Café & Trattoria)',
          priceRange: '££',
          accolades: [
            'Michelin Guide Listed Neighbourhood Favourites',
            'Lamb’s Conduit Street — Condé Nast Traveller Best Independent Street in London',
          ],
          vibe: 'Sunlit tiled cafés, bookshop-lined Georgian squares, and relaxed scholarly charm.',
          featuredDishes: [
            {
              name: 'Honey & Co. Feta & Honey Cheesecake on Kadaif Pastry',
              badge: 'Internet Icon',
              description:
                'Whipped creamy Greek feta cheesecake baked over crisp shredded kadaif pastry with thyme-infused wildflower honey and roasted almonds — widely hailed by food critics as one of London’s top ten desserts.',
              dietary: 'Vegetarian',
            },
            {
              name: 'Honey & Co. Seasonal Mezze Platter & Warm Sesame Bread',
              badge: 'Crowd Favourite',
              description:
                'Silky hummus, burnt aubergine labneh, jewel-spiced salads, and falafel or slow-braised lamb shawarma meant for effortless sharing.',
              dietary: 'Vegetarian / Meat Options',
            },
            {
              name: 'Dishoom 24-Hour House Black Daal & Crispy Okra Fries',
              badge: 'London Cult Classic',
              description:
                'Rich, smoky black lentils cooked over 24 hours with freshly blistered garlic naan, gunpowder potatoes, and masala chai (King’s Cross Granary Square, right behind the British Library).',
              dietary: 'Vegetarian',
            },
            {
              name: 'Ciao Bella Tagliolini Granchio / Truffle Ravioli',
              badge: 'Bloomsbury Institution',
              description:
                'Lively, old-school family-run Italian trattoria on Lamb’s Conduit Street beloved for handmade pasta and rapid, warm-hearted lunchtime service.',
              dietary: 'Seafood / Vegetarian Options',
            },
          ],
          nearbyOptions: [
            {
              name: 'Honey & Co. Bloomsbury',
              cuisine: 'Modern Middle Eastern Mezze & Bakery',
              walkTime: '12 min walk from British Library · 8 min walk to British Museum',
              famousFor: 'Feta & Honey Kadaif Cheesecake, smoky aubergine sabich & mezze spread',
              tripadvisorUrl:
                'https://www.tripadvisor.com/Restaurant_Review-g186338-d24159469-Reviews-Honey_Co_Bloomsbury-London_England.html',
              googleMapsUrl:
                'https://www.google.com/maps/search/?api=1&query=Honey+%26+Co.+Bloomsbury+London',
            },
            {
              name: 'Dishoom King’s Cross',
              cuisine: 'Bombay Irani Café',
              walkTime: '6 min walk north of British Library · 8 min cab to British Museum',
              famousFor: 'House Black Daal, Okra Fries, Pau Bhaji & bottomless Masala Chai',
              tripadvisorUrl:
                'https://www.tripadvisor.com/Restaurant_Review-g186338-d7292857-Reviews-Dishoom_King_s_Cross-London_England.html',
              googleMapsUrl:
                'https://www.google.com/maps/search/?api=1&query=Dishoom+King%27s+Cross+London',
            },
            {
              name: 'The Montague on the Gardens / Ciao Bella / Museum Street Cafés',
              cuisine: 'Classic British Lounge & Italian Trattoria',
              walkTime: '1–8 min walk directly beside the British Museum',
              famousFor: 'Light soup & sandwiches right on Montague Street or lively handmade pasta on Lamb’s Conduit St',
              tripadvisorUrl:
                'https://www.tripadvisor.com/Restaurant_Review-g186338-d719507-Reviews-Ciao_Bella-London_England.html',
              googleMapsUrl:
                'https://www.google.com/maps/search/?api=1&query=Museum+Street+Bloomsbury+London',
            },
          ],
        },
      },
      {
        id: 'd3-british-museum',
        time: '1:00–3:30 p.m.',
        title: 'The British Museum — World Masterpieces & Indian Galleries',
        subtitle:
          'Free Timed Entry · Rosetta Stone, Parthenon Sculptures, Amaravati & South Asia Rooms',
        category: 'museum',
        bookingStatus: 'included',
        neighborhood: 'Bloomsbury',
        address: 'Great Russell Street, Bloomsbury, London WC1B 3DG',
        coordinates: { lat: 51.5194, lng: -0.127 },
        walkOrTransit: '8 min walk from Bloomsbury lunch (use Montague Place North Entrance for shorter security lines!)',
        image: '/images/british_museum.jpg',
        summary:
          'Founded in 1753 as the first national public museum in the world open free "to all studious and curious persons," the British Museum spans two million years of human civilization. Rather than attempting its 90+ rooms at random and hitting museum fatigue, this curated 2.5-hour route moves smoothly through the glass-canopied Great Court, deciphers the Rosetta Stone, walks through ancient Assyrian palaces and the Parthenon sculptures, then ascends directly to the luminous Sir Joseph Hotung Gallery of China & South Asia (Room 33) and the sacred 2,000-year-old Amaravati Buddhist limestone carvings from Andhra Pradesh (Room 33a), finishing with the Sutton Hoo helmet and Lewis Chessmen.',
        insiderTips: [
          'Reserve a free 1:00 p.m. timed entry ticket online at britishmuseum.org, or enter via the lesser-known Montague Place (North) entrance on Malet Street where security lines are often half the length of Great Russell Street!',
          'Do NOT miss Room 33 and Room 33a on the Upper Floor (North side, directly accessible via the North Stairs or Lift from the Great Court) — the Chola bronze Natarajas, Mughal jades, Gandharan Buddhas, and Amaravati stupa reliefs are peaceful, sunlit, and deeply rewarding.',
          'Benches are spaced generously inside Room 18 (Parthenon) and Room 33 (South Asia) so you can rest comfortably while listening to each audio chapter.',
        ],
        links: buildVenueLinks({
          name: 'The British Museum',
          city: 'London',
          lat: 51.5194,
          lng: -0.127,
          tripadvisorUrl:
            'https://www.tripadvisor.com/Attraction_Review-g186338-d187559-Reviews-The_British_Museum-London_England.html',
          officialUrl: 'https://www.britishmuseum.org/',
        }),
        museumTour: {
          tourId: 'british-museum',
          tourTitle: 'The British Museum: Civilizations, Scripts & South Asian Sacred Art',
          narrator: 'Julian Vance · Senior Antiquities Guide (British Narration)',
          voiceId: 'en-GB-RyanNeural',
          totalDurationMinutes: 145,
          routeStrategy:
            'Begin beneath Norman Foster’s glass canopy in the Great Court (Highlight 1). Turn left from the main West entrance directly into Room 4 for the Rosetta Stone (Highlight 2), continue straight ahead into Rooms 6–10 for the Assyrian Lion Hunts (Highlight 3), and proceed to the end of the west wing for the Parthenon Sculptures in Room 18 (Highlight 4). Then take the nearby stairs or lift up to the Upper Floor North Wing for the newly refurbished Sir Joseph Hotung South Asia & Amaravati Indian Galleries in Rooms 33 & 33a (Highlight 5), concluding next door in Rooms 40–41 with Sutton Hoo and the Lewis Chessmen (Highlight 6).',
          introAudioUrl: '/audio/british-museum-intro.mp3',
          introTranscript:
            'Welcome to the British Museum, founded in seventeen fifty-three as the world’s earliest national public museum dedicated to the shared story of humankind. Trying to see all eight million objects in this collection would take weeks, so today we follow a calm, surgical two-and-a-half-hour arc. On the Ground Floor, we unlock Egyptian hieroglyphs at the Rosetta Stone and stand before palace reliefs from Nineveh and Athens. Then we head upstairs into one of the museum’s crown jewels: the serene Indian and South Asian galleries, home to Chola bronzes and the two-thousand-year-old Buddhist marbles of Amaravati.',
          highlights: [
            {
              id: 'great-court',
              order: 1,
              title: 'Queen Elizabeth II Great Court & Round Reading Room',
              artistOrOrigin: '1857 Sydney Smirke Rotunda & 2000 Foster + Partners Glass Canopy',
              location: 'Ground Floor · Central Courtyard',
              durationMinutes: 15,
              image: '/images/british_museum.jpg',
              summary:
                'For 150 years, the British Museum’s two-acre inner courtyard was hidden away behind stacks of books — until the British Library moved to St Pancras and Norman Foster spanned the entire quadrangle with a billowing geometric lattice of 3,312 unique triangular glass panes, creating the largest covered public square in Europe. At its bullseye stands the 1857 Round Reading Room, where Mahatma Gandhi (as a young law student in London!), Rabindranath Tagore, Charles Dickens, Virginia Woolf, and Arthur Conan Doyle once studied beneath its papier-mâché dome.',
              lookClosely:
                'Look up at the undulating steel-and-glass roof canopy: not a single two of the 3,312 glass triangles have the exact same dimensions, engineered by computer algorithms to bridge the rectangular palace walls to the circular Reading Room drum.',
              audioUrl: '/audio/british-museum-great-court.mp3',
              audioScript:
                'Step out into the luminous expanse of the Queen Elizabeth the Second Great Court, Europe’s largest covered public square. Unveiled in the year two thousand by Foster and Partners, its billowing canopy weaves more than three thousand individually shaped glass triangles around the circular stone drum of the eighteen fifty-seven Reading Room. Pause to imagine the extraordinary minds who once requested books beneath that central dome: Charles Dickens, Virginia Woolf, Sir Arthur Conan Doyle, Rabindranath Tagore, and a nineteen-year-old Mohandas Karamchand Gandhi during his student years at the Inner Temple in London.',
            },
            {
              id: 'rosetta-stone',
              order: 2,
              title: 'The Rosetta Stone (196 BC)',
              artistOrOrigin: '196 BC · Memphis, Egypt (Ptolemy V Decree on Dark Granodiorite)',
              location: 'Ground Floor · Room 4 — Egyptian Sculpture',
              durationMinutes: 20,
              image: '/images/rosetta_stone.jpg',
              summary:
                'Carved in 196 BC during the reign of teenage pharaoh Ptolemy V, this broken slab of sparkly grey-pink granodiorite records a fairly routine tax-exemption decree issued by Egyptian priests — yet because it inscribed the exact same proclamation in three scripts (sacred Hieroglyphs at the top, everyday Egyptian Demotic in the middle, and Ancient Greek at the bottom), it enabled English polymath Thomas Young and French scholar Jean-François Champollion in 1822 to crack a script that had lain completely silent for fourteen centuries.',
              lookClosely:
                'Walk around to the BACK and SIDE edges of the glass case in Room 4 where almost nobody crowds — there you can read the painted white English stencil along the broken left edge ("CAPTURED IN EGYPT BY THE BRITISH ARMY IN 1801"), then touch the full-scale carved replica nearby in Room 1 (Enlightenment Gallery).',
              audioUrl: '/audio/british-museum-rosetta-stone.mp3',
              audioScript:
                'Just inside Room Four stands the single most visited object in the British Museum: the Rosetta Stone. Carved in one ninety-six B C for young King Ptolemy the Fifth, its actual text is surprisingly bureaucratic, thanking the boy king for lowering temple taxes and gifting silver and grain. Its genius lies in repetition. Because Ptolemaic administrators needed priests, civil servants, and Greek rulers to read the same announcement, scribes chiselled identical content in sacred hieroglyphs, cursive Demotic, and Ancient Greek. By matching royal names like Ptolemy and Cleopatra inside oval cartouches, Thomas Young and Jean-François Champollion finally unlocked three thousand years of silent Egyptian voices.',
            },
            {
              id: 'assyrian-lions',
              order: 3,
              title: 'Assyrian Lion Hunt Reliefs of King Ashurbanipal',
              artistOrOrigin: 'c. 645–635 BC · North Palace of Nineveh (Modern Mosul, Iraq)',
              location: 'Ground Floor · Rooms 6–10 — Assyrian Galleries (Specifically Room 10a)',
              durationMinutes: 20,
              image: '/images/assyrian_lion_hunt.jpg',
              summary:
                'Often overlooked by visitors rushing from Egypt straight to Greece, the narrow alabaster corridor of Room 10a holds some of the greatest narrative sculpture ever chiselled by human hands. Carved 2,650 years ago for King Ashurbanipal of Assyria — the same monarch who built the royal library of cuneiform tablets at Nineveh — these gypsum wall panels depict the ritual royal lion hunt to prove the king could tame wild chaos, yet the anonymous sculptors poured astonishing tragic empathy into the roaring, wounded lions themselves.',
              lookClosely:
                'Find the famous "Dying Lioness" relief: pierced by arrows through her spine, she drags her paralyzed hindquarters across the desert floor while lifting her head in one last defiant roar — John Ruskin called it the supreme masterpiece of animal sculpture in world art.',
              audioUrl: '/audio/british-museum-assyrian-lions.mp3',
              audioScript:
                'Slip past the towering human-headed winged bulls guarding the palace gates of Khorsabad and step into Room Ten A for a hidden masterpiece of ancient art: the Lion Hunt reliefs of King Ashurbanipal, carved around six forty B C at Nineveh in northern Iraq. Officially, these gypsum panels served imperial propaganda, celebrating the Assyrian king as protector of cosmic order. Yet look closely at the Dying Lioness and the Wounded Lion: every taut tendon, bulging vein, and agonized snarl is rendered with such piercing compassion that modern viewers instinctively root for the noble beasts rather than the monarch.',
            },
            {
              id: 'parthenon-sculptures',
              order: 4,
              title: 'The Parthenon Sculptures',
              artistOrOrigin: '447–432 BC · Workshop of Phidias, Acropolis of Athens (Pentelic Marble)',
              location: 'Ground Floor · Room 18 — Duveen Gallery',
              durationMinutes: 25,
              image: '/images/parthenon_marbles.jpg',
              summary:
                'Carved from luminous honey-white Pentelic marble during Pericles’ Golden Age of Athens under master sculptor Phidias, these pedimental gods, centaur-battle metopes, and the continuous 524-foot Panathenaic procession frieze once crowned the Temple of Athena Parthenos high on the Acropolis before Lord Elgin removed roughly half the surviving sculptures under an disputed Ottoman permit between 1801 and 1805. Even stripped of their original vivid blues, reds, and bronze reins, their flowing "wet drapery" and rearing cavalry horses changed Western art forever.',
              lookClosely:
                'Walk to the far north end of the Duveen Gallery to see the Horse of Selene (Goddess of the Moon) from the East Pediment: exhausted from pulling the moon chariot across the night sky, its flared nostrils, bulging eye, and parted jaw project right over the cornice edge.',
              audioUrl: '/audio/british-museum-parthenon-sculptures.mp3',
              audioScript:
                'Enter the monumental limestone expanse of Room Eighteen to stand before the Parthenon Sculptures, carved in fifth-century B C Athens under the artistic direction of Phidias. Along the walls runs the low-relief Panathenaic frieze: carved less than two inches deep, yet stacking four overlapping ranks of galloping horsemen in effortless three-dimensional motion. At each end sit the colossal statues from the triangular roof pediments. Walk right up to the reclining goddesses and the exhausted Moon Horse of Selene: notice how the Pentelic marble seems to breathe beneath ripples of gossamer linen, even twenty-four centuries after leaving the Acropolis.',
            },
            {
              id: 'indian-galleries',
              order: 5,
              title: 'Sir Joseph Hotung South Asia & Amaravati Buddhist Sculptures',
              artistOrOrigin: 'c. 200 BC – 19th Century AD · Amaravati (Andhra Pradesh), Gandhara, Gupta & Chola Bronzes',
              location: 'Upper Floor · Rooms 33 & 33a — China & South Asia / Amaravati Gallery',
              durationMinutes: 40,
              image: '/images/amaravati_india.jpg',
              summary:
                'Ascending to the sunlit Upper North Wing brings you into the heart of the museum’s South Asian treasures. Room 33 traces four millennia of subcontinental artistry: Indus Valley seals from Harappa, serene Greco-Indian Gandharan Buddhas, golden-age Gupta terracotta and stone deities from Sarnath and Mathura, sublime 10th–12th century Chola lost-wax bronzes of Shiva Nataraja Lord of the Cosmic Dance from Tamil Nadu, and delicate Mughal court jades. At the eastern end opens the climate-controlled glass sanctuary of Room 33a, displaying the 1st–3rd century AD pale-green Palnad limestone drum slabs and lotus medallions from the Great Stupa of Amaravati in Andhra Pradesh — the oldest monumental Buddhist narrative reliefs preserved outside India.',
              lookClosely:
                'In Room 33a, examine how early Amaravati carvings represent the Buddha purely through sacred symbols — empty thrones, footprints (Buddhapada), the Bodhi tree, and the Dharma wheel — before later slabs introduce his human robed figure; then spot the ring of fire framing the Chola bronze Shiva Nataraja in Room 33.',
              audioUrl: '/audio/british-museum-indian-galleries.mp3',
              audioScript:
                'Welcome upstairs to Room Thirty-Three and its adjoining sanctuary, Room Thirty-Three A, home to one of the finest surveys of Indian and South Asian civilization outside the subcontinent. Stroll chronologically from miniature Indus Valley steatite seals through Gandharan schists and sensuous Gupta sandstone sculptures into the medieval south, where eleventh-century Chola bronzes from Tamil Nadu capture Shiva Nataraja poised weightlessly inside a flaming wheel of creation and renewal. Then step through the glass doors into the quiet Amaravati Gallery. Carved nearly two thousand years ago in pale-green limestone along the Krishna River in Andhra Pradesh, these intricate lotus medallions and stupa reliefs move seamlessly from symbolic footprints of the Awakened One to joyous narrative scenes of Prince Siddhartha’s life.',
            },
            {
              id: 'sutton-hoo-chessmen',
              order: 6,
              title: 'Sutton Hoo Anglo-Saxon Helmet & The Lewis Chessmen',
              artistOrOrigin: 'c. 625 AD Suffolk Ship Burial & c. 1150–1200 AD Norwegian Walrus Ivory',
              location: 'Upper Floor · Rooms 40–41 — Medieval & Early Medieval Europe',
              durationMinutes: 25,
              image: '/images/sutton_hoo.jpg',
              summary:
                'Just steps down the Upper Floor corridor from the Indian Galleries sit two beloved icons that overturned the myth of Europe’s "Dark Ages." In Room 41 gleams the Sutton Hoo iron-and-tinned-bronze helmet — excavated on the eve of WWII in 1939 from an 88-foot Anglo-Saxon royal ship burial in Suffolk (likely King Raedwald of East Anglia) alongside Sri Lankan garnets and Byzantine silver, inspiring J.R.R. Tolkien’s Riders of Rohan. Next door in Room 40 huddle the 12th-century Lewis Chessmen, carved from walrus ivory in Trondheim and discovered in a sandbank on the Scottish Isle of Lewis in 1831.',
              lookClosely:
                'Look at the Sutton Hoo helmet’s eyebrows: they are actually the outstretched wings of a gilded bronze dragon/boar flying nose-to-crown — and in Room 40, spot the berserker rook chessmen nervously biting the top edges of their own shields!',
              audioUrl: '/audio/british-museum-sutton-hoo-chessmen.mp3',
              audioScript:
                'Right next door on the Upper Floor, finish your afternoon with two enchanting medieval treasures. In Room Forty-One, meet the face of Anglo-Saxon England: the seventh-century Sutton Hoo helmet, unearthed from a royal ship burial in Suffolk in nineteen thirty-nine. Look closely at its haunting mask — a gilded bird’s wings form the eyebrows, inlaid with red garnets sourced all the way from India and Sri Lanka, proving seventh-century Britain was connected to Silk Road trade. Finally, smile at the twelfth-century Lewis Chessmen in Room Forty: carved from walrus ivory, its gloomy kings, cheek-resting queens, and shield-biting berserker warders inspired wizard’s chess in Harry Potter.',
            },
          ],
        },
      },
      {
        id: 'd3-langham-rest-pretheatre',
        time: '3:30–6:30 p.m.',
        title: 'Afternoon Rest at The Langham & Pre-Theatre Supper',
        subtitle: 'Unhurried Hotel Recharge Followed by Effortless 5:30 p.m. South Bank Dining',
        category: 'hotel',
        bookingStatus: 'included',
        neighborhood: 'Marylebone → Waterloo South Bank',
        address: '1C Portland Place, London W1B 1JA → Upper Ground, South Bank, London SE1 9PX',
        coordinates: { lat: 51.5178, lng: -0.144 },
        walkOrTransit:
          '8 min cab back to The Langham at 3:30 p.m. · Depart 5:15 p.m. by cab or Bakerloo Line (Oxford Circus → Waterloo, 8 mins) for pre-theatre supper',
        image: '/images/langham_london.jpg',
        summary:
          'Return to The Langham at 3:30 p.m. to put your feet up, enjoy a quiet pot of tea in your room, and change comfortably for Friday evening at the theatre. Around 5:15 p.m., head across the Thames to South Bank (or stop via Covent Garden) for a relaxed two-course pre-theatre supper right at 5:30 p.m. so you are already inside the National Theatre building with zero rush before the 7:00 p.m. curtain.',
        insiderTips: [
          'Top Zero-Stress Pick: Book a 5:30 p.m. Pre-Theatre table at Lasdun Restaurant RIGHT INSIDE the National Theatre (run by the acclaimed Marksman team — seasonal British pies, sea trout, and vegetarian tarts, steps from the Olivier auditorium stairs!).',
          'Alternative Scenic Pick: Skylon inside the neighbouring Royal Festival Hall (3 min riverside walk from the National Theatre) offers floor-to-ceiling Thames river views and a slick 5:30 p.m. pre-theatre set menu, or dine in Covent Garden and walk 10 minutes across golden-lit Waterloo Bridge.',
        ],
        links: buildVenueLinks({
          name: 'Lasdun Restaurant at the National Theatre',
          city: 'London',
          lat: 51.5072,
          lng: -0.1141,
          tripadvisorUrl:
            'https://www.tripadvisor.com/Restaurant_Review-g186338-d26259812-Reviews-Lasdun_Restaurant-London_England.html',
          officialUrl: 'https://www.lasdunrestaurant.com/',
        }),
      },
      {
        id: 'd3-jungle-book-national-theatre',
        time: '7:00 p.m.',
        title: 'Confirmed: The Jungle Book at the Olivier Theatre (National Theatre)',
        subtitle:
          'Brand-New Autumn 2026 Flagship Production (Opened Nov 13) · Life-Sized Puppetry & Music on South Bank',
        category: 'performance',
        bookingStatus: 'confirmed',
        neighborhood: 'South Bank / Waterloo',
        address: 'National Theatre, Upper Ground, South Bank, London SE1 9PX',
        coordinates: { lat: 51.5072, lng: -0.1141 },
        walkOrTransit:
          'Inside the National Theatre on South Bank · Post-show: 8 min Bakerloo Line (Waterloo → Oxford Circus) or black cab from Upper Ground taxi rank',
        image: '/images/national_theatre.jpg',
        summary:
          'Cap off Friday night inside Sir Denys Lasdun’s Brutalist riverside icon on the South Bank for your confirmed 7:00 p.m. performance of The Jungle Book in the National Theatre’s largest, fan-shaped flagship auditorium — the 1,150-seat Olivier Theatre (modelled on the ancient Greek amphitheatre at Epidaurus so every seat feels intimately wrapped around the circular revolving drum stage). Opening on November 13, 2026 — just one week before your visit! — this exhilarating reimagining of Rudyard Kipling’s Indian wilderness stories fuses soaring original choreography, percussive live score, and astonishing life-sized theatrical puppetry from the National’s world-famous War Horse / Life of Pi workshop tradition to bring Mowgli, sleek Bagheera, big-hearted Baloo, Kaa, and fearsome Shere Khan vividly to life.',
        insiderTips: [
          'Arrive inside the Olivier foyer by 6:35 p.m. to step out onto the second-floor Brutalist river terraces overlooking the illuminated dome of St Paul’s and Somerset House across the Thames.',
          'Pre-order interval drinks (tea, wine, or local Jude’s ice cream tubs!) at the Olivier Level 2 bar before taking your seats at 6:50 p.m. — your glasses will be waiting on a named table the instant the interval bell rings.',
          'After curtain call, walk straight out the Upper Ground stage-door side to catch a black cab before the main Waterloo Bridge crowd, or stroll 5 minutes to Waterloo Station for the direct 4-stop Bakerloo train straight to Oxford Circus.',
        ],
        links: buildVenueLinks({
          name: 'National Theatre London',
          city: 'London',
          lat: 51.5072,
          lng: -0.1141,
          tripadvisorUrl:
            'https://www.tripadvisor.com/Attraction_Review-g186338-d188878-Reviews-National_Theatre-London_England.html',
          timeOutUrl: 'https://www.timeout.com/london/theatre/the-jungle-book-8',
          officialUrl: 'https://www.nationaltheatre.org.uk/productions/the-jungle-book/',
        }),
      },
    ],
  },
];
