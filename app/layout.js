import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import Script from 'next/script'

export const metadata = {
  title: "DeenFlow",
  description: "Fueling productivity for focused muslims.",
};
import { Providers } from "./providers"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  cz-shortcut-listen="false">
        <Providers >{children}</Providers>
        
      </body>
    </html>
  )
}

