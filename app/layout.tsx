import type { Metadata } from "next";
import {
  Inter as FontSans,
  Space_Grotesk as FontSerif,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PostHogProvider } from "@/contexts/posthog-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RaveEngine",
  description: "Turn customer raves into marketing fuel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          fontSerif.variable
        )}
      >
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
