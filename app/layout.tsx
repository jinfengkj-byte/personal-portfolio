import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI产品作品集｜OfferPilot 与独立产品实践",
  description: "从真实问题、产品设计到工程实现、自动化与上线验收的独立AI产品作品集。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
