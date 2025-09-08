import type { Metadata } from "next";
import "./styles/font.css";
import "./styles/globalStyle.css";
import { theme } from "./styles/theme.css";

export const metadata: Metadata = {
  title: "M&R",
  description: "M&R",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={theme}>{children}</body>
    </html>
  );
}
