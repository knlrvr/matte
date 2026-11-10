import type { Metadata, Viewport } from "next";
import "@fontsource-variable/hanken-grotesk";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matte — frame your screenshots",
  description:
    "Put a screenshot or image on a backdrop, add a window frame, and export it. Free, with nothing locked.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1d1f23" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full">{children}</body>
    </html>
  );
}
