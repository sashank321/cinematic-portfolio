import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Background from "src/components/Background";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SASHANK | Software Engineer & Designer",
  description:
    "An interactive software engineering experience — combining precision engineering with editorial design and delightful interactions.",
  keywords: [
    "Software Engineer",
    "Frontend Developer",
    "Machine Learning",
    "Interactive Portfolio",
    "Next.js",
    "GSAP",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Sashank" }],
  openGraph: {
    title: "SASHANK | Software Engineer & Designer",
    description:
      "An interactive software engineering experience — combining precision engineering with editorial design.",
    url: "https://sashank.dev",
    siteName: "Sashank",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SASHANK | Software Engineer & Designer",
    description:
      "An interactive software engineering experience — combining precision engineering with editorial design.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} antialiased`} suppressHydrationWarning>
      <body className="text-brand-text min-h-screen relative selection:bg-brand-neutral select-none overflow-x-hidden transition-colors duration-700">
        <Background />
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
