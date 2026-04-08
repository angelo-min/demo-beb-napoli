import type { Metadata, Viewport } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "B&B Demo Napoli",
  description:
    "Demo sito B&B con prenotazioni dirette e pannello admin.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FDFAF5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="bg-background">
      <body
        className={`${dmSans.variable} ${cormorantGaramond.variable} font-sans antialiased`}
      >
        <div style={{ background: '#1A1A2E', color: 'white', fontSize: '12px', padding: '6px 16px', textAlign: 'center', position: 'sticky', top: 0, zIndex: 9999 }}>
          Questo è un sito demo — realizzato da Angelo, sviluppatore freelance |{' '}
          <a href="mailto:info@mmstudios.it" style={{ color: '#a0aec0', textDecoration: 'underline' }}>info@mmstudios.it</a>
        </div>
        {children}
      </body>
    </html>
  );
}
