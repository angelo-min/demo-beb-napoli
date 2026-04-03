"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type Language = "it" | "en";

interface Translations {
  [key: string]: {
    it: string;
    en: string;
  };
}

export const translations: Translations = {
  // Navigation & Common
  "nav.admin": { it: "Amministrazione", en: "Admin" },
  "nav.home": { it: "Home", en: "Home" },
  "lang.switch": { it: "EN", en: "IT" },

  // Hero Section
  "hero.tagline": {
    it: "Dimore Mediterranee",
    en: "Dimore Mediterranee",
  },
  "hero.subtitle": {
    it: "Ospitalità Autentica nel Sud Italia",
    en: "Authentic Southern Italian Hospitality",
  },
  "hero.description": {
    it: "Scopri il calore della Campania attraverso le nostre dimore d'eccezione. Comfort raffinato, autenticità e la magia del Sud Italia ti aspettano.",
    en: "Discover the warmth of Campania through our exceptional accommodations. Refined comfort, authenticity, and the magic of Southern Italy await you.",
  },

  // Properties Section
  "properties.title": { it: "Le Nostre Dimore", en: "Our Properties" },
  "properties.cta": { it: "Scopri", en: "Discover" },

  // Alegria Property
  "alegria.name": { it: "Alegria — Nido degli Dei", en: "Alegria — Nido degli Dei" },
  "alegria.location": { it: "Agerola, Monti Lattari", en: "Agerola, Lattari Mountains" },
  "alegria.description": {
    it: "Sospesa tra cielo e mare, Alegria offre una fuga romantica sui Monti Lattari. Vista mozzafiato sulla Costiera Amalfitana, colazioni genuine e la quiete della natura.",
    en: "Suspended between sky and sea, Alegria offers a romantic escape in the Lattari Mountains. Breathtaking views of the Amalfi Coast, genuine breakfasts, and the tranquility of nature.",
  },

  // Casa Momi Property
  "casamomi.name": { it: "Casa Momi Mergellina", en: "Casa Momi Mergellina" },
  "casamomi.location": { it: "Napoli", en: "Naples" },
  "casamomi.description": {
    it: "Nel cuore pulsante di Napoli, Casa Momi è il punto di partenza ideale per esplorare la città. Eleganza contemporanea, posizione privilegiata sul lungomare di Mergellina.",
    en: "In the vibrant heart of Naples, Casa Momi is the ideal starting point to explore the city. Contemporary elegance with a privileged position on Mergellina's waterfront.",
  },

  // Why Choose Us
  "why.title": { it: "Perché Sceglierci", en: "Why Choose Us" },
  "why.direct.title": { it: "Prenotazione Diretta", en: "Book Direct" },
  "why.direct.desc": {
    it: "Prenota direttamente con noi e risparmia. Nessun intermediario, solo il miglior prezzo garantito.",
    en: "Book directly with us and save. No middlemen, just the best price guaranteed.",
  },
  "why.family.title": { it: "Gestione Familiare", en: "Family Run" },
  "why.family.desc": {
    it: "Accoglienza calorosa e attenzione personale. Vi trattiamo come ospiti di casa, non come numeri.",
    en: "Warm welcome and personal attention. We treat you as family guests, not numbers.",
  },
  "why.location.title": { it: "Posizioni Uniche", en: "Unique Locations" },
  "why.location.desc": {
    it: "Dalla Costiera Amalfitana al cuore di Napoli — le nostre dimore sono in posizioni privilegiate.",
    en: "From the Amalfi Coast to the heart of Naples — our properties are in prime locations.",
  },
  "why.eco.title": { it: "Eco-Sostenibile", en: "Eco-Friendly" },
  "why.eco.desc": {
    it: "Energia rinnovabile, prodotti biologici e pratiche sostenibili per un turismo responsabile.",
    en: "Renewable energy, organic products, and sustainable practices for responsible tourism.",
  },

  // Home CTA
  "home.cta.title": { it: "Prenota la Tua Esperienza", en: "Book Your Experience" },
  "home.cta.desc": {
    it: "Contattaci direttamente per le migliori tariffe e un'accoglienza su misura.",
    en: "Contact us directly for the best rates and a tailored welcome.",
  },

  // Footer
  "footer.brand": { it: "Dimore Mediterranee", en: "Dimore Mediterranee" },
  "footer.tagline": {
    it: "Ospitalità autentica nel Sud Italia",
    en: "Authentic hospitality in Southern Italy",
  },
  "footer.contact": { it: "Contatti", en: "Contact" },
  "footer.follow": { it: "Seguici", en: "Follow Us" },
  "footer.rights": {
    it: "Tutti i diritti riservati",
    en: "All rights reserved",
  },

  // WhatsApp Discount
  "whatsapp.cta": { it: "Sconto Diretto", en: "Direct Discount" },
  "whatsapp.label": {
    it: "Scrivici su WhatsApp per uno sconto esclusivo!",
    en: "Message us on WhatsApp for an exclusive discount!",
  },
  "whatsapp.badge": { it: "Risparmia prenotando direttamente", en: "Save by booking directly" },
  "phone.cta": { it: "Chiamaci", en: "Call Us" },
  "whatsapp.alegria.message": {
    it: "Ciao! Ho visto Alegria - Il Nido degli Dei e vorrei sapere di più sullo sconto per la prenotazione diretta 😊",
    en: "Hi! I saw Alegria - Il Nido degli Dei and I'd like to know more about the direct booking discount 😊",
  },
  "whatsapp.casamomi.message": {
    it: "Ciao! Ho visto Casa Momi Mergellina e vorrei sapere di più sullo sconto per la prenotazione diretta 😊",
    en: "Hi! I saw Casa Momi Mergellina and I'd like to know more about the direct booking discount 😊",
  },

  // Property Page Common
  "property.services": { it: "Servizi", en: "Amenities" },
  "property.location": { it: "Posizione", en: "Location" },
  "property.rules": { it: "Regole della Casa", en: "House Rules" },
  "property.checkin": { it: "Check-in", en: "Check-in" },
  "property.checkout": { it: "Check-out", en: "Check-out" },
  "property.contact": { it: "Contattaci", en: "Contact Us" },
  "property.book": { it: "Prenota Ora", en: "Book Now" },
  "property.backHome": { it: "Dimore Mediterranee", en: "Dimore Mediterranee" },
  "property.nearby": { it: "Nei Dintorni", en: "Nearby" },
  "property.gallery": { it: "Galleria", en: "Gallery" },
  "property.overview": { it: "Panoramica", en: "Overview" },

  // Alegria Property Page
  "alegria.hero.subtitle": {
    it: "Agerola, Costiera Amalfitana",
    en: "Agerola, Amalfi Coast",
  },
  "alegria.hero.description": {
    it: "Un rifugio paradisiaco dove il cielo e il mare si fondono, un balcone privato sulla Costiera Amalfitana immerso nella tranquillità dei Monti Lattari.",
    en: "A heavenly retreat where sky and sea merge, a private balcony over the Amalfi Coast immersed in the tranquility of the Lattari Mountains.",
  },
  "alegria.address": {
    it: "Via Radicosa, 80051 Agerola (San Lazzaro), Napoli",
    en: "Via Radicosa, 80051 Agerola (San Lazzaro), Naples",
  },
  "alegria.overview.text": {
    it: "Alegria - Il Nido degli Dei è un B&B eco-sostenibile a conduzione familiare, situato nella tranquilla frazione di San Lazzaro ad Agerola. L'appartamento dispone di 2 camere da letto, soggiorno, cucina attrezzata e 2 bagni. Dalla terrazza panoramica si gode una vista mozzafiato sulla Costiera Amalfitana e il Golfo di Salerno.",
    en: "Alegria - Il Nido degli Dei is an eco-friendly family-run B&B, located in the peaceful San Lazzaro district of Agerola. The apartment features 2 bedrooms, a living room, an equipped kitchen, and 2 bathrooms. The panoramic terrace offers breathtaking views of the Amalfi Coast and the Gulf of Salerno.",
  },
  "alegria.service.terrace": { it: "Terrazza Panoramica", en: "Panoramic Terrace" },
  "alegria.service.terrace.desc": {
    it: "Vista mozzafiato su Amalfi e il Golfo di Salerno",
    en: "Breathtaking views of Amalfi and the Gulf of Salerno",
  },
  "alegria.service.breakfast": { it: "Colazione Bio", en: "Organic Breakfast" },
  "alegria.service.breakfast.desc": {
    it: "Buffet con ingredienti biologici e locali, frutta fresca e pasticceria",
    en: "Buffet with organic and local ingredients, fresh fruit, and pastries",
  },
  "alegria.service.garden": { it: "Giardino e Orto", en: "Garden & Orchard" },
  "alegria.service.garden.desc": {
    it: "Ampio giardino, frutteto e orto biologico",
    en: "Large garden, fruit trees, and organic vegetable garden",
  },
  "alegria.service.solarium": { it: "Solarium", en: "Solarium" },
  "alegria.service.solarium.desc": {
    it: "Area relax con solarium e doccia esterna",
    en: "Relaxation area with solarium and outdoor shower",
  },
  "alegria.service.wifi": { it: "Wi-Fi Gratuito", en: "Free Wi-Fi" },
  "alegria.service.wifi.desc": {
    it: "Connessione internet gratuita",
    en: "Free internet connection",
  },
  "alegria.service.parking": { it: "Parcheggio", en: "Free Parking" },
  "alegria.service.parking.desc": {
    it: "Parcheggio privato gratuito in loco",
    en: "Free private on-site parking",
  },
  "alegria.service.ac": { it: "Aria Condizionata", en: "Air Conditioning" },
  "alegria.service.ac.desc": {
    it: "Climatizzazione in tutti gli ambienti",
    en: "Climate control in all rooms",
  },
  "alegria.service.ev": { it: "Ricarica EV", en: "EV Charging" },
  "alegria.service.ev.desc": {
    it: "Colonnina di ricarica per veicoli elettrici",
    en: "Electric vehicle charging station",
  },
  "alegria.service.eco": { it: "Eco-Sostenibile", en: "Eco-Friendly" },
  "alegria.service.eco.desc": {
    it: "Energia 100% rinnovabile, pannelli solari, prodotti eco",
    en: "100% renewable energy, solar panels, eco products",
  },
  "alegria.nearby.sentiero": {
    it: "Sentiero degli Dei — il celebre percorso escursionistico che collega Agerola a Positano",
    en: "Path of the Gods — the famous hiking trail connecting Agerola to Positano",
  },
  "alegria.nearby.amalfi": {
    it: "Costiera Amalfitana — Amalfi, Positano e Ravello a breve distanza",
    en: "Amalfi Coast — Amalfi, Positano, and Ravello a short distance away",
  },
  "alegria.nearby.conca": {
    it: "Conca dei Marini — baia incantevole raggiungibile facilmente",
    en: "Conca dei Marini — enchanting bay easily reachable",
  },
  "alegria.nearby.piazza": {
    it: "Piazza di San Lazzaro — a 5 minuti a piedi",
    en: "San Lazzaro Square — 5 minutes on foot",
  },
  "alegria.rules.text": {
    it: "Check-in: flessibile | Check-out: flessibile | Animali ammessi su richiesta | Ambiente non fumatori negli interni",
    en: "Check-in: flexible | Check-out: flexible | Pets on request | Non-smoking indoors",
  },
  "alegria.price": { it: "A partire da €90/notte", en: "From €90/night" },
  "alegria.rating": { it: "4.7/5 Eccellente", en: "4.7/5 Excellent" },

  // Casa Momi Property Page
  "casamomi.hero.subtitle": {
    it: "Mergellina, Napoli",
    en: "Mergellina, Naples",
  },
  "casamomi.hero.description": {
    it: "Centralissima e confortevole, nel cuore del quartiere di Mergellina, in stabile signorile con portiere. Il punto di partenza ideale per esplorare Napoli.",
    en: "Centrally located and comfortable, in the heart of the Mergellina district, in an elegant building with doorman. The ideal starting point to explore Naples.",
  },
  "casamomi.address": {
    it: "Via Fedro 4, Int. 3, Piano 1, Scala B, 80122 Napoli",
    en: "Via Fedro 4, Int. 3, Floor 1, Staircase B, 80122 Naples",
  },
  "casamomi.overview.text": {
    it: "Casa Momi Mergellina è un elegante appartamento vacanze situato nel cuore di Napoli. Dispone di 2 camere matrimoniali, un divano letto matrimoniale in soggiorno, 2 bagni con doccia e cucina completamente attrezzata. Lo stabile signorile con portiere garantisce sicurezza e comfort.",
    en: "Casa Momi Mergellina is an elegant holiday apartment located in the heart of Naples. It features 2 double bedrooms, a sofa bed in the living room, 2 bathrooms with showers, and a fully equipped kitchen. The elegant building with doorman ensures security and comfort.",
  },
  "casamomi.service.wifi": { it: "Wi-Fi Gratuito", en: "Free Wi-Fi" },
  "casamomi.service.wifi.desc": {
    it: "Connessione internet ad alta velocità",
    en: "High-speed internet connection",
  },
  "casamomi.service.ac": { it: "Aria Condizionata", en: "Air Conditioning" },
  "casamomi.service.ac.desc": {
    it: "Climatizzazione e riscaldamento in tutti gli ambienti",
    en: "Air conditioning and heating in all rooms",
  },
  "casamomi.service.kitchen": { it: "Cucina Attrezzata", en: "Equipped Kitchen" },
  "casamomi.service.kitchen.desc": {
    it: "Cucina completa con utensili, caffettiera, tostapane, frigorifero",
    en: "Full kitchen with utensils, coffee maker, toaster, fridge",
  },
  "casamomi.service.tv": { it: "Smart TV", en: "Smart TV" },
  "casamomi.service.tv.desc": {
    it: "TV a schermo piatto con canali satellitari",
    en: "Flat-screen TV with satellite channels",
  },
  "casamomi.service.safe": { it: "Cassaforte", en: "Safe" },
  "casamomi.service.safe.desc": {
    it: "Cassaforte in camera per i tuoi oggetti di valore",
    en: "In-room safe for your valuables",
  },
  "casamomi.service.elevator": { it: "Ascensore", en: "Elevator" },
  "casamomi.service.elevator.desc": {
    it: "Ascensore nello stabile",
    en: "Elevator in the building",
  },
  "casamomi.service.security": { it: "Sicurezza 24h", en: "24h Security" },
  "casamomi.service.security.desc": {
    it: "Portiere e sicurezza 24 ore su 24",
    en: "Doorman and 24-hour security",
  },
  "casamomi.service.parking": { it: "Parcheggio", en: "Parking" },
  "casamomi.service.parking.desc": {
    it: "Parcheggio privato disponibile a pagamento",
    en: "Private parking available for a fee",
  },
  "casamomi.service.rental": { it: "Noleggio", en: "Rental Services" },
  "casamomi.service.rental.desc": {
    it: "Servizio noleggio biciclette e auto",
    en: "Bicycle and car rental service",
  },
  "casamomi.nearby.mergellina": {
    it: "Stazione Mergellina — a soli 250 metri, metro e treni per tutta la città",
    en: "Mergellina Station — just 250 meters away, metro and trains across the city",
  },
  "casamomi.nearby.lungomare": {
    it: "Lungomare Caracciolo — a 350 metri, la passeggiata più bella di Napoli",
    en: "Lungomare Caracciolo — 350 meters away, Naples' most beautiful promenade",
  },
  "casamomi.nearby.castel": {
    it: "Castel dell'Ovo — 2.5 km, l'iconico castello sul mare",
    en: "Castel dell'Ovo — 2.5 km, the iconic seaside castle",
  },
  "casamomi.nearby.plebiscito": {
    it: "Piazza del Plebiscito — 2.5 km, il cuore monumentale di Napoli",
    en: "Piazza del Plebiscito — 2.5 km, Naples' monumental heart",
  },
  "casamomi.nearby.museo": {
    it: "Museo Archeologico Nazionale — 3.5 km, tesori dell'antichità",
    en: "National Archaeological Museum — 3.5 km, treasures of antiquity",
  },
  "casamomi.rules.checkin": { it: "17:00 – 18:00", en: "5:00 PM – 6:00 PM" },
  "casamomi.rules.checkout": { it: "08:00 – 11:00", en: "8:00 AM – 11:00 AM" },
  "casamomi.rules.nosmoking": { it: "Vietato fumare", en: "No smoking" },
  "casamomi.rules.nopets": { it: "Animali non ammessi", en: "No pets" },
  "casamomi.rules.noparty": { it: "Non sono ammesse feste", en: "No parties" },
  "casamomi.rules.age": { it: "Età minima check-in: 18 anni", en: "Minimum check-in age: 18" },
  "casamomi.price": { it: "A partire da €140/notte", en: "From €140/night" },
  "casamomi.rating": { it: "9.2/10 Eccellente", en: "9.2/10 Excellent" },

  // Admin Login
  "admin.login.title": { it: "Area Riservata", en: "Restricted Area" },
  "admin.login.subtitle": { it: "Accedi per gestire le prenotazioni", en: "Sign in to manage bookings" },
  "admin.login.password": { it: "Password", en: "Password" },
  "admin.login.submit": { it: "Accedi", en: "Sign In" },
  "admin.login.error": { it: "Credenziali non valide", en: "Invalid credentials" },
  "admin.logout": { it: "Esci", en: "Log Out" },

  // Admin Rooms
  "admin.room.gold": { it: "Stanza Gold", en: "Gold Room" },
  "admin.room.silver": { it: "Stanza Silver", en: "Silver Room" },

  // Admin
  "admin.title": { it: "Gestione Prenotazioni", en: "Booking Management" },
  "admin.calendar": { it: "Calendario", en: "Calendar" },
  "admin.bookings": { it: "Prenotazioni", en: "Bookings" },
  "admin.upcoming": { it: "Prossime Prenotazioni", en: "Upcoming Bookings" },
  "admin.add": { it: "Nuova Prenotazione", en: "New Booking" },
  "admin.guest": { it: "Nome Ospite", en: "Guest Name" },
  "admin.checkin": { it: "Check-in", en: "Check-in" },
  "admin.checkout": { it: "Check-out", en: "Check-out" },
  "admin.notes": { it: "Note", en: "Notes" },
  "admin.save": { it: "Salva", en: "Save" },
  "admin.cancel": { it: "Annulla", en: "Cancel" },
  "admin.delete": { it: "Elimina", en: "Delete" },
  "admin.noBookings": {
    it: "Nessuna prenotazione in programma",
    en: "No upcoming bookings",
  },

  // Calendar Legend
  "legend.available": { it: "Disponibile", en: "Available" },
  "legend.booked": { it: "Prenotato", en: "Booked" },
  "legend.transition": { it: "Check-in/out", en: "Check-in/out" },

  // Days of week
  "day.mon": { it: "Lun", en: "Mon" },
  "day.tue": { it: "Mar", en: "Tue" },
  "day.wed": { it: "Mer", en: "Wed" },
  "day.thu": { it: "Gio", en: "Thu" },
  "day.fri": { it: "Ven", en: "Fri" },
  "day.sat": { it: "Sab", en: "Sat" },
  "day.sun": { it: "Dom", en: "Sun" },

  // Months
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
      return translation[language];
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
