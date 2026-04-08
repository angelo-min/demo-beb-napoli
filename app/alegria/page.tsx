"use client";

import { LanguageProvider } from "@/lib/i18n";
import { PropertyPage } from "@/components/property-page";

const alegriaConfig = {
  id: "alegria",
  nameKey: "alegria.name",
  heroSubtitleKey: "alegria.hero.subtitle",
  heroDescriptionKey: "alegria.hero.description",
  addressKey: "alegria.address",
  overviewKey: "alegria.overview.text",
  priceKey: "alegria.price",
  ratingKey: "alegria.rating",
  bookingUrl: "https://www.booking.com/hotel/it/alegria-il-nido-degli-dei.it.html",
  airbnbUrl: "https://www.airbnb.it/rooms/1208058051469492815",
  heroImages: [
    "/alessio-bachetti-Kgv2UxpU3cM-unsplash.jpg",
    "/sebastian-leonhardt-PkWac9CLWVA-unsplash.jpg",
  ],
  photos: [
    "/alegria/DF5F6208-A82B-41B3-A860-5EE0DAC8DB53.JPG",
    "/alegria/049031C9-C0B7-4499-8196-9EE80FC2F19B.JPG",
    "/alegria/A14BD198-F750-4A7C-ABFD-02DBB65E5019.JPG",
    "/alegria/5BF8140E-431D-4E8F-96F9-5B663C40A522.JPG",
    "/alegria/BD265C46-D4F7-4C8D-9169-32272DDCD2D2.JPG",
    "/alegria/E37A8B8C-84D8-4357-A798-B785D1E24AF4.JPG",
    "/alegria/5F710EA7-40E2-4783-A0EC-979EF64E1C4C.JPG",
    "/alegria/75D852D4-F3ED-47E8-AC28-EF9D7E4BABF4.JPG",
    "/alegria/353E72DD-45D1-4200-813A-807B58B3C564.JPG",
    "/alegria/CB406B6A-98ED-4D12-9C51-A1BDEC4BA62C.JPG",
    "/alegria/06B3A47C-83F1-4BE6-A3D7-0ABE0FD337A0.JPG",
    "/alegria/0D0399C2-6EBB-419D-8A9F-D557CF731284.JPG",
    "/alegria/0D847BFA-8851-486D-96B7-E1E597AD023F.JPG",
    "/alegria/2634CC9D-24B2-4702-B936-261A1D0AA4E5.JPG",
    "/alegria/26FD54B3-C15A-437E-ABA4-F44612672D27.JPG",
    "/alegria/31AD8A73-37B8-4B64-8A24-3D260327D189_4_5005_c.jpeg",
    "/alegria/341BEF40-50D8-467E-84DE-EB2CF02E3A95_4_5005_c.jpeg",
    "/alegria/36BDB849-704C-4803-8212-752819869E3D.JPG",
    "/alegria/3C7596B1-4FFA-4028-930B-107970288F74.JPG",
    "/alegria/57380F2C-A553-4059-82FA-DCFC85036F45.JPG",
    "/alegria/5BDFBC09-2233-4567-B3A7-770770FB2804.JPG",
    "/alegria/64EA4B68-BC2F-4CF7-B612-8390155CDE6C.JPG",
    "/alegria/65961DE8-0956-4D79-884C-12991139D3A8.JPG",
    "/alegria/6933B6DC-05FF-4930-A7CF-971B65BC7092_4_5005_c.jpeg",
    "/alegria/6E1CDF2A-F6DF-49C0-86F4-15D8E786966C_4_5005_c.jpeg",
    "/alegria/70B784DA-D30D-403F-AC45-B456A128C8F0.JPG",
    "/alegria/74CC0B06-D0B7-4920-B6AB-AEA7CE5EE764.JPG",
    "/alegria/8ACB246C-C643-4B55-831D-E5872E0DBA01.JPG",
    "/alegria/AB4764E7-CBCC-4066-AFFA-A0AA05D8A209.JPG",
    "/alegria/BD891E12-2BAF-4112-B2D0-B744B8887577.JPG",
    "/alegria/CDFDE19D-3C4F-4384-8815-F6C503B43F50.JPG",
    "/alegria/F7706EDE-BDD1-4779-A357-61E180E2D7C5.JPG",
  ],
  services: [
    { titleKey: "alegria.service.terrace", descKey: "alegria.service.terrace.desc", icon: "mountain" },
    { titleKey: "alegria.service.wifi", descKey: "alegria.service.wifi.desc", icon: "wifi" },
    { titleKey: "alegria.service.parking", descKey: "alegria.service.parking.desc", icon: "car" },
    { titleKey: "alegria.service.ac", descKey: "alegria.service.ac.desc", icon: "thermometer" },
  ],
  nearbyKeys: [
    "alegria.nearby.sentiero",
    "alegria.nearby.amalfi",
    "alegria.nearby.conca",
    "alegria.nearby.piazza",
  ],
  rules: {
    type: "flexible" as const,
    textKey: "alegria.rules.text",
  },
};

export default function AlegriaPage() {
  return (
    <LanguageProvider>
      <PropertyPage config={alegriaConfig} />
    </LanguageProvider>
  );
}
