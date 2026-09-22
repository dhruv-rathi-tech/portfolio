import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dhruv Rathi | AI Engineer · GenAI · Data · Full Stack",
  description:
    "Portfolio of Dhruv Rathi — final-year B.Tech student at VIT Chennai building AI-powered applications, intelligent data solutions, and scalable full-stack systems.",
  keywords: [
    "Dhruv Rathi",
    "AI Engineer",
    "GenAI",
    "Machine Learning",
    "Full Stack Developer",
    "Data Analyst",
    "VIT Chennai",
    "RAG",
    "LangChain",
    "Portfolio",
  ],
  authors: [{ name: "Dhruv Rathi" }],
  openGraph: {
    title: "Dhruv Rathi | AI Engineer · GenAI · Data · Full Stack",
    description:
      "Portfolio of Dhruv Rathi — building AI-powered applications, intelligent data solutions, and scalable full-stack systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Rathi | AI Engineer · GenAI · Data · Full Stack",
    description:
      "Portfolio of Dhruv Rathi — building AI-powered applications, intelligent data solutions, and scalable full-stack systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerifDisplay.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
