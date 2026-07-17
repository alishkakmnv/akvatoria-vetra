import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { TrafficCapture } from "@/components/traffic-capture";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Акватория ветра — яхт-клуб на Волге | Саратов и Пенза",
  description:
    "Прогулки под парусом, обучение яхтингу и праздники на воде. Опытные шкиперы, собственный флот. Саратов и Пенза.",
  openGraph: {
    title: "Акватория ветра — яхт-клуб на Волге",
    description:
      "Прогулки под парусом, обучение яхтингу и праздники на воде в Саратове и Пензе.",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${playfair.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TrafficCapture />
        {children}
      </body>
    </html>
  );
}
