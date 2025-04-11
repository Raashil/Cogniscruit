import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import GitHubButton from "./components/GitHubButton";
import ThemeToggle from "./components/ThemeToggle";
import SessionWrapper from "./components/SessionWrapper";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cogniscruit",
  description: "AI-powered interview question generation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200`}>
        <SessionWrapper>
          <ThemeProvider>
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
            <GitHubButton />
            <ThemeToggle />
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
