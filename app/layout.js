import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/custom/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextJS Boilerplate By Faris Abbasi",
  description:
    "I created this boilerplate so me and you can build our next projects faster",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
