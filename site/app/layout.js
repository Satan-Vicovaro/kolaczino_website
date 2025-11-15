import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { startCronJob } from "@/lib/photoTimer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gruby appreciation site",
  description: "Little website which showcases my coding skills ig. Includes tic-tac-toe game and Gruby",
  authors: "Kolaczino",
};

startCronJob();
require('../lib/logger.js');

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme
          accentColor="orange"
          grayColor="gray"
          panelBackground="translucent"
          scaling="100%"
          radius="full"
          appearance="dark"
        >
          <NavBar />
          {children}
          <Footer />
        </Theme>

      </body>
    </html>
  );
}
