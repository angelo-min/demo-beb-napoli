"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type Language = "it" | "en" | "fr" | "es";

interface TranslationEntry {
  it: string;
  en: string;
  fr?: string;
  es?: string;
}

interface Translations {
  [key: string]: TranslationEntry;
}

export const translations: Translations = {
  // Navigation & Common
  "nav.admin": { it: "Amministrazione", en: "Admin", fr: "Administration", es: "Administración" },
  "nav.home": { it: "Home", en: "Home", fr: "Accueil", es: "Inicio" },

  // Hero Section
  "hero.tagline": {
    it: "Dimore Mediterranee",
    en: "Dimore Mediterranee",
    fr: "Dimore Mediterranee",
    es: "Dimore Mediterranee",
  },
  "hero.subtitle": {
    it: "Ospitalità Autentica nel Sud Italia",
    en: "Authentic Southern Italian Hospitality",
    fr: "Hospitalité Authentique dans le Sud de l'Italie",
    es: "Hospitalidad Auténtica en el Sur de Italia",
  },
  "hero.description": {
    it: "Scopri il calore della Campania attraverso le nostre dimore d'eccezione. Comfort raffinato, autenticità e la magia del Sud Italia ti aspettano.",
    en: "Discover the warmth of Campania through our exceptional accommodations. Refined comfort, authenticity, and the magic of Southern Italy await you.",
    fr: "Découvrez la chaleur de la Campanie à travers nos hébergements d'exception. Confort raffiné, authenticité et la magie du Sud de l'Italie vous attendent.",
    es: "Descubre la calidez de Campania a través de nuestros alojamientos excepcionales. Confort refinado, autenticidad y la magia del Sur de Italia te esperan.",
  },

  // Properties Section
  "properties.title": { it: "Le Nostre Dimore", en: "Our Properties", fr: "Nos Propriétés", es: "Nuestras Propiedades" },
  "properties.cta": { it: "Scopri", en: "Discover", fr: "Découvrir", es: "Descubrir" },

  // Alegria Property
  "alegria.name": { it: "Alegria — Nido degli Dei", en: "Alegria — Nido degli Dei", fr: "Alegria — Nido degli Dei", es: "Alegria — Nido degli Dei" },
  "alegria.location": { it: "Agerola, Monti Lattari", en: "Agerola, Lattari Mountains", fr: "Agerola, Monts Lattari", es: "Agerola, Montes Lattari" },
  "alegria.description": {
    it: "Sospesa tra cielo e mare, Alegria offre una fuga romantica sui Monti Lattari. Vista mozzafiato sulla Costiera Amalfitana, colazioni genuine e la quiete della natura.",
    en: "Suspended between sky and sea, Alegria offers a romantic escape in the Lattari Mountains. Breathtaking views of the Amalfi Coast, genuine breakfasts, and the tranquility of nature.",
    fr: "Suspendue entre ciel et mer, Alegria offre une escapade romantique dans les Monts Lattari. Vue imprenable sur la Côte Amalfitaine, petits-déjeuners authentiques et la tranquillité de la nature.",
    es: "Suspendida entre cielo y mar, Alegria ofrece una escapada romántica en los Montes Lattari. Vistas impresionantes de la Costa Amalfitana, desayunos genuinos y la tranquilidad de la naturaleza.",
  },

  // Casa Momi Property
  "casamomi.name": { it: "Casa Momi Mergellina", en: "Casa Momi Mergellina", fr: "Casa Momi Mergellina", es: "Casa Momi Mergellina" },
  "casamomi.location": { it: "Napoli", en: "Naples", fr: "Naples", es: "Nápoles" },
  "casamomi.description": {
    it: "Nel cuore pulsante di Napoli, Casa Momi è il punto di partenza ideale per esplorare la città. Eleganza contemporanea, posizione privilegiata sul lungomare di Mergellina.",
    en: "In the vibrant heart of Naples, Casa Momi is the ideal starting point to explore the city. Contemporary elegance with a privileged position on Mergellina's waterfront.",
    fr: "Au cœur vibrant de Naples, Casa Momi est le point de départ idéal pour explorer la ville. Élégance contemporaine avec une position privilégiée sur le front de mer de Mergellina.",
    es: "En el vibrante corazón de Nápoles, Casa Momi es el punto de partida ideal para explorar la ciudad. Elegancia contemporánea con una posición privilegiada en el paseo marítimo de Mergellina.",
  },

  // Why Choose Us
  "why.title": { it: "Perché Sceglierci", en: "Why Choose Us", fr: "Pourquoi Nous Choisir", es: "Por Qué Elegirnos" },
  "why.direct.title": { it: "Prenotazione Diretta", en: "Book Direct", fr: "Réservation Directe", es: "Reserva Directa" },
  "why.direct.desc": {
    it: "Prenota direttamente con noi e risparmia. Nessun intermediario, solo il miglior prezzo garantito.",
    en: "Book directly with us and save. No middlemen, just the best price guaranteed.",
    fr: "Réservez directement chez nous et économisez. Pas d'intermédiaire, juste le meilleur prix garanti.",
    es: "Reserva directamente con nosotros y ahorra. Sin intermediarios, solo el mejor precio garantizado.",
  },
  "why.family.title": { it: "Gestione Familiare", en: "Family Run", fr: "Gestion Familiale", es: "Gestión Familiar" },
  "why.family.desc": {
    it: "Accoglienza calorosa e attenzione personale. Vi trattiamo come ospiti di casa, non come numeri.",
    en: "Warm welcome and personal attention. We treat you as family guests, not numbers.",
    fr: "Accueil chaleureux et attention personnelle. Nous vous traitons comme des invités de la famille, pas comme des numéros.",
    es: "Acogida cálida y atención personalizada. Te tratamos como invitados de la familia, no como números.",
  },
  "why.location.title": { it: "Posizioni Uniche", en: "Unique Locations", fr: "Emplacements Uniques", es: "Ubicaciones Únicas" },
  "why.location.desc": {
    it: "Dalla Costiera Amalfitana al cuore di Napoli — le nostre dimore sono in posizioni privilegiate.",
    en: "From the Amalfi Coast to the heart of Naples — our properties are in prime locations.",
    fr: "De la Côte Amalfitaine au cœur de Naples — nos propriétés sont dans des emplacements privilégiés.",
    es: "Desde la Costa Amalfitana hasta el corazón de Nápoles — nuestras propiedades están en ubicaciones privilegiadas.",
  },
  "why.eco.title": { it: "Eco-Sostenibile", en: "Eco-Friendly", fr: "Éco-Responsable", es: "Eco-Sostenible" },
  "why.eco.desc": {
    it: "Energia rinnovabile, prodotti biologici e pratiche sostenibili per un turismo responsabile.",
    en: "Renewable energy, organic products, and sustainable practices for responsible tourism.",
    fr: "Énergie renouvelable, produits biologiques et pratiques durables pour un tourisme responsable.",
    es: "Energía renovable, productos orgánicos y prácticas sostenibles para un turismo responsable.",
  },

  // Home CTA
  "home.cta.title": { it: "Prenota la Tua Esperienza", en: "Book Your Experience", fr: "Réservez Votre Expérience", es: "Reserva Tu Experiencia" },
  "home.cta.desc": {
    it: "Contattaci direttamente per le migliori tariffe e un'accoglienza su misura.",
    en: "Contact us directly for the best rates and a tailored welcome.",
    fr: "Contactez-nous directement pour les meilleurs tarifs et un accueil sur mesure.",
    es: "Contáctanos directamente para las mejores tarifas y una acogida personalizada.",
  },

  // Footer
  "footer.brand": { it: "Dimore Mediterranee", en: "Dimore Mediterranee", fr: "Dimore Mediterranee", es: "Dimore Mediterranee" },
  "footer.tagline": {
    it: "Ospitalità autentica nel Sud Italia",
    en: "Authentic hospitality in Southern Italy",
    fr: "Hospitalité authentique dans le Sud de l'Italie",
    es: "Hospitalidad auténtica en el Sur de Italia",
  },
  "footer.contact": { it: "Contatti", en: "Contact", fr: "Contact", es: "Contacto" },
  "footer.follow": { it: "Seguici", en: "Follow Us", fr: "Suivez-nous", es: "Síguenos" },
  "footer.rights": {
    it: "Tutti i diritti riservati",
    en: "All rights reserved",
    fr: "Tous droits réservés",
    es: "Todos los derechos reservados",
  },

  // WhatsApp Discount
  "whatsapp.cta": { it: "Sconto Diretto", en: "Direct Discount", fr: "Réduction Directe", es: "Descuento Directo" },
  "whatsapp.label": {
    it: "Scrivici su WhatsApp per uno sconto esclusivo!",
    en: "Message us on WhatsApp for an exclusive discount!",
    fr: "Écrivez-nous sur WhatsApp pour une réduction exclusive !",
    es: "¡Escríbenos en WhatsApp para un descuento exclusivo!",
  },
  "whatsapp.badge": { it: "Risparmia prenotando direttamente", en: "Save by booking directly", fr: "Économisez en réservant directement", es: "Ahorra reservando directamente" },
  "phone.cta": { it: "Chiamaci", en: "Call Us", fr: "Appelez-nous", es: "Llámanos" },
  "whatsapp.alegria.message": {
    it: "Ciao! Ho visto Alegria - Il Nido degli Dei e vorrei sapere di più sullo sconto per la prenotazione diretta 😊",
    en: "Hi! I saw Alegria - Il Nido degli Dei and I'd like to know more about the direct booking discount 😊",
    fr: "Bonjour ! J'ai vu Alegria - Il Nido degli Dei et j'aimerais en savoir plus sur la réduction pour réservation directe 😊",
    es: "¡Hola! Vi Alegria - Il Nido degli Dei y me gustaría saber más sobre el descuento por reserva directa 😊",
  },
  "whatsapp.casamomi.message": {
    it: "Ciao! Ho visto Casa Momi Mergellina e vorrei sapere di più sullo sconto per la prenotazione diretta 😊",
    en: "Hi! I saw Casa Momi Mergellina and I'd like to know more about the direct booking discount 😊",
    fr: "Bonjour ! J'ai vu Casa Momi Mergellina et j'aimerais en savoir plus sur la réduction pour réservation directe 😊",
    es: "¡Hola! Vi Casa Momi Mergellina y me gustaría saber más sobre el descuento por reserva directa 😊",
  },

  // Property Page Common
  "property.services": { it: "Servizi", en: "Amenities", fr: "Services", es: "Servicios" },
  "property.location": { it: "Posizione", en: "Location", fr: "Emplacement", es: "Ubicación" },
  "property.rules": { it: "Regole della Casa", en: "House Rules", fr: "Règlement Intérieur", es: "Normas de la Casa" },
  "property.checkin": { it: "Check-in", en: "Check-in", fr: "Arrivée", es: "Entrada" },
  "property.checkout": { it: "Check-out", en: "Check-out", fr: "Départ", es: "Salida" },
  "property.contact": { it: "Contattaci", en: "Contact Us", fr: "Contactez-nous", es: "Contáctanos" },
  "property.book": { it: "Prenota Ora", en: "Book Now", fr: "Réserver Maintenant", es: "Reservar Ahora" },
  "property.backHome": { it: "Dimore Mediterranee", en: "Dimore Mediterranee", fr: "Dimore Mediterranee", es: "Dimore Mediterranee" },
  "property.nearby": { it: "Nei Dintorni", en: "Nearby", fr: "À Proximité", es: "Alrededores" },
  "property.gallery": { it: "Galleria", en: "Gallery", fr: "Galerie", es: "Galería" },
  "property.overview": { it: "Panoramica", en: "Overview", fr: "Aperçu", es: "Descripción" },

  // Alegria Property Page
  "alegria.hero.subtitle": {
    it: "Agerola, Costiera Amalfitana",
    en: "Agerola, Amalfi Coast",
    fr: "Agerola, Côte Amalfitaine",
    es: "Agerola, Costa Amalfitana",
  },
  "alegria.hero.description": {
    it: "Un rifugio paradisiaco dove il cielo e il mare si fondono, un balcone privato sulla Costiera Amalfitana immerso nella tranquillità dei Monti Lattari.",
    en: "A heavenly retreat where sky and sea merge, a private balcony over the Amalfi Coast immersed in the tranquility of the Lattari Mountains.",
    fr: "Un refuge paradisiaque où le ciel et la mer se confondent, un balcon privé sur la Côte Amalfitaine immergé dans la tranquillité des Monts Lattari.",
    es: "Un refugio paradisíaco donde el cielo y el mar se funden, un balcón privado sobre la Costa Amalfitana inmerso en la tranquilidad de los Montes Lattari.",
  },
  "alegria.address": {
    it: "Via Radicosa, 80051 Agerola (San Lazzaro), Napoli",
    en: "Via Radicosa, 80051 Agerola (San Lazzaro), Naples",
    fr: "Via Radicosa, 80051 Agerola (San Lazzaro), Naples",
    es: "Via Radicosa, 80051 Agerola (San Lazzaro), Nápoles",
  },
  "alegria.overview.text": {
    it: "Alegria - Il Nido degli Dei è un B&B eco-sostenibile a conduzione familiare, situato nella tranquilla frazione di San Lazzaro ad Agerola. L'appartamento dispone di 2 camere da letto, soggiorno, cucina attrezzata e 2 bagni. Dalla terrazza panoramica si gode una vista mozzafiato sulla Costiera Amalfitana e il Golfo di Salerno.",
    en: "Alegria - Il Nido degli Dei is an eco-friendly family-run B&B, located in the peaceful San Lazzaro district of Agerola. The apartment features 2 bedrooms, a living room, an equipped kitchen, and 2 bathrooms. The panoramic terrace offers breathtaking views of the Amalfi Coast and the Gulf of Salerno.",
    fr: "Alegria - Il Nido degli Dei est un B&B éco-responsable à gestion familiale, situé dans le paisible quartier de San Lazzaro à Agerola. L'appartement dispose de 2 chambres, un séjour, une cuisine équipée et 2 salles de bain. La terrasse panoramique offre une vue imprenable sur la Côte Amalfitaine et le Golfe de Salerne.",
    es: "Alegria - Il Nido degli Dei es un B&B eco-sostenible de gestión familiar, situado en el tranquilo barrio de San Lazzaro en Agerola. El apartamento cuenta con 2 dormitorios, sala de estar, cocina equipada y 2 baños. La terraza panorámica ofrece vistas impresionantes de la Costa Amalfitana y el Golfo de Salerno.",
  },
  "alegria.service.terrace": { it: "Terrazza Panoramica", en: "Panoramic Terrace", fr: "Terrasse Panoramique", es: "Terraza Panorámica" },
  "alegria.service.terrace.desc": {
    it: "Vista mozzafiato su Amalfi e il Golfo di Salerno",
    en: "Breathtaking views of Amalfi and the Gulf of Salerno",
    fr: "Vue imprenable sur Amalfi et le Golfe de Salerne",
    es: "Vistas impresionantes de Amalfi y el Golfo de Salerno",
  },
  "alegria.service.breakfast": { it: "Colazione Bio", en: "Organic Breakfast", fr: "Petit-déjeuner Bio", es: "Desayuno Orgánico" },
  "alegria.service.breakfast.desc": {
    it: "Buffet con ingredienti biologici e locali, frutta fresca e pasticceria",
    en: "Buffet with organic and local ingredients, fresh fruit, and pastries",
    fr: "Buffet avec des ingrédients biologiques et locaux, fruits frais et pâtisseries",
    es: "Buffet con ingredientes orgánicos y locales, fruta fresca y pastelería",
  },
  "alegria.service.garden": { it: "Giardino e Orto", en: "Garden & Orchard", fr: "Jardin et Potager", es: "Jardín y Huerto" },
  "alegria.service.garden.desc": {
    it: "Ampio giardino, frutteto e orto biologico",
    en: "Large garden, fruit trees, and organic vegetable garden",
    fr: "Grand jardin, arbres fruitiers et potager biologique",
    es: "Amplio jardín, árboles frutales y huerto orgánico",
  },
  "alegria.service.solarium": { it: "Solarium", en: "Solarium", fr: "Solarium", es: "Solárium" },
  "alegria.service.solarium.desc": {
    it: "Area relax con solarium e doccia esterna",
    en: "Relaxation area with solarium and outdoor shower",
    fr: "Espace détente avec solarium et douche extérieure",
    es: "Zona de relax con solárium y ducha exterior",
  },
  "alegria.service.wifi": { it: "Wi-Fi Gratuito", en: "Free Wi-Fi", fr: "Wi-Fi Gratuit", es: "Wi-Fi Gratuito" },
  "alegria.service.wifi.desc": {
    it: "Connessione internet gratuita",
    en: "Free internet connection",
    fr: "Connexion internet gratuite",
    es: "Conexión a internet gratuita",
  },
  "alegria.service.parking": { it: "Parcheggio", en: "Free Parking", fr: "Parking Gratuit", es: "Aparcamiento Gratuito" },
  "alegria.service.parking.desc": {
    it: "Parcheggio privato gratuito in loco",
    en: "Free private on-site parking",
    fr: "Parking privé gratuit sur place",
    es: "Aparcamiento privado gratuito en el lugar",
  },
  "alegria.service.ac": { it: "Aria Condizionata", en: "Air Conditioning", fr: "Climatisation", es: "Aire Acondicionado" },
  "alegria.service.ac.desc": {
    it: "Climatizzazione in tutti gli ambienti",
    en: "Climate control in all rooms",
    fr: "Climatisation dans toutes les pièces",
    es: "Climatización en todas las habitaciones",
  },
  "alegria.service.ev": { it: "Ricarica EV", en: "EV Charging", fr: "Recharge VE", es: "Carga VE" },
  "alegria.service.ev.desc": {
    it: "Colonnina di ricarica per veicoli elettrici",
    en: "Electric vehicle charging station",
    fr: "Borne de recharge pour véhicules électriques",
    es: "Estación de carga para vehículos eléctricos",
  },
  "alegria.service.eco": { it: "Eco-Sostenibile", en: "Eco-Friendly", fr: "Éco-Responsable", es: "Eco-Sostenible" },
  "alegria.service.eco.desc": {
    it: "Energia 100% rinnovabile, pannelli solari, prodotti eco",
    en: "100% renewable energy, solar panels, eco products",
    fr: "Énergie 100% renouvelable, panneaux solaires, produits éco",
    es: "Energía 100% renovable, paneles solares, productos eco",
  },
  "alegria.nearby.sentiero": {
    it: "Sentiero degli Dei — il celebre percorso escursionistico che collega Agerola a Positano",
    en: "Path of the Gods — the famous hiking trail connecting Agerola to Positano",
    fr: "Sentier des Dieux — le célèbre sentier de randonnée reliant Agerola à Positano",
    es: "Sendero de los Dioses — la famosa ruta de senderismo que conecta Agerola con Positano",
  },
  "alegria.nearby.amalfi": {
    it: "Costiera Amalfitana — Amalfi, Positano e Ravello a breve distanza",
    en: "Amalfi Coast — Amalfi, Positano, and Ravello a short distance away",
    fr: "Côte Amalfitaine — Amalfi, Positano et Ravello à proximité",
    es: "Costa Amalfitana — Amalfi, Positano y Ravello a poca distancia",
  },
  "alegria.nearby.conca": {
    it: "Conca dei Marini — baia incantevole raggiungibile facilmente",
    en: "Conca dei Marini — enchanting bay easily reachable",
    fr: "Conca dei Marini — baie enchanteresse facilement accessible",
    es: "Conca dei Marini — bahía encantadora fácilmente accesible",
  },
  "alegria.nearby.piazza": {
    it: "Piazza di San Lazzaro — a 5 minuti a piedi",
    en: "San Lazzaro Square — 5 minutes on foot",
    fr: "Place San Lazzaro — à 5 minutes à pied",
    es: "Plaza San Lazzaro — a 5 minutos a pie",
  },
  "alegria.rules.text": {
    it: "Check-in: flessibile | Check-out: flessibile | Animali ammessi su richiesta | Ambiente non fumatori negli interni",
    en: "Check-in: flexible | Check-out: flexible | Pets on request | Non-smoking indoors",
    fr: "Arrivée : flexible | Départ : flexible | Animaux sur demande | Non-fumeur à l'intérieur",
    es: "Entrada: flexible | Salida: flexible | Mascotas bajo petición | No fumadores en interiores",
  },
  "alegria.price": { it: "A partire da €90/notte", en: "From €90/night", fr: "À partir de 90€/nuit", es: "Desde 90€/noche" },
  "alegria.rating": { it: "4.7/5 Eccellente", en: "4.7/5 Excellent", fr: "4.7/5 Excellent", es: "4.7/5 Excelente" },

  // Casa Momi Property Page
  "casamomi.hero.subtitle": {
    it: "Mergellina, Napoli",
    en: "Mergellina, Naples",
    fr: "Mergellina, Naples",
    es: "Mergellina, Nápoles",
  },
  "casamomi.hero.description": {
    it: "Centralissima e confortevole, nel cuore del quartiere di Mergellina, in stabile signorile con portiere. Il punto di partenza ideale per esplorare Napoli.",
    en: "Centrally located and comfortable, in the heart of the Mergellina district, in an elegant building with doorman. The ideal starting point to explore Naples.",
    fr: "Idéalement situé et confortable, au cœur du quartier de Mergellina, dans un immeuble élégant avec portier. Le point de départ idéal pour explorer Naples.",
    es: "Ubicación céntrica y cómoda, en el corazón del barrio de Mergellina, en un elegante edificio con portero. El punto de partida ideal para explorar Nápoles.",
  },
  "casamomi.address": {
    it: "Via Fedro 4, Int. 3, Piano 1, Scala B, 80122 Napoli",
    en: "Via Fedro 4, Int. 3, Floor 1, Staircase B, 80122 Naples",
    fr: "Via Fedro 4, Int. 3, Étage 1, Escalier B, 80122 Naples",
    es: "Via Fedro 4, Int. 3, Piso 1, Escalera B, 80122 Nápoles",
  },
  "casamomi.overview.text": {
    it: "Casa Momi Mergellina è un elegante appartamento vacanze situato nel cuore di Napoli. Dispone di 2 camere matrimoniali, un divano letto matrimoniale in soggiorno, 2 bagni con doccia e cucina completamente attrezzata. Lo stabile signorile con portiere garantisce sicurezza e comfort.",
    en: "Casa Momi Mergellina is an elegant holiday apartment located in the heart of Naples. It features 2 double bedrooms, a sofa bed in the living room, 2 bathrooms with showers, and a fully equipped kitchen. The elegant building with doorman ensures security and comfort.",
    fr: "Casa Momi Mergellina est un élégant appartement de vacances situé au cœur de Naples. Il dispose de 2 chambres doubles, un canapé-lit dans le séjour, 2 salles de bain avec douche et une cuisine entièrement équipée. L'immeuble élégant avec portier garantit sécurité et confort.",
    es: "Casa Momi Mergellina es un elegante apartamento vacacional ubicado en el corazón de Nápoles. Cuenta con 2 dormitorios dobles, un sofá cama en la sala de estar, 2 baños con ducha y una cocina totalmente equipada. El elegante edificio con portero garantiza seguridad y confort.",
  },
  "casamomi.service.wifi": { it: "Wi-Fi Gratuito", en: "Free Wi-Fi", fr: "Wi-Fi Gratuit", es: "Wi-Fi Gratuito" },
  "casamomi.service.wifi.desc": {
    it: "Connessione internet ad alta velocità",
    en: "High-speed internet connection",
    fr: "Connexion internet haut débit",
    es: "Conexión a internet de alta velocidad",
  },
  "casamomi.service.ac": { it: "Aria Condizionata", en: "Air Conditioning", fr: "Climatisation", es: "Aire Acondicionado" },
  "casamomi.service.ac.desc": {
    it: "Climatizzazione e riscaldamento in tutti gli ambienti",
    en: "Air conditioning and heating in all rooms",
    fr: "Climatisation et chauffage dans toutes les pièces",
    es: "Aire acondicionado y calefacción en todas las habitaciones",
  },
  "casamomi.service.kitchen": { it: "Cucina Attrezzata", en: "Equipped Kitchen", fr: "Cuisine Équipée", es: "Cocina Equipada" },
  "casamomi.service.kitchen.desc": {
    it: "Cucina completa con utensili, caffettiera, tostapane, frigorifero",
    en: "Full kitchen with utensils, coffee maker, toaster, fridge",
    fr: "Cuisine complète avec ustensiles, cafetière, grille-pain, réfrigérateur",
    es: "Cocina completa con utensilios, cafetera, tostadora, frigorífico",
  },
  "casamomi.service.tv": { it: "Smart TV", en: "Smart TV", fr: "Smart TV", es: "Smart TV" },
  "casamomi.service.tv.desc": {
    it: "TV a schermo piatto con canali satellitari",
    en: "Flat-screen TV with satellite channels",
    fr: "TV à écran plat avec chaînes satellitaires",
    es: "TV de pantalla plana con canales por satélite",
  },
  "casamomi.service.safe": { it: "Cassaforte", en: "Safe", fr: "Coffre-fort", es: "Caja Fuerte" },
  "casamomi.service.safe.desc": {
    it: "Cassaforte in camera per i tuoi oggetti di valore",
    en: "In-room safe for your valuables",
    fr: "Coffre-fort dans la chambre pour vos objets de valeur",
    es: "Caja fuerte en la habitación para tus objetos de valor",
  },
  "casamomi.service.elevator": { it: "Ascensore", en: "Elevator", fr: "Ascenseur", es: "Ascensor" },
  "casamomi.service.elevator.desc": {
    it: "Ascensore nello stabile",
    en: "Elevator in the building",
    fr: "Ascenseur dans l'immeuble",
    es: "Ascensor en el edificio",
  },
  "casamomi.service.security": { it: "Sicurezza 24h", en: "24h Security", fr: "Sécurité 24h", es: "Seguridad 24h" },
  "casamomi.service.security.desc": {
    it: "Portiere e sicurezza 24 ore su 24",
    en: "Doorman and 24-hour security",
    fr: "Portier et sécurité 24 heures sur 24",
    es: "Portero y seguridad las 24 horas",
  },
  "casamomi.service.parking": { it: "Parcheggio", en: "Parking", fr: "Parking", es: "Aparcamiento" },
  "casamomi.service.parking.desc": {
    it: "Parcheggio privato disponibile a pagamento",
    en: "Private parking available for a fee",
    fr: "Parking privé disponible moyennant un supplément",
    es: "Aparcamiento privado disponible con cargo adicional",
  },
  "casamomi.service.rental": { it: "Noleggio", en: "Rental Services", fr: "Location", es: "Alquiler" },
  "casamomi.service.rental.desc": {
    it: "Servizio noleggio biciclette e auto",
    en: "Bicycle and car rental service",
    fr: "Service de location de vélos et voitures",
    es: "Servicio de alquiler de bicicletas y coches",
  },
  "casamomi.nearby.mergellina": {
    it: "Stazione Mergellina — a soli 250 metri, metro e treni per tutta la città",
    en: "Mergellina Station — just 250 meters away, metro and trains across the city",
    fr: "Gare de Mergellina — à seulement 250 mètres, métro et trains pour toute la ville",
    es: "Estación Mergellina — a solo 250 metros, metro y trenes por toda la ciudad",
  },
  "casamomi.nearby.lungomare": {
    it: "Lungomare Caracciolo — a 350 metri, la passeggiata più bella di Napoli",
    en: "Lungomare Caracciolo — 350 meters away, Naples' most beautiful promenade",
    fr: "Lungomare Caracciolo — à 350 mètres, la plus belle promenade de Naples",
    es: "Lungomare Caracciolo — a 350 metros, el paseo más hermoso de Nápoles",
  },
  "casamomi.nearby.castel": {
    it: "Castel dell'Ovo — 2.5 km, l'iconico castello sul mare",
    en: "Castel dell'Ovo — 2.5 km, the iconic seaside castle",
    fr: "Castel dell'Ovo — 2,5 km, l'iconique château en bord de mer",
    es: "Castel dell'Ovo — 2,5 km, el icónico castillo junto al mar",
  },
  "casamomi.nearby.plebiscito": {
    it: "Piazza del Plebiscito — 2.5 km, il cuore monumentale di Napoli",
    en: "Piazza del Plebiscito — 2.5 km, Naples' monumental heart",
    fr: "Piazza del Plebiscito — 2,5 km, le cœur monumental de Naples",
    es: "Piazza del Plebiscito — 2,5 km, el corazón monumental de Nápoles",
  },
  "casamomi.nearby.museo": {
    it: "Museo Archeologico Nazionale — 3.5 km, tesori dell'antichità",
    en: "National Archaeological Museum — 3.5 km, treasures of antiquity",
    fr: "Musée Archéologique National — 3,5 km, trésors de l'antiquité",
    es: "Museo Arqueológico Nacional — 3,5 km, tesoros de la antigüedad",
  },
  "casamomi.rules.checkin": { it: "17:00 – 18:00", en: "5:00 PM – 6:00 PM", fr: "17h00 – 18h00", es: "17:00 – 18:00" },
  "casamomi.rules.checkout": { it: "08:00 – 11:00", en: "8:00 AM – 11:00 AM", fr: "08h00 – 11h00", es: "08:00 – 11:00" },
  "casamomi.rules.nosmoking": { it: "Vietato fumare", en: "No smoking", fr: "Non-fumeur", es: "Prohibido fumar" },
  "casamomi.rules.nopets": { it: "Animali non ammessi", en: "No pets", fr: "Animaux non admis", es: "No se admiten mascotas" },
  "casamomi.rules.noparty": { it: "Non sono ammesse feste", en: "No parties", fr: "Fêtes non autorisées", es: "No se permiten fiestas" },
  "casamomi.rules.age": { it: "Età minima check-in: 18 anni", en: "Minimum check-in age: 18", fr: "Âge minimum pour l'arrivée : 18 ans", es: "Edad mínima de entrada: 18 años" },
  "casamomi.price": { it: "A partire da €140/notte", en: "From €140/night", fr: "À partir de 140€/nuit", es: "Desde 140€/noche" },
  "casamomi.rating": { it: "9.2/10 Eccellente", en: "9.2/10 Excellent", fr: "9.2/10 Excellent", es: "9.2/10 Excelente" },

  // Admin Login (IT/EN only)
  "admin.login.title": { it: "Area Riservata", en: "Restricted Area" },
  "admin.login.subtitle": { it: "Accedi per gestire le prenotazioni", en: "Sign in to manage bookings" },
  "admin.login.password": { it: "Password", en: "Password" },
  "admin.login.submit": { it: "Accedi", en: "Sign In" },
  "admin.login.error": { it: "Credenziali non valide", en: "Invalid credentials" },
  "admin.logout": { it: "Esci", en: "Log Out" },

  // Admin Rooms (IT/EN only)
  "admin.room.gold": { it: "Stanza Gold", en: "Gold Room" },
  "admin.room.silver": { it: "Stanza Silver", en: "Silver Room" },
  "admin.room.whole": { it: "Tutta la Casa", en: "Whole House" },

  // Admin (IT/EN only)
  "admin.title": { it: "Gestione Prenotazioni", en: "Booking Management" },
  "admin.calendar": { it: "Calendario", en: "Calendar" },
  "admin.bookings": { it: "Prenotazioni", en: "Bookings" },
  "admin.upcoming": { it: "Prossime Prenotazioni", en: "Upcoming Bookings" },
  "admin.add": { it: "Nuova Prenotazione", en: "New Booking" },
  "admin.guest": { it: "Nome Ospite", en: "Guest Name" },
  "admin.checkin": { it: "Check-in", en: "Check-in" },
  "admin.checkout": { it: "Check-out", en: "Check-out" },
  "admin.checkinTime": { it: "Orario Check-in", en: "Check-in Time" },
  "admin.checkoutTime": { it: "Orario Check-out", en: "Check-out Time" },
  "admin.parkingSpot": { it: "Posto Auto", en: "Parking Spot" },
  "admin.amount": { it: "Importo (€)", en: "Amount (€)" },
  "admin.amountDue": { it: "Da Pagare (€)", en: "Amount Due (€)" },
  "admin.touristTax": { it: "Tassa di Soggiorno", en: "Tourist Tax" },
  "admin.notes": { it: "Note", en: "Notes" },
  "admin.save": { it: "Salva", en: "Save" },
  "admin.cancel": { it: "Annulla", en: "Cancel" },
  "admin.delete": { it: "Elimina", en: "Delete" },
  "admin.edit": { it: "Modifica Prenotazione", en: "Edit Booking" },
  "admin.source": { it: "Fonte", en: "Source" },
  "admin.room": { it: "Stanza", en: "Room" },
  "admin.noBookings": {
    it: "Nessuna prenotazione in programma",
    en: "No upcoming bookings",
  },

  // Calendar Legend (IT/EN only)
  "legend.available": { it: "Disponibile", en: "Available" },
  "legend.booked": { it: "Prenotato", en: "Booked" },
  "legend.transition": { it: "Check-in/out", en: "Check-in/out" },
  "legend.partiallyBooked": { it: "Stanza occupata", en: "Room occupied" },

  // Public Booking System
  "booking.title": {
    it: "Prenota il Tuo Soggiorno",
    en: "Book Your Stay",
    fr: "Réservez Votre Séjour",
    es: "Reserva Tu Estancia",
  },
  "booking.subtitle": {
    it: "Seleziona le date sul calendario e compila il modulo. Ti risponderemo entro 24 ore.",
    en: "Select your dates on the calendar and fill out the form. We'll respond within 24 hours.",
    fr: "Sélectionnez vos dates sur le calendrier et remplissez le formulaire. Nous vous répondrons sous 24 heures.",
    es: "Selecciona tus fechas en el calendario y completa el formulario. Te responderemos en 24 horas.",
  },
  "booking.selected": { it: "Selezionato", en: "Selected", fr: "Sélectionné", es: "Seleccionado" },
  "booking.yourStay": { it: "Il tuo soggiorno", en: "Your stay", fr: "Votre séjour", es: "Tu estancia" },
  "booking.unavailable": { it: "Non disponibile", en: "Unavailable", fr: "Indisponible", es: "No disponible" },
  "booking.selectDatesPrompt": {
    it: "Seleziona le date di check-in e check-out dal calendario per procedere con la prenotazione.",
    en: "Select your check-in and check-out dates from the calendar to proceed with the booking.",
    fr: "Sélectionnez vos dates d'arrivée et de départ sur le calendrier pour procéder à la réservation.",
    es: "Selecciona las fechas de entrada y salida en el calendario para proceder con la reserva.",
  },
  "booking.checkin": { it: "Check-in", en: "Check-in", fr: "Arrivée", es: "Entrada" },
  "booking.checkout": { it: "Check-out", en: "Check-out", fr: "Départ", es: "Salida" },
  "booking.editDates": { it: "Modifica", en: "Change", fr: "Modifier", es: "Cambiar" },
  "booking.night": { it: "notte", en: "night", fr: "nuit", es: "noche" },
  "booking.nights": { it: "notti", en: "nights", fr: "nuits", es: "noches" },
  "booking.perNight": { it: "notte", en: "night", fr: "nuit", es: "noche" },
  "booking.guestName": { it: "Nome e Cognome", en: "Full Name", fr: "Nom Complet", es: "Nombre Completo" },
  "booking.guestNamePlaceholder": { it: "Mario Rossi", en: "John Smith", fr: "Jean Dupont", es: "Juan García" },
  "booking.email": { it: "Email", en: "Email", fr: "Email", es: "Email" },
  "booking.emailPlaceholder": { it: "mario@email.com", en: "john@email.com", fr: "jean@email.com", es: "juan@email.com" },
  "booking.phone": { it: "Telefono", en: "Phone", fr: "Téléphone", es: "Teléfono" },
  "booking.phonePlaceholder": { it: "+39 338 1234567", en: "+39 338 1234567", fr: "+33 6 12 34 56 78", es: "+34 612 345 678" },
  "booking.guests": { it: "Numero Ospiti", en: "Number of Guests", fr: "Nombre d'Hôtes", es: "Número de Huéspedes" },
  "booking.notes": { it: "Note o Richieste", en: "Notes or Requests", fr: "Notes ou Demandes", es: "Notas o Solicitudes" },
  "booking.notesPlaceholder": {
    it: "Orario di arrivo preferito, richieste speciali...",
    en: "Preferred arrival time, special requests...",
    fr: "Heure d'arrivée souhaitée, demandes spéciales...",
    es: "Hora de llegada preferida, solicitudes especiales...",
  },
  "booking.submit": {
    it: "Richiedi Prenotazione",
    en: "Request Booking",
    fr: "Demander la Réservation",
    es: "Solicitar Reserva",
  },
  "booking.submitting": {
    it: "Invio in corso...",
    en: "Sending...",
    fr: "Envoi en cours...",
    es: "Enviando...",
  },
  "booking.disclaimer": {
    it: "La prenotazione non è ancora confermata. Ti contatteremo per la conferma definitiva.",
    en: "This is a booking request, not a confirmed reservation. We'll contact you to confirm.",
    fr: "Ceci est une demande de réservation, pas une confirmation. Nous vous contacterons pour confirmer.",
    es: "Esta es una solicitud de reserva, no una confirmación. Te contactaremos para confirmar.",
  },
  "booking.orContact": {
    it: "Oppure contattaci direttamente",
    en: "Or contact us directly",
    fr: "Ou contactez-nous directement",
    es: "O contáctanos directamente",
  },
  "booking.success.title": {
    it: "Richiesta Inviata!",
    en: "Request Sent!",
    fr: "Demande Envoyée !",
    es: "¡Solicitud Enviada!",
  },
  "booking.success.message": {
    it: "Grazie! Abbiamo ricevuto la tua richiesta di prenotazione. Ti risponderemo entro 24 ore via email o telefono.",
    en: "Thank you! We've received your booking request. We'll get back to you within 24 hours via email or phone.",
    fr: "Merci ! Nous avons reçu votre demande de réservation. Nous vous répondrons sous 24 heures par email ou téléphone.",
    es: "¡Gracias! Hemos recibido tu solicitud de reserva. Te responderemos en 24 horas por email o teléfono.",
  },
  "booking.success.newRequest": {
    it: "Nuova Richiesta",
    en: "New Request",
    fr: "Nouvelle Demande",
    es: "Nueva Solicitud",
  },

  // Admin Booking Requests
  "admin.requests": { it: "Richieste", en: "Requests" },
  "admin.requests.title": { it: "Richieste di Prenotazione", en: "Booking Requests" },
  "admin.requests.pending": { it: "In Attesa", en: "Pending" },
  "admin.requests.confirmed": { it: "Confermata", en: "Confirmed" },
  "admin.requests.rejected": { it: "Rifiutata", en: "Rejected" },
  "admin.requests.confirm": { it: "Conferma", en: "Confirm" },
  "admin.requests.reject": { it: "Rifiuta", en: "Reject" },
  "admin.requests.noRequests": { it: "Nessuna richiesta in attesa", en: "No pending requests" },
  "admin.requests.guests": { it: "Ospiti", en: "Guests" },
  "admin.requests.totalPrice": { it: "Prezzo Totale", en: "Total Price" },

  // Admin Pricing
  "admin.pricing": { it: "Prezzi", en: "Pricing" },
  "admin.pricing.title": { it: "Gestione Prezzi", en: "Pricing Management" },
  "admin.pricing.season": { it: "Stagione", en: "Season" },
  "admin.pricing.startDate": { it: "Data Inizio", en: "Start Date" },
  "admin.pricing.endDate": { it: "Data Fine", en: "End Date" },
  "admin.pricing.pricePerNight": { it: "Prezzo/Notte (€)", en: "Price/Night (€)" },
  "admin.pricing.minNights": { it: "Notti Minime", en: "Min Nights" },
  "admin.pricing.add": { it: "Aggiungi Tariffa", en: "Add Rate" },
  "admin.pricing.noPricing": { it: "Nessuna tariffa configurata", en: "No rates configured" },

  // Days of week (IT/EN only)
  "day.mon": { it: "Lun", en: "Mon" },
  "day.tue": { it: "Mar", en: "Tue" },
  "day.wed": { it: "Mer", en: "Wed" },
  "day.thu": { it: "Gio", en: "Thu" },
  "day.fri": { it: "Ven", en: "Fri" },
  "day.sat": { it: "Sab", en: "Sat" },
  "day.sun": { it: "Dom", en: "Sun" },

  // Months (IT/EN only)
  "month.january": { it: "Gennaio", en: "January" },
  "month.february": { it: "Febbraio", en: "February" },
  "month.march": { it: "Marzo", en: "March" },
  "month.april": { it: "Aprile", en: "April" },
  "month.may": { it: "Maggio", en: "May" },
  "month.june": { it: "Giugno", en: "June" },
  "month.july": { it: "Luglio", en: "July" },
  "month.august": { it: "Agosto", en: "August" },
  "month.september": { it: "Settembre", en: "September" },
  "month.october": { it: "Ottobre", en: "October" },
  "month.november": { it: "Novembre", en: "November" },
  "month.december": { it: "Dicembre", en: "December" },
};

// Language cycle for the public site (admin stays IT/EN only)
export const publicLanguages: Language[] = ["it", "en", "fr", "es"];
export const publicLanguageLabels: Record<Language, string> = {
  it: "IT",
  en: "EN",
  fr: "FR",
  es: "ES",
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("it");

  const t = useCallback(
    (key: string): string => {
      const translation = translations[key];
      if (!translation) return key;
      return translation[language] ?? translation["en"] ?? translation["it"];
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
