import { buildVenueLinks } from './schema.js';

const NATIONAL_GALLERY_STOP = {
  id: 'sat-national-gallery',
  time: '10:00–11:30 a.m.',
  title: 'The National Gallery — Van Eyck: The Portraits',
  subtitle: 'Historic Public Opening Day (21 Nov 2026) & Masterpieces',
  category: 'museum',
  bookingStatus: 'confirmed',
  neighborhood: 'Trafalgar Square',
  address: 'Trafalgar Square, London WC2N 5DN',
  coordinates: { lat: 51.5089, lng: -0.1283 },
  walkOrTransit: '12-minute taxi or Bakerloo Line from Oxford Circus to Charing Cross (3 stops).',
  image: '/images/national_gallery.jpg',
  summary:
    'Saturday November 21 is the historic public opening day of Van Eyck: The Portraits — the first exhibition in history to reunite all surviving painted portraits by Northern Renaissance master Jan van Eyck from collections across Europe, representing nearly half of his twenty surviving autograph works.',
  insiderTips: [
    'Use the Sainsbury Wing entrance for exhibition ticket scanning and cloakroom.',
    'Because Nov 21 is public opening day, enter right at 10:00 a.m. for the calmest viewing before midday crowds.',
    'Save 20 minutes after the exhibition to see Holbein’s Ambassadors and Turner’s Fighting Temeraire on the main floor.',
  ],
  links: buildVenueLinks({
    name: 'The National Gallery',
    city: 'London',
    lat: 51.5089,
    lng: -0.1283,
    tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g186338-d187548-Reviews-The_National_Gallery-London_England.html',
    officialUrl: 'https://www.nationalgallery.org.uk/exhibitions/van-eyck-the-portraits',
  }),
  museumTour: {
    tourId: 'national-gallery',
    tourTitle: 'Van Eyck: The Portraits & National Gallery Icons',
    narrator: 'Dr. Eleanor Vance · Art Historian (British Audio)',
    voiceId: 'en-GB-SoniaNeural',
    totalDurationMinutes: 85,
    routeStrategy:
      'Begin in the Van Eyck: The Portraits exhibition galleries at 10:00 a.m., then step onto Level 2 (Rooms 4, 34 & 43) for three unmissable National Gallery icons before departing at 11:30 a.m.',
    introAudioUrl: '/audio/national-gallery-intro.mp3',
    introTranscript:
      'Welcome to The National Gallery on Trafalgar Square, and to a genuinely once-in-a-lifetime morning. Today, November twenty-first, marks the opening day of Van Eyck: The Portraits. For the first time in six centuries, all surviving painted portraits by the fifteenth-century Netherlandish genius Jan van Eyck have travelled from Vienna, Berlin, Bruges, and Sibiu to hang beside London’s own treasures. Van Eyck perfected oil glazes so luminous that skin seems to breathe and velvet catches real winter light. Take your time up close before we visit three wider gallery icons.',
    highlights: [
      {
        id: 'arnolfini-portrait',
        order: 1,
        title: 'The Arnolfini Portrait (1434)',
        artistOrOrigin: 'Jan van Eyck · Oil on Baltic Oak',
        location: 'Sainsbury Wing / Room 56 & Van Eyck Focus',
        durationMinutes: 18,
        image: '/images/arnolfini_portrait.jpg',
        summary:
          'Perhaps the most famous double portrait in Western art, depicting Italian merchant Giovanni di Nicolao Arnolfini and his wife in Bruges with dazzling optical precision.',
        lookClosely:
          'Peer into the convex mirror on the back wall: ten tiny Passion medallions frame the reflection of two additional figures standing in the doorway, beneath Van Eyck’s Latin signature, "Johannes de eyck fuit hic" — Jan van Eyck was here.',
        audioUrl: '/audio/national-gallery-arnolfini-portrait.mp3',
        audioScript:
          'Stand directly before The Arnolfini Portrait, painted in Bruges in fourteen thirty-four. Notice how Jan van Eyck layers translucent oil glazes to distinguish fur-trimmed wool, gleaming brass chandelier, Ripon oranges on the windowsill, and the wiry coat of the tiny Brussels griffon terrier at their feet. Now lean gently toward the convex mirror at the very center of the back wall. Inside a glass no wider than an apple, Van Eyck painted the backs of the couple and two witnesses entering the room, topped by flourishes declaring in Latin: Jan van Eyck was here, fourteen thirty-four.',
      },
      {
        id: 'man-in-red-turban',
        order: 2,
        title: 'Portrait of a Man (Self Portrait?) (1433)',
        artistOrOrigin: 'Jan van Eyck · Original Painted Frame',
        location: 'Van Eyck: The Portraits Exhibition Gallery',
        durationMinutes: 15,
        image: '/images/van_eyck_turban.jpg',
        summary:
          'Widely considered the earliest surviving autonomous self-portrait in European panel painting, famed for its piercing, direct gaze out at the viewer.',
        lookClosely:
          'Examine the original gilded oak frame carved with Van Eyck’s personal motto "Als Ich Can" ("As best I can") written in Greek letters — a witty pun on his surname Eyck ("Ich").',
        audioUrl: '/audio/national-gallery-man-in-red-turban.mp3',
        audioScript:
          'Here a man in an extravagant crimson chaperon turban turns and locks eyes with you across six hundred years. Before Jan van Eyck, secular sitters looked modestly aside; this direct, steady gaze revolutionized European portraiture and is almost certainly Van Eyck himself at around age forty. Look closely at the fine crow’s-feet around his bloodshot eyes — eyes strained by painting microscopic details — and read the gilded frame at the top, inscribed with his humble yet proud personal motto: Als Ich Can, meaning As Best I Can.',
      },
      {
        id: 'leal-souvenir',
        order: 3,
        title: 'Léal Souvenir (Tymotheos) & European Loan Portraits',
        artistOrOrigin: 'Jan van Eyck · 1432–1439 Reunion',
        location: 'Van Eyck: The Portraits Exhibition Gallery',
        durationMinutes: 15,
        image: '/images/van_eyck_leal_souvenir.jpg',
        summary:
          'Reunites London’s haunting 1432 "Loyal Remembrance" portrait with rare loans including Margaret van Eyck (Bruges), Cardinal Albergati (Vienna), and Baudouin de Lannoy (Berlin).',
        lookClosely:
          'Look at the illusionistic chipped stone parapet at the bottom of Léal Souvenir: Van Eyck painted simulated cracks and chisel marks so convincingly your fingers expect cold stone.',
        audioUrl: '/audio/national-gallery-leal-souvenir.mp3',
        audioScript:
          'In this room you see why monarchs and dukes prized Van Eyck above gold. Look at Léal Souvenir, painted in fourteen thirty-two. Below the sitter’s green woollen robe, Van Eyck invented a trompe-l’oeil stone ledge complete with a realistic chip and weathered fracture, carving the French words for Loyal Remembrance. Nearby hang the precious European loans, including his wife Margaret van Eyck from Bruges. Together, they show an artist who refused to flatter — capturing every stubble hair, vein, and quiet flicker of thought.',
      },
      {
        id: 'holbein-ambassadors',
        order: 4,
        title: 'The Ambassadors (1533)',
        artistOrOrigin: 'Hans Holbein the Younger · Tudor Court',
        location: 'Level 2 · Room 4 (Sixteenth-Century Northern Europe)',
        durationMinutes: 12,
        image: '/images/holbein_ambassadors.jpg',
        summary:
          'A monumental double portrait of two French diplomats at Henry VIII’s London court surrounded by globes, astronomical instruments, and a famous optical illusion.',
        lookClosely:
          'Walk all the way to the right-hand wall beside the painting and look back diagonally downward across the canvas: the mysterious grey slash across the floor suddenly snaps into a 3D human skull!',
        audioUrl: '/audio/national-gallery-holbein-ambassadors.mp3',
        audioScript:
          'Stepping into Room Four brings us a century forward to Tudor London in fifteen thirty-three, the tumultuous year Henry the Eighth broke with Rome and crowned Anne Boleyn. Hans Holbein surrounds two French ambassadors with symbols of worldly mastery and religious fracture — notice the single snapped string on the lute. Then try the gallery’s greatest optical trick: walk right up to the right-hand edge of the frame and look sharply down to the left. That smeared diagonal blur on the mosaic floor resolves instantly into a suspended human skull.',
      },
      {
        id: 'temeraire-sunflowers',
        order: 5,
        title: 'Turner’s Fighting Temeraire & Van Gogh’s Sunflowers',
        artistOrOrigin: 'J.M.W. Turner (1839) & Vincent van Gogh (1888)',
        location: 'Level 2 · Rooms 34 & 43',
        durationMinutes: 18,
        image: '/images/fighting_temeraire.jpg',
        summary:
          'Close your visit with Britain’s most beloved painting — Turner’s ghostly Trafalgar warship towed into sunset — followed by Van Gogh’s blazing Arles Sunflowers.',
        lookClosely:
          'Compare Turner’s thick, buttery impasto sun reflecting on the Thames with Van Gogh’s sculpted chrome-yellow petals in Room 43, painted to welcome Gauguin to the Yellow House.',
        audioUrl: '/audio/national-gallery-temeraire-sunflowers.mp3',
        audioScript:
          'Before heading to South Kensington, pause in Room Thirty-Four before Britain’s favorite painting: Turner’s Fighting Temeraire. A squat, soot-belching steam tug pulls the ghostly white veteran of Admiral Nelson’s Battle of Trafalgar toward the breaker’s yard beneath a molten sunset — an elegy for the age of sail giving way to industrial steam. A quick stroll into Room Forty-Three rewards you with Vincent van Gogh’s eighteen eighty-eight Sunflowers, celebrating life in radiant layers of chrome yellow.',
      },
    ],
  },
};

const VA_MUSEUM_STOP = {
  id: 'sat-va-museum',
  time: '1:15–2:30 p.m.',
  title: 'Victoria and Albert Museum (V&A)',
  subtitle: 'Cast Courts, Raphael Cartoons, Royal Jewellery & South Asia',
  category: 'museum',
  bookingStatus: 'included',
  neighborhood: 'South Kensington',
  address: 'Cromwell Road, London SW7 2RL',
  coordinates: { lat: 51.4966, lng: -0.1722 },
  walkOrTransit: '3-minute walk straight across Exhibition Road from the Natural History Museum.',
  image: '/images/va_museum.jpg',
  summary:
    'The world’s greatest museum of art, design, fashion, and decorative craftsmanship. With 75 focused minutes, this route targets the soaring Cast Courts, the monumental Raphael Cartoons, the dazzling Bollinger Jewellery vault, and Tipu’s Tiger.',
  insiderTips: [
    'Free entry; use the Exhibition Road porcelain courtyard entrance or Cromwell Road rotunda.',
    'The V&A Garden Café (William Morris, Gamble & Poynter Rooms) is Britain’s oldest museum café and an architectural jewel even for a 10-minute espresso.',
  ],
  links: buildVenueLinks({
    name: 'Victoria and Albert Museum',
    city: 'London',
    lat: 51.4966,
    lng: -0.1722,
    tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g186338-d187557-Reviews-Victoria_and_Albert_Museum-London_England.html',
    officialUrl: 'https://www.vam.ac.uk/',
  }),
  museumTour: {
    tourId: 'va-museum',
    tourTitle: 'V&A Couture, Cast Courts & Royal Gems Tour',
    narrator: 'Dr. Eleanor Vance · Decorative Arts Curator',
    voiceId: 'en-GB-SoniaNeural',
    totalDurationMinutes: 70,
    routeStrategy:
      'Start under Dale Chihuly’s blown-glass chandelier in the Grand Entrance, turn right to Room 41 (South Asia), continue to Rooms 46a–b (Cast Courts) and Room 48a (Raphael), then take the lift to Level 3 Rooms 91–93 (Jewellery).',
    introAudioUrl: '/audio/va-museum-intro.mp3',
    introTranscript:
      'Welcome to the Victoria and Albert Museum, born from the profits and idealism of the Great Exhibition of eighteen fifty-one. Unlike traditional painting galleries, the V&A celebrates human ingenuity across sculpture, textiles, jewellery, ceramics, and royal court treasures. Because its seven miles of galleries could swallow an entire week, we have crafted a crisp seventy-minute route connecting its five most jaw-dropping spaces, culminating in the glittering royal tiara vault upstairs.',
    highlights: [
      {
        id: 'chihuly-rotunda',
        order: 1,
        title: 'Chihuly Rotunda Sculpture & Madejski Courtyard',
        artistOrOrigin: 'Dale Chihuly · 2001 (27-Foot Blown Glass)',
        location: 'Ground Level · Cromwell Road Grand Entrance',
        durationMinutes: 8,
        image: '/images/chihuly_va.jpg',
        summary:
          'Suspended beneath the Victorian dome hangs a breathtaking 3,800-pound cascade of emerald, cobalt, and gold hand-blown Venetian-style glass.',
        lookClosely:
          'Walk directly beneath the chandelier spiral to see how dozens of coiled glass tendrils are individually wired to a central steel armature.',
        audioUrl: '/audio/va-museum-chihuly-rotunda.mp3',
        audioScript:
          'Look straight up as you step into the Grand Entrance rotunda. Hanging twenty-seven feet down from the Victorian dome is American glass master Dale Chihuly’s radiant green, blue, and gold sculpture, assembled on-site from over a thousand individual hand-blown glass elements. It sets the tone for the entire V&A: historic architecture conversing boldly with fearless modern craft.',
      },
      {
        id: 'tipus-tiger',
        order: 2,
        title: 'South Asia Gallery & Tipu’s Tiger (c. 1793)',
        artistOrOrigin: 'Mysore Royal Workshops · Automaton Organ',
        location: 'Level 1 · Room 41 (South Asia)',
        durationMinutes: 12,
        image: '/images/tipus_tiger.jpg',
        summary:
          'Created for Tipu Sultan, the "Tiger of Mysore," this life-sized carved wooden tiger conceals an eighteen-note pipe organ inside its flank.',
        lookClosely:
          'Spot the ivory keyboard flap tucked into the tiger’s left side — turning the crank made the European soldier’s arm rise and fall while emitting mechanical roars and cries.',
        audioUrl: '/audio/va-museum-tipus-tiger.mp3',
        audioScript:
          'In Room Forty-One stands one of the V&A’s most celebrated and dramatic objects: Tipu’s Tiger, crafted around seventeen ninety-three for Tipu Sultan, ruler of Mysore in southern India. Tipu adopted the tiger as his personal emblem across weapons, thrones, and textiles in defiance of the British East India Company. Concealed inside the wooden beast is a French-influenced mechanical pipe organ; when cranked, bellows simulated the tiger’s growl and the soldier’s wail while his hinged left arm moved up and down.',
      },
      {
        id: 'cast-courts',
        order: 3,
        title: 'The Cast Courts — Trajan’s Column & Michelangelo’s David',
        artistOrOrigin: '19th-Century Electrotypes & Plaster Casts',
        location: 'Level 1 · Rooms 46a & 46b',
        durationMinutes: 18,
        image: '/images/va_cast_courts.jpg',
        summary:
          'Two cathedral-scale Victorian halls enabling grand-tour sightseeing in a single room, dominated by Rome’s 125-foot Trajan’s Column sliced in two.',
        lookClosely:
          'Find the detachable plaster fig leaf stored in a display case near Michelangelo’s 17-foot David — hung whenever Queen Victoria visited the gallery!',
        audioUrl: '/audio/va-museum-cast-courts.mp3',
        audioScript:
          'Step into Rooms Forty-Six A and B and let your eyes travel upward. In the nineteenth century, before affordable travel, museums exchanged full-scale plaster casts of Europe’s greatest monuments. Because Rome’s Trajan’s Column stood taller than even this soaring roof, Victorian engineers cast it in two towering halves side by side. Across the aisle rises Michelangelo’s seventeen-foot David — complete with the famous detachable plaster fig leaf kept on hooks for royal visits by Queen Victoria.',
      },
      {
        id: 'raphael-cartoons',
        order: 4,
        title: 'The Raphael Cartoons (1515–1516)',
        artistOrOrigin: 'Raphael · Commissioned by Pope Leo X',
        location: 'Level 1 · Room 48a (The Raphael Court)',
        durationMinutes: 15,
        image: '/images/raphael_cartoons.jpg',
        summary:
          'Seven monumental full-scale Renaissance designs painted by Raphael for tapestries destined for the walls of the Vatican’s Sistine Chapel.',
        lookClosely:
          'In The Miraculous Draught of Fishes, notice the exquisite, naturalistic reflections shimmering on the water and the herons standing on the foreground shore.',
        audioUrl: '/audio/va-museum-raphael-cartoons.mp3',
        audioScript:
          'Hushed and dramatically lit, Room Forty-Eight A is one of the supreme Renaissance shrines outside Italy. Pope Leo the Tenth commissioned Raphael in fifteen fifteen to paint full-scale tapestry patterns — called cartoons from the Italian cartone, meaning heavy paper — to hang beneath Michelangelo’s ceiling in the Sistine Chapel. Purchased by the future King Charles the First in sixteen twenty-three and lent permanently by the Crown, these vast sheets preserve Raphael’s own monumental compositions in extraordinary freshness.',
      },
      {
        id: 'bollinger-jewellery',
        order: 5,
        title: 'Bollinger Jewellery Gallery — Queen Victoria’s Coronet',
        artistOrOrigin: '3,000 Jewels from Ancient Gold to Cartier',
        location: 'Level 3 · Rooms 91–93',
        durationMinutes: 17,
        image: '/images/va_jewellery.jpg',
        summary:
          'A darkened, vault-like treasury displaying over 3,000 jewels — anchored by the sapphire and diamond coronet designed by Prince Albert for Queen Victoria in 1840.',
        lookClosely:
          'Admire the flexible platinum-and-diamond Cartier tiaras, Catherine the Great’s emeralds, and Queen Victoria’s wedding-year sapphire coronet.',
        audioUrl: '/audio/va-museum-bollinger-jewellery.mp3',
        audioScript:
          'We conclude upstairs in the darkened treasury of the Bollinger Jewellery Gallery, a favorite stop for anyone who loves high craftsmanship and couture design. Over three thousand pieces span ancient Etruscan goldwork, Mughal-cut spinels, Beauharnais emeralds worn at Napoleon’s court, and glittering twentieth-century Cartier tiaras. Do not miss the centerpiece case holding Queen Victoria’s sapphire and diamond coronet, lovingly designed for her by Prince Albert in eighteen forty, the year of their marriage.',
      },
    ],
  },
};

const PALM_COURT_STOP = {
  id: 'sat-palm-court-tea',
  time: '3:30–5:00 p.m.',
  title: 'Palm Court Festive Afternoon Tea at The Langham',
  subtitle: 'Birthplace of Afternoon Tea (1865) · Proposed Reservation',
  category: 'dining',
  bookingStatus: 'proposed',
  neighborhood: 'Marylebone (Inside Your Hotel)',
  address: '1C Portland Place, London W1B 1JA',
  coordinates: { lat: 51.5178, lng: -0.1440 },
  walkOrTransit: 'Right inside The Langham lobby — zero travel after freshening up upstairs!',
  image: '/images/palm_court_tea.jpg',
  summary:
    'In 1865 The Langham became the first grand hotel in Europe to serve Afternoon Tea. During November, Palm Court transforms for its Festive Afternoon Tea accompanied by live grand piano music and bespoke JING tea sommeliers.',
  insiderTips: [
    'Confirm your 3:30 p.m. reservation in advance — Saturday festive slots sell out quickly.',
    'Afternoon tea here is genuinely substantial (four courses with unlimited sandwich & scone replenishments), so you will only want a light supper or wine bar bite later.',
  ],
  links: buildVenueLinks({
    name: 'Palm Court at The Langham',
    city: 'London',
    lat: 51.5178,
    lng: -0.1440,
    tripadvisorUrl: 'https://www.tripadvisor.com/Restaurant_Review-g186338-d1415601-Reviews-Palm_Court_at_The_Langham-London_England.html',
    officialUrl: 'https://www.palm-court.co.uk/',
  }),
  diningGuide: {
    cuisine: 'Traditional & Festive British Afternoon Tea',
    priceRange: '££££',
    accolades: [
      'Birthplace of Hotel Afternoon Tea (1865)',
      'TripAdvisor Travellers’ Choice · Live Piano Salon',
    ],
    vibe: 'Glamorous mirrored Edwardian salon with live pianist and silver tea service',
    dressCode: 'Smart Casual (no athletic wear)',
    featuredDishes: [
      {
        name: 'Warm Plain, Raisin & Savoury Cheese Scones',
        badge: 'TripAdvisor Obsession',
        description:
          'Served warm in linen napkins with rich Cornish clotted cream and seasonal strawberry & spiced winter preserves; reviewers rave especially about the warm savoury cheese scone.',
        dietary: 'Vegetarian',
      },
      {
        name: 'Couture Festive Pastries inspired by British Classics',
        badge: 'Pastry Chef Signature',
        description:
          'Executive Pastry Chef creations reimagining nostalgic British biscuits and Christmas flavours as jewel-like patisserie.',
        dietary: 'Sweet',
      },
      {
        name: 'Delicate Artisanal Finger Sandwiches',
        badge: 'Unlimited Refills',
        description:
          'Smoked Scottish salmon, roast English beef with horseradish, truffled egg, and classic cucumber on artisanal breads — vegetarian/pescatarian tiers available on request.',
        dietary: 'Savoury Tier',
      },
      {
        name: 'The Langham Blend & JING Single-Garden Loose Teas',
        badge: 'Tea Sommelier Pick',
        description:
          'Guided tea pairings from Darjeeling Second Flush and Silver Needle Jasmine to The Langham’s bespoke house blend; feel free to switch teas between courses.',
        dietary: 'Tea & Champagne',
      },
    ],
  },
};

const LIBERTY_STOP = {
  id: 'sat-liberty-shopping',
  time: '5:15–6:00 p.m.',
  title: 'SHOPPING: Liberty London',
  subtitle: 'Iconic 1924 Tudor Timber Department Store (Open till 9 p.m.)',
  category: 'shopping',
  bookingStatus: 'included',
  neighborhood: 'Soho / Great Marlborough Street',
  address: 'Regent Street / Great Marlborough St, London W1B 5AH',
  coordinates: { lat: 51.5139, lng: -0.1402 },
  walkOrTransit: 'Easy 6-minute walk south from The Langham down Regent Street.',
  image: '/images/liberty_london.jpg',
  summary:
    'Built in 1924 from the seasoned oak timbers of two three-decker Royal Navy warships (HMS Impregnable and HMS Hindustan), Liberty feels like an intimate Tudor manor filled with British prints, niche perfumery, designer fashion, and London’s most atmospheric Christmas shop.',
  insiderTips: [
    'Open 10 a.m.–9 p.m. Monday–Saturday during the festive season.',
    'Take the wooden lift to the 4th Floor Christmas Shop, then walk down the central galleried atrium staircase.',
  ],
  links: buildVenueLinks({
    name: 'Liberty London',
    city: 'London',
    lat: 51.5139,
    lng: -0.1402,
    tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g186338-d522874-Reviews-Liberty_London-London_England.html',
    officialUrl: 'https://www.libertylondon.com/',
  }),
  shoppingGuide: {
    priceTier: '£££–££££',
    bestFor: 'Distinctive British prints, silk scarves, niche beauty, handbags & festive gifts',
    walkFromHotel: '5–7 min walk from The Langham',
    highlights: [
      {
        storeName: 'Ground Floor Accessories & Silk Scarf Hall',
        category: 'Heritage Prints & Leather',
        mustSee: 'Iconic Tana Lawn cotton and Como-printed silk scarves, Liberty Iphis totes, and curated fine jewellery.',
        locationNote: 'Ground Floor · Great Marlborough Entrance',
      },
      {
        storeName: 'Liberty Beauty Hall & Niche Perfumery',
        category: 'Fragrance & Skincare',
        mustSee: 'Liberty’s own LBTY fragrance collection alongside Diptyque, Byredo, Augustinus Bader, and Surratt.',
        locationNote: 'Ground Floor · Regent Street Wing',
      },
      {
        storeName: 'Womenswear Designer Galleries & 4th Floor Christmas Shop',
        category: 'British & European Fashion',
        mustSee: 'Curated contemporary & luxury womenswear on Floors 1–2, plus heirloom glass ornaments under the Tudor rafters on Floor 4.',
        locationNote: 'Floors 1, 2 & 4',
      },
    ],
    photographyTip:
      'Stand on the 2nd-floor timber balcony looking across the central atrium chandelier and festive suspended installation.',
  },
};

const CARNABY_EVENING_STOP = {
  id: 'sat-carnaby-evening',
  time: '6:00–7:30 p.m.',
  title: 'SHOPPING: Carnaby Street Lights & Marylebone Supper',
  subtitle: 'Pedestrianized Soho Boutiques, Regent St Angels & Light Evening Bite',
  category: 'shopping',
  bookingStatus: 'included',
  neighborhood: 'Carnaby / Regent Street / Marylebone',
  address: 'Carnaby Street, Soho, London W1F 9PS',
  coordinates: { lat: 51.5132, lng: -0.1389 },
  walkOrTransit: 'Steps behind Liberty’s east archway; 10-minute stroll back up Regent Street to The Langham.',
  image: '/images/carnaby_street.jpg',
  summary:
    'Step straight out of Liberty’s back entrance under the famous illuminated Carnaby Street arch, browse independent boutiques and Kingly Court, and stroll back under the Regent Street Christmas angels toward Marylebone.',
  insiderTips: [
    'If you are still full from Palm Court Afternoon Tea, enjoy a relaxed glass of wine and small plates at The Wigmore (attached to The Langham) or 28°-50° Marylebone.',
  ],
  links: buildVenueLinks({
    name: 'Carnaby Street',
    city: 'London',
    lat: 51.5132,
    lng: -0.1389,
    tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g186338-d191243-Reviews-Carnaby_Street-London_England.html',
    officialUrl: 'https://www.carnaby.co.uk/',
  }),
  shoppingGuide: {
    priceTier: '££–£££',
    bestFor: 'Contemporary labels, heritage British footwear, cosmetics & festive displays',
    walkFromHotel: '8–12 min walk from The Langham',
    highlights: [
      {
        storeName: 'Carnaby Street & Newburgh Quarter',
        category: 'Independent & Contemporary',
        mustSee: 'Rixo, Astrid & Miyu jewellery, Barbour Heritage, and independent British gift shops.',
        locationNote: 'Pedestrianized Carnaby & Foubert’s Place',
      },
    ],
    photographyTip: 'Capture the glowing Carnaby arch from Great Marlborough Street with Liberty’s Tudor gable right beside it.',
  },
  diningGuide: {
    cuisine: 'Light Post-Tea Supper Near The Langham',
    priceRange: '££–££££',
    accolades: ['Walkable Marylebone Favorites'],
    vibe: 'Relaxed evening options depending on appetite after 3:30 p.m. Afternoon Tea',
    featuredDishes: [
      {
        name: 'The Wigmore — XXL Stovetop Three-Cheese & Mustard Toastie + Masala Scotch Egg',
        badge: 'Viral London Tavern Icon',
        description:
          'Located on Regent Street at The Langham itself; food writers across Time Out and The Infatuation call The Wigmore’s oozing cheese toastie the single greatest bar snack in London.',
        dietary: 'Savoury Small Plates',
      },
    ],
    nearbyOptions: [
      {
        name: 'Trishna (Marylebone Village)',
        cuisine: '1 Michelin Star Coastal Indian',
        walkTime: '9 min walk from Langham',
        famousFor: 'Hariyali Bream, Dorset Brown Crab & Kori Gassi',
        tripadvisorUrl: 'https://www.tripadvisor.com/Restaurant_Review-g186338-d1370894-Reviews-Trishna-London_England.html',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Trishna+Marylebone+London',
      },
      {
        name: 'The Wigmore at The Langham',
        cuisine: 'Modern British Luxury Tavern',
        walkTime: 'Inside Hotel Building',
        famousFor: 'XXL Three-Cheese Toastie & Buttered Crumpets',
        tripadvisorUrl: 'https://www.tripadvisor.com/Restaurant_Review-g186338-d12795577-Reviews-The_Wigmore-London_England.html',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Wigmore+Langham+London',
      },
    ],
  },
};

export const DAY_4_SATURDAY = {
  id: 'day-4-sat-nov-21',
  dayNumber: 4,
  dateLabel: 'Sat Nov 21',
  fullDate: 'Saturday, November 21, 2026',
  title: 'Van Eyck Opening, Museums, Afternoon Tea & Principal Shopping',
  theme: 'Fashion, handbags, shoes, beauty & Northern Renaissance portraits',
  shoppingSummary: 'Principal Shopping Day · Liberty, Carnaby, Regent St (+ Harrods Option)',
  weatherTip: 'Switch between Track A (both South Kensington museums) and Track B (Harrods luxury shopping focus for Nutan) below!',
  stops: [
    NATIONAL_GALLERY_STOP,
    {
      id: 'sat-nhm',
      time: '12:00–1:15 p.m.',
      title: 'Natural History Museum — Selected Icons',
      subtitle: 'Hintze Hall Blue Whale, Stegosaurus & Treasures Vault',
      category: 'museum',
      bookingStatus: 'included',
      neighborhood: 'South Kensington',
      address: 'Cromwell Road, South Kensington, London SW7 5BD',
      coordinates: { lat: 51.4967, lng: -0.1764 },
      walkOrTransit: 'Piccadilly Line direct from Leicester Square / Piccadilly Circus to South Kensington (12 mins).',
      image: '/images/nhm_london.jpg',
      summary:
        'Alfred Waterhouse’s soaring 1881 Romanesque "Cathedral of Nature" clad in sculpted terracotta wildlife. This 75-minute express tour hits the four architectural and scientific wonders without museum fatigue.',
      insiderTips: [
        'Book a free timed entry pass online to breeze past the Cromwell Road queue.',
        'Look up at the 162 painted botanical ceiling panels lining Hintze Hall.',
      ],
      links: buildVenueLinks({
        name: 'Natural History Museum',
        city: 'London',
        lat: 51.4967,
        lng: -0.1764,
        tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g186338-d187674-Reviews-Natural_History_Museum-London_England.html',
        officialUrl: 'https://www.nhm.ac.uk/',
      }),
      museumTour: {
        tourId: 'natural-history',
        tourTitle: 'Cathedral of Nature — 75-Minute Express Highlights',
        narrator: 'Dr. Julian Vance · Science & Heritage Guide',
        voiceId: 'en-GB-RyanNeural',
        totalDurationMinutes: 65,
        routeStrategy:
          'Begin in Hintze Hall beneath Hope the Blue Whale, visit Dinosaurs (Blue Zone), ascend the grand staircase to the Cadogan Treasures Gallery, and exit via Earth Hall past Sophie the Stegosaurus toward the V&A.',
        introAudioUrl: '/audio/natural-history-intro.mp3',
        introTranscript:
          'Step inside London’s beloved Cathedral of Nature. Opened in eighteen eighty-one, architect Alfred Waterhouse wrapped every pillar and archway in buff and blue-grey terracotta reliefs of living creatures on the west wing and extinct fossils on the east. Over the next hour we will stand beneath the largest animal ever to live on Earth, meet the world’s most complete Stegosaurus, and inspect the fossil that proved birds evolved from dinosaurs.',
        highlights: [
          {
            id: 'hope-blue-whale',
            order: 1,
            title: 'Hintze Hall & "Hope" the 25-Metre Blue Whale',
            artistOrOrigin: '1891 Wexford Specimen · 4.5 Tonnes (221 Bones)',
            location: 'Ground Floor · Central Hintze Hall',
            durationMinutes: 15,
            image: '/images/nhm_london.jpg',
            summary:
              'Suspended mid-dive from the Victorian iron-and-terracotta nave hangs the real 82-foot skeleton of a female blue whale.',
            lookClosely:
              'Look at the terracotta monkeys climbing the arches and the "Gilded Canopy" of 162 botanical ceiling panels including cocoa, cotton, and tea.',
            audioUrl: '/audio/natural-history-hope-blue-whale.mp3',
            audioScript:
              'Pause in the center of Hintze Hall as the eighty-two-foot skeleton of Hope the blue whale dives gracefully above your head. Weighing four and a half tonnes across two hundred and twenty-one real bones, she replaced Dippy the Diplodocus here in twenty seventeen as a symbol of ocean conservation. Before moving on, notice the playful terracotta monkeys scampering up the Romanesque stone arches and Charles Darwin presiding serenely on the grand staircase.',
          },
          {
            id: 'dinosaurs-trex',
            order: 2,
            title: 'Dinosaurs Gallery & Iguanodon / T. rex Icons',
            artistOrOrigin: 'Mesozoic Era · Sir Richard Owen’s Original Fossils',
            location: 'Ground Floor · Blue Zone Gallery 21',
            durationMinutes: 18,
            image: '/images/trex_nhm.jpg',
            summary:
              'Walk the elevated walkway beside Baryonyx, Triceratops, armored Scolosaurus, and the museum’s famous lifelike Tyrannosaurus rex.',
            lookClosely:
              'Spot the historic Iguanodon teeth studied by Museum founder Sir Richard Owen when he coined the word "Dinosauria" in 1842.',
            audioUrl: '/audio/natural-history-dinosaurs-trex.mp3',
            audioScript:
              'Did you know the very word dinosaur was invented by this museum’s founding superintendent? In eighteen forty-two, anatomist Sir Richard Owen examined giant fossil reptiles from English quarries and named them Dinosauria, meaning fearfully great lizards. Follow the suspended walkway past Triceratops skulls and British Baryonyx claws to the roaring Tyrannosaurus rex finale.',
          },
          {
            id: 'archaeopteryx-treasures',
            order: 3,
            title: 'London Specimen of Archaeopteryx & Darwin’s Pigeons',
            artistOrOrigin: '150 Million Years Old · Solnhofen Limestone',
            location: 'First Floor · Green Zone Cadogan Gallery 22',
            durationMinutes: 15,
            image: '/images/archaeopteryx_london.jpg',
            summary:
              'Discovered in Bavaria in 1861 — just two years after Darwin published On the Origin of Species — preserving unmistakable flight feathers alongside reptilian teeth and a bony tail.',
            lookClosely:
              'Trace the delicate fan of fossilized wing feathers etched into the fine-grained cream limestone slab.',
            audioUrl: '/audio/natural-history-archaeopteryx-treasures.mp3',
            audioScript:
              'Upstairs in the quiet Cadogan Treasures Gallery rests arguably the single most important fossil in the history of evolutionary science. Unearthed in a German limestone quarry in eighteen sixty-one, just two years after Charles Darwin published On the Origin of Species, this crow-sized Archaeopteryx revealed reptile jaws and clawed fingers fused unmistakably with modern flight feathers — Darwin’s predicted transitional link set in stone.',
          },
          {
            id: 'sophie-stegosaurus',
            order: 4,
            title: '"Sophie" — World’s Most Complete Stegosaurus',
            artistOrOrigin: 'Late Jurassic · 85% Intact Real Skeleton',
            location: 'Ground Floor · Exhibition Road Entrance (Earth Hall)',
            durationMinutes: 12,
            image: '/images/stegosaurus_nhm.jpg',
            summary:
              'Positioned right by the Exhibition Road exit directly facing the V&A across the street, Sophie preserves 360 original fossil bones.',
            lookClosely:
              'Examine the 19 upright back plates and the four deadly tail spikes ("thagomizer") poised in defensive stance.',
            audioUrl: '/audio/natural-history-sophie-stegosaurus.mp3',
            audioScript:
              'As you head toward the Exhibition Road exit to cross straight over to the V&A, greet Sophie — the most intact Stegosaurus skeleton ever discovered anywhere in the world, with eighty-five percent of her original Jurassic bones preserved. Notice how surprisingly small her head is compared to the nineteen kite-shaped bony plates running down her spine, which likely flushed with blood for temperature control and display.',
          },
        ],
      },
    },
    VA_MUSEUM_STOP,
    PALM_COURT_STOP,
    LIBERTY_STOP,
    CARNABY_EVENING_STOP,
  ],
  alternateTrack: {
    id: 'sat-harrods-shopping',
    label: 'Nutan’s Relaxed Harrods & Luxury Shopping Track (Recommended)',
    description:
      'Recommended in your itinerary: visit ONE South Kensington museum (V&A or Natural History) after Van Eyck, then enjoy dedicated Harrods shopping in Knightsbridge before Palm Court Tea and an unhurried evening at Liberty & Carnaby Street.',
    stops: [
      NATIONAL_GALLERY_STOP,
      {
        ...VA_MUSEUM_STOP,
        id: 'sat-alt-va',
        time: '12:00–1:25 p.m.',
        subtitle: 'Single South Kensington Museum Choice (V&A or Natural History)',
      },
      {
        id: 'sat-alt-harrods',
        time: '1:30–2:45 p.m.',
        title: 'SHOPPING: Harrods in Knightsbridge',
        subtitle: 'London’s Iconic Luxury Department Store & Edwardian Food Halls',
        category: 'shopping',
        bookingStatus: 'included',
        neighborhood: 'Knightsbridge',
        address: '87–135 Brompton Road, Knightsbridge, London SW1X 7XL',
        coordinates: { lat: 51.4994, lng: -0.1632 },
        walkOrTransit: '10-minute walk east along Brompton Road from the V&A (or 1 stop on Piccadilly Line to Knightsbridge).',
        image: '/images/harrods.jpg',
        summary:
          'Illuminated by 12,000 exterior lights along Brompton Road, Harrods offers 330 departments of international luxury fashion, Europe’s grandest Shoe Heaven, Fine Jewellery, and spectacular tiled Food Halls.',
        insiderTips: [
          'Do not miss the Ground Floor Roastery & Bakehall / Chocolate Hall for luxury edible gifts.',
          'Shoe Heaven on the 5th Floor and Luxury Accessories on the Ground Floor are tailored to Nutan’s shopping focus.',
          'Want Selfridges’ revamped £300m Bag Hall instead? Take a 10-min taxi from Knightsbridge up Park Lane to 400 Oxford Street before returning to The Langham.',
        ],
        links: buildVenueLinks({
          name: 'Harrods',
          city: 'London',
          lat: 51.4994,
          lng: -0.1632,
          tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g186338-d187696-Reviews-Harrods-London_England.html',
          officialUrl: 'https://www.harrods.com/',
        }),
        shoppingGuide: {
          priceTier: '££££–£££££',
          bestFor: 'International luxury handbags, Shoe Heaven, Fine Beauty & Gourmet Tea/Chocolate Gifts',
          walkFromHotel: '15 min taxi or Underground via Knightsbridge',
          highlights: [
            {
              storeName: 'Luxury Accessories & Fine Leather Halls',
              category: 'Handbags & Couture',
              mustSee: 'Chanel, Dior, Prada, Bottega Veneta, Celine, and Loewe boutiques under one roof.',
              locationNote: 'Ground Floor · Brompton Road',
            },
            {
              storeName: 'Shoe Heaven (5th Floor)',
              category: 'Designer Footwear',
              mustSee: 'Marble-clad salons featuring Manolo Blahnik, Christian Louboutin, Jimmy Choo, Roger Vivier & Gucci.',
              locationNote: 'Fifth Floor via Central Escalators',
            },
            {
              storeName: 'Historic Grade II* Tiled Food & Tea Halls',
              category: 'Luxury Gifts',
              mustSee: 'Harrods Knightsbridge Loose Teas, artisan truffles, and festive hampers.',
              locationNote: 'Ground Floor · Hans Crescent Side',
            },
          ],
          photographyTip: 'Step across Brompton Road as dusk approaches to frame Harrods’ famous terracotta facade glowing in golden lights.',
        },
      },
      PALM_COURT_STOP,
      {
        ...LIBERTY_STOP,
        id: 'sat-alt-liberty',
        time: '5:15–6:20 p.m.',
      },
      {
        ...CARNABY_EVENING_STOP,
        id: 'sat-alt-carnaby',
        time: '6:20–7:30 p.m.',
      },
    ],
  },
};

export const DAY_5_SUNDAY = {
  id: 'day-5-sun-nov-22',
  dayNumber: 5,
  dateLabel: 'Sun Nov 22',
  fullDate: 'Sunday, November 22, 2026',
  title: 'Cotswolds Countryside Excursion & Honey-Stone Village Boutiques',
  theme: 'Scenic photography, medieval market squares, woolens & riverside lunch',
  shoppingSummary: 'Village boutiques, British woolens, ceramics, local crafts & gourmet gifts',
  weatherTip: 'Country lanes in Lower Slaughter can be damp in November — wear comfortable water-resistant walking shoes and warm layers.',
  stops: [
    {
      id: 'sun-stow-on-the-wold',
      time: '8:00 a.m. Pickup → 10:30–11:45 a.m.',
      title: 'Stow-on-the-Wold — Market Square & Yew-Tree Door',
      subtitle: 'Highest Market Town in the Cotswolds + Countryside Audio Tour',
      category: 'historic',
      bookingStatus: 'action_needed',
      neighborhood: 'Cotswolds (Gloucestershire)',
      address: 'Market Square & St Edward’s Church, Stow-on-the-Wold GL54 1AB',
      coordinates: { lat: 51.9304, lng: -1.7243 },
      walkOrTransit: 'Private driver-guide pickup at The Langham (8:00–8:30 a.m., ~2 hours west via M40/Oxfordshire).',
      image: '/images/stow_on_the_wold.jpg',
      summary:
        'Perched 800 feet atop Roman Fosse Way, Stow-on-the-Wold once hosted sheep fairs of 20,000 sheep in a single day. Today its golden limestone square is lined with antique galleries, cashmere & woollen shops, and the fairytale yew-framed North Door of St Edward’s Church.',
      insiderTips: [
        'Reminder: Private Cotswolds driver-guide with Langham pickup still needs to be booked.',
        'Walk 1 minute behind Market Square to St Edward’s Church North Porch — two ancient yew trees grow right into the stone arch, widely said to have inspired J.R.R. Tolkien’s Doors of Durin.',
      ],
      links: buildVenueLinks({
        name: 'Stow-on-the-Wold',
        city: 'Cotswolds',
        lat: 51.9304,
        lng: -1.7243,
        tripadvisorUrl: 'https://www.tripadvisor.com/Tourism-g186290-Stow_on_the_Wold_Cotswolds_England-Vacations.html',
        officialUrl: 'https://www.cotswolds.com/plan-your-trip/towns-and-villages/stow-on-the-wold-p698233',
      }),
      shoppingGuide: {
        priceTier: '££–£££',
        bestFor: 'Scottish & British cashmere/woolens, antiques, leather goods & artisanal cheeses',
        walkFromHotel: 'Door-to-door private car',
        highlights: [
          {
            storeName: 'Cotswold Cheese Company & Market Square Boutiques',
            category: 'Gourmet & British Crafts',
            mustSee: 'Local Single Gloucester & Bledington Blue cheeses, chutneys, tweed caps, and lambskin gloves.',
            locationNote: 'Fosse Way / Market Square',
          },
          {
            storeName: 'Borzoi Bookshop & Talbot Court Galleries',
            category: 'Independent Books & Art',
            mustSee: 'Beloved independent Cotswold bookshop and courtyard craft studios.',
            locationNote: 'Church Street',
          },
        ],
        photographyTip: 'Frame Nutan in the ancient yew-tree North Door of St Edward’s Church in soft morning light before tour buses arrive.',
      },
      museumTour: {
        tourId: 'cotswolds-tour',
        tourTitle: 'Golden Limestone Villages — Cotswolds Audio Companion',
        narrator: 'Dr. Eleanor Vance · English Heritage Guide',
        voiceId: 'en-GB-SoniaNeural',
        totalDurationMinutes: 45,
        routeStrategy:
          'Play each chapter as your driver arrives in Stow-on-the-Wold, Lower Slaughter, and Bourton-on-the-Water.',
        introAudioUrl: '/audio/cotswolds-tour-intro.mp3',
        introTranscript:
          'Welcome to the Cotswolds, England’s largest Area of Outstanding Natural Beauty. Notice the warm, honey-gold glow of every cottage wall and church tower: this is Jurassic oolitic limestone, formed beneath a warm tropical sea one hundred and sixty million years ago. In the Middle Ages, the famous long-fleeced Cotswold Lion sheep grazed these hills, generating wool wealth that built soaring wool churches and timeless market squares.',
        highlights: [
          {
            id: 'stow-tolkien-door',
            order: 1,
            title: 'Stow-on-the-Wold Market Cross & St Edward’s Yew Door',
            artistOrOrigin: '11th–15th Century Wool Town · Gloucestershire',
            location: 'Market Square & Church Street North Porch',
            durationMinutes: 15,
            image: '/images/stow_on_the_wold.jpg',
            summary:
              'Medieval crossroads where narrow "tures" (alleys) were built to funnel thousands of sheep into the central square for counting.',
            lookClosely:
              'Look at the two gnarled yew trees flanking St Edward’s arched wooden door like living stone pillars, and spot the Civil War musket marks inside the church.',
            audioUrl: '/audio/cotswolds-tour-stow-tolkien-door.mp3',
            audioScript:
              'Standing in Stow-on-the-Wold’s wide Market Square, look for the narrow stone passageways — locally called tures — squeezing between the shops. Centuries ago shepherds drove twenty thousand sheep through those narrow chutes so toll collectors could count every fleece. Just steps away stands St Edward’s Church: walk around to its quiet north porch, where two centuries-old yew trees embrace the gothic timber door like a portal straight out of Middle-earth.',
          },
          {
            id: 'lower-slaughter-mill',
            order: 2,
            title: 'Lower Slaughter, Copse Hill Road & The Old Mill',
            artistOrOrigin: 'Domesday Village · 19th-Century Watermill',
            location: 'River Eye Footbridges · Lower Slaughter',
            durationMinutes: 15,
            image: '/images/lower_slaughter.jpg',
            summary:
              'Completely untouched by modern signage, Lower Slaughter’s shallow River Eye meanders beneath miniature stone footbridges to a red-brick Victorian waterwheel.',
            lookClosely:
              'Despite its dramatic name, "Slaughter" comes from the Old English word "slothre," meaning a wet or muddy riverside place!',
            audioUrl: '/audio/cotswolds-tour-lower-slaughter-mill.mp3',
            audioScript:
              'Despite its fierce-sounding name, Lower Slaughter derives peacefully from the Old English word slothre, simply meaning a marshy stream. Follow the crystal-clear River Eye along Copse Hill Road — repeatedly voted Britain’s most romantic street — across miniature stone footbridges linking limestone cottages to the road, until you reach the red-brick nineteenth-century Old Mill and its turning wooden waterwheel.',
          },
          {
            id: 'bourton-venice',
            order: 3,
            title: 'Bourton-on-the-Water — Venice of the Cotswolds',
            artistOrOrigin: 'Five Historic Stone Bridges (1654–1911)',
            location: 'High Street & River Windrush Green',
            durationMinutes: 15,
            image: '/images/bourton_on_the_water.jpg',
            summary:
              'Five graceful low-arched stone bridges span the sparkling River Windrush right down the village green.',
            lookClosely:
              'Examine the 1796 Paynes Bridge and the tiny 1:9-scale limestone Model Village hidden behind The Old New Inn.',
            audioUrl: '/audio/cotswolds-tour-bourton-venice.mp3',
            audioScript:
              'Here in Bourton-on-the-Water, the shallow River Windrush flows straight down the middle of the village green, crossed by five low stone footbridges built between sixteen fifty-four and nineteen eleven. Because the arches sit barely feet above the rippling water, travelers dubbed Bourton the Venice of the Cotswolds. After lunch, enjoy browsing its riverside ceramic studios, perfumery, and woollen shops.',
          },
        ],
      },
    },
    {
      id: 'sun-lower-slaughter',
      time: '12:00–12:45 p.m.',
      title: 'Lower Slaughter — River Eye Footbridges & Old Mill',
      subtitle: 'Unhurried Photography Walk in the Cotswolds’ Prettiest Village',
      category: 'scenic',
      bookingStatus: 'included',
      neighborhood: 'Lower Slaughter',
      address: 'Copse Hill Road, Lower Slaughter GL54 2HX',
      coordinates: { lat: 51.9012, lng: -1.7595 },
      walkOrTransit: '8-minute countryside drive south from Stow-on-the-Wold.',
      image: '/images/lower_slaughter.jpg',
      summary:
        'A tranquil, car-free-feeling hamlet where honey-stone cottages and miniature stone bridges line the gently flowing River Eye down to the 19th-century Old Mill.',
      insiderTips: [
        'Walk the flat 5-minute riverside footpath all the way to the Old Mill waterwheel at the western end of the lane for the iconic postcard angle.',
      ],
      links: buildVenueLinks({
        name: 'Lower Slaughter',
        city: 'Cotswolds',
        lat: 51.9012,
        lng: -1.7595,
        tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g1096488-d2515000-Reviews-The_Old_Mill_Museum-Lower_Slaughter_Cotswolds_England.html',
      }),
    },
    {
      id: 'sun-bourton-lunch',
      time: '1:00–2:45 p.m.',
      title: 'Bourton-on-the-Water — Riverside Lunch & Village Boutiques',
      subtitle: 'Low Stone Bridges on the Windrush, British Crafts & Afternoon Village Stop',
      category: 'dining',
      bookingStatus: 'proposed',
      neighborhood: 'Bourton-on-the-Water',
      address: 'Riverside, Bourton-on-the-Water GL54 2BX',
      coordinates: { lat: 51.8842, lng: -1.7582 },
      walkOrTransit: '5-minute drive from Lower Slaughter; optional afternoon stop in Burford or Bibury on return to London (6:00–7:00 p.m.).',
      image: '/images/bourton_on_the_water.jpg',
      summary:
        'Enjoy a cozy Cotswold lunch overlooking the River Windrush followed by gentle browsing for handmade ceramics, wool scarves, Cotswold lavender, and artisanal preserves before your driver returns you to The Langham by early evening.',
      insiderTips: [
        'Ask your driver to pause in medieval Burford High Street on the drive back toward London for panoramic views and charming antique shops.',
      ],
      links: buildVenueLinks({
        name: 'Bourton-on-the-Water',
        city: 'Cotswolds',
        lat: 51.8842,
        lng: -1.7582,
        tripadvisorUrl: 'https://www.tripadvisor.com/Tourism-g186284-Bourton_on_the_Water_Cotswolds_England-Vacations.html',
      }),
      diningGuide: {
        cuisine: 'Countryside British Gastropub & Tearooms',
        priceRange: '££–£££',
        accolades: ['Top-Rated River Windrush Dining'],
        vibe: 'Warm Cotswold stone hearths, Sunday roast aromas, and riverside pastry counters',
        featuredDishes: [
          {
            name: 'Traditional Sunday Roast & Slow-Braised Cotswold Lamb',
            badge: 'Sunday Tradition',
            description:
              'Served across top village inns on Sundays with crisp Yorkshire pudding, duck-fat roast potatoes, and local seasonal greens.',
            dietary: 'Classic Roast',
          },
          {
            name: 'Warm Riverside Scones & Sticky Toffee Pudding',
            badge: 'Bakery on the Water Icon',
            description:
              'Reviewers rave about freshly baked scones, Cornish pasties, and rich date sticky toffee pudding right beside the stone footbridges.',
            dietary: 'Vegetarian / Sweet',
          },
          {
            name: 'Beer-Battered Fish & Triple-Cooked Chips',
            badge: 'Country Pub Classic',
            description:
              'Crisp sustainable haddock with crushed minted peas and homemade tartare sauce.',
            dietary: 'Seafood',
          },
        ],
        nearbyOptions: [
          {
            name: 'The Rose Tree Restaurant',
            cuisine: 'Riverside British Bistro',
            walkTime: 'On Riverside Green',
            famousFor: 'River Windrush window tables, Cotswold Lamb & Sticky Toffee Pudding',
            tripadvisorUrl: 'https://www.tripadvisor.com/Restaurant_Review-g186284-d735584-Reviews-The_Rose_Tree_Restaurant-Bourton_on_the_Water_Cotswolds_England.html',
            googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Rose+Tree+Restaurant+Bourton+on+the+Water',
          },
          {
            name: 'Bakery on the Water',
            cuisine: 'Artisanal Bakery & Riverside Garden',
            walkTime: '1 Sherborne Street',
            famousFor: 'Freshly baked sourdough, pasties, millionaire’s shortbread & cream tea',
            tripadvisorUrl: 'https://www.tripadvisor.com/Restaurant_Review-g186284-d2092990-Reviews-Bakery_on_the_Water-Bourton_on_the_Water_Cotswolds_England.html',
            googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bakery+on+the+Water+Bourton',
          },
          {
            name: 'The Mousetrap Inn',
            cuisine: '18th-Century Cotswold Gastropub',
            walkTime: '4 min walk up Lansdowne',
            famousFor: 'Elevated Sunday Roasts, vegetarian nut roasts & local ales by the fire',
            tripadvisorUrl: 'https://www.tripadvisor.com/Restaurant_Review-g186284-d1520105-Reviews-The_Mousetrap_Inn-Bourton_on_the_Water_Cotswolds_England.html',
            googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Mousetrap+Inn+Bourton+on+the+Water',
          },
        ],
      },
      shoppingGuide: {
        priceTier: '£–£££',
        bestFor: 'Cotswold perfumery, woolens, ceramics & handmade British gifts',
        walkFromHotel: 'Riverside High Street',
        highlights: [
          {
            storeName: 'Cotswold Perfumery & High Street Craft Boutiques',
            category: 'Fragrance, Wool & Ceramics',
            mustSee: 'Bespoke fragrances blended in-village since 1966, pure merino throws, and hand-thrown stoneware.',
            locationNote: 'Victoria Street & High Street',
          },
        ],
      },
    },
  ],
  alternateTrack: {
    id: 'sun-royal-albert-hall',
    label: 'London Alternative: Carmina Burana at Royal Albert Hall',
    description:
      'As noted in your itinerary: attending Carl Orff’s Carmina Burana at the Royal Albert Hall would replace the Cotswolds excursion so the day stays unhurried.',
    stops: [
      {
        id: 'sun-alt-kensington-walk',
        time: '11:00 a.m.–2:00 p.m.',
        title: 'Kensington Gardens Stroll & Knightsbridge Lunch',
        subtitle: 'Relaxed London Sunday before the Concert Hall',
        category: 'scenic',
        bookingStatus: 'included',
        neighborhood: 'Kensington',
        address: 'Kensington Gore, London SW7 2AP',
        coordinates: { lat: 51.5025, lng: -0.1774 },
        walkOrTransit: '15-minute taxi from The Langham across Hyde Park.',
        image: '/images/harrods.jpg',
        summary: 'Enjoy a leisurely late morning stroll past the Albert Memorial and Italian Gardens in Hyde Park, followed by a relaxed Kensington lunch.',
        insiderTips: ['Pair with a visit to Fortnum & Mason on Piccadilly (open Sundays 11:30 a.m.–6:00 p.m.) for royal tea hampers.'],
        links: buildVenueLinks({
          name: 'Kensington Gardens',
          city: 'London',
          lat: 51.5025,
          lng: -0.1774,
        }),
      },
      {
        id: 'sun-alt-carmina',
        time: 'Afternoon / Evening Performance',
        title: 'Carmina Burana at the Royal Albert Hall',
        subtitle: 'Monumental Choral Masterpiece in Victorian Rotunda',
        category: 'performance',
        bookingStatus: 'proposed',
        neighborhood: 'South Kensington',
        address: 'Kensington Gore, South Kensington, London SW7 2AP',
        coordinates: { lat: 51.5009, lng: -0.1774 },
        walkOrTransit: '15-minute black cab straight back to The Langham.',
        image: '/images/royal_albert_hall.jpg',
        summary:
          'Experience Carl Orff’s thunderous "O Fortuna" performed by massed symphony orchestra and chorus beneath the iconic 1871 dome of the Royal Albert Hall.',
        insiderTips: ['Note: Only choose this track if skipping the Cotswolds private day tour — both cannot comfortably fit on Sunday.'],
        links: buildVenueLinks({
          name: 'Royal Albert Hall',
          city: 'London',
          lat: 51.5009,
          lng: -0.1774,
          tripadvisorUrl: 'https://www.tripadvisor.com/Attraction_Review-g186338-d187553-Reviews-Royal_Albert_Hall-London_England.html',
          officialUrl: 'https://www.royalalberthall.com/',
        }),
      },
    ],
  },
};
