import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { GlobalProvider } from "@/components/GlobalContext";
import Navbar from "@/components/Navbar";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "CarbonSense — Know Your Impact. Own Your Future.",
  description: "A production-grade carbon footprint tracking, awareness, and reduction platform powered by AI insights.",
  keywords: ["carbon footprint", "sustainability", "CO2 emissions", "climate change", "environmental awareness"],
  authors: [{ name: "CarbonSense Team" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-body bg-background text-text antialiased min-h-screen flex flex-col selection:bg-accent selection:text-background">
        <GlobalProvider>
          <Navbar />
          <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <footer className="w-full border-t border-accent/5 py-6 text-center text-xs text-textMuted font-body mt-auto">
            <p>&copy; {new Date().getFullYear()} CarbonSense. Built for scientific climate accountability.</p>
          </footer>
        </GlobalProvider>
      </body>
    </html>
  );
}
