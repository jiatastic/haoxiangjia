import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haoxiang Jia",
  description: "Founding Engineer @ PodPitch. Self-taught engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} font-mono antialiased`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`try {
            var saved = localStorage.getItem("theme");
            var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            var isDark = saved ? saved === "dark" : prefersDark;
            document.documentElement.classList.toggle("dark", isDark);
          } catch (e) {}`}
        </Script>
        {children}
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </body>
    </html>
  );
}
