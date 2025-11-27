import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BiopolimerosFormProvider } from "@/contexts/BiopolimerosFormContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Consultorio | Procedimientos",
  description:
    "Selección de procedimientos y consentimientos para pacientes en sala de espera.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050608",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased min-h-screen`}
      >
        <BiopolimerosFormProvider>{children}</BiopolimerosFormProvider>
      </body>
    </html>
  );
}
