import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "കേരള ട്യൂഷൻ അക്കാദമി (Classes 8, 9, 10) - Smart Management Portal",
  description:
    "കേരളത്തിലെ 8, 9, 10 ക്ലാസുകളിലെ സർക്കാർ സ്കൂൾ വിദ്യാർത്ഥികൾക്കായുള്ള സമ്പൂർണ്ണ ട്യൂഷൻ മാനേജ്‌മെന്റ് വെബ് ആൻഡ് മൊബൈൽ സിസ്റ്റം.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ml">
      <body className="antialiased selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
