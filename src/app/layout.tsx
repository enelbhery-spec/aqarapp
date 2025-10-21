import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "aqarapp | عقارات حدائق أكتوبر",
  description:
    "aqarapp هو دليلك الأول للبحث عن العقارات في حدائق أكتوبر — شقق، فلل، ومحلات للبيع أو الإيجار بأفضل الأسعار والخدمات.",
  manifest: "/manifest.json",
  keywords: [
    "عقارات",
    "حدائق أكتوبر",
    "شقق للبيع",
    "شقق للإيجار",
    "فلل للبيع",
    "محلات تجارية",
    "سكن مصر",
    "aqarapp",
    "سوق العقارات",
    "مشروعات أكتوبر",
  ],
  authors: [{ name: "aqarapp فريق التطوير" }],
  openGraph: {
    title: "aqarapp | عقارات حدائق أكتوبر",
    description:
      "ابحث عن أفضل الشقق، الفلل، والمحلات في حدائق أكتوبر عبر تطبيق aqarapp — تجربة سهلة وسريعة للعثور على عقارك المثالي.",
    url: "https://aqarapp.netlify.app",
    siteName: "aqarapp",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "aqarapp - عقارات حدائق أكتوبر",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "aqarapp | عقارات حدائق أكتوبر",
    description:
      "استكشف أحدث العقارات والشقق في حدائق أكتوبر بسهولة مع aqarapp.",
    images: ["/logo.png"],
    creator: "@aqarapp",
  },
  icons: {
    icon: "/logo.png",
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* خطوط الموقع */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />

        {/* إعدادات الموبايل و PWA */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="aqarapp" />
      </head>

      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
