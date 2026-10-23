import type { Metadata } from "next";
import "./globals.css";

const title = "BuildSync AI — Check every plan against code";
const description =
  "BuildSync AI reads your drawings, checks them against your jurisdiction's building code, and turns them into a schedule, budget and stress-tested 3D model.";

export const metadata: Metadata = {
  metadataBase: new URL("https://buildsync.ai"),
  title,
  description,
  openGraph: { title, description, url: "https://buildsync.ai", siteName: "BuildSync AI", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
