import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Syed Tahmid Manzoor",
  description: "Portfolio of Syed Tahmid Manzoor, software engineer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
