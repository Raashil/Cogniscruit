import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import GitHubButton from "./components/GitHubButton";
import Navbar from "./components/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

// ✅ Read from env
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

if (!GOOGLE_CLIENT_ID) {
  console.warn("⚠️ Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local!");
} else {
  console.log("✅ Loaded Google Client ID:", GOOGLE_CLIENT_ID);
}

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
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200`}
      >
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <ThemeProvider>
            <Navbar />
            <main className="pt-16">{children}</main>
            <GitHubButton />
          </ThemeProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
