import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "عقارات حدائق اكتوبر| بيع وشراء وتأجير",
    template: "%s | عقارات حدائق اكتوبر",
  },
  description:
    "منصة سوق العقارات لعرض وطلب الشقق، الفلل، الأراضي، والإيجارات في جميع المحافظات بسهولة وأمان.",
  keywords: [
    "عقارات",
    "بيع شقق",
    "شراء شقق",
    "إيجار",
    "شقق للبيع",
    "شقق للإيجار",
    "فلل",
    "أراضي",
    "سوق العقارات",
  ],
  authors: [{ name: "سوق العقارات" }],
  creator: "سوق العقارات",
  publisher: "سوق العقارات",

  other: {
    "google-adsense-account": "ca-pub-4973672854580770",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://aqarapp.vercel.app",
  },
  openGraph: {
    title: "سوق العقارات | بيع وشراء وتأجير",
    description:
      "اعرض عقارك أو ابحث عن شقة، فيلا أو أرض بسهولة عبر منصة سوق العقارات.",
    url: "https://aqarapp.vercel.app",
    siteName: "سوق العقارات",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "سوق العقارات",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "سوق العقارات",
    description: "أفضل منصة لعرض وطلب العقارات في مصر",
    images: ["https://aqarapp.vercel.app/og-image.jpg"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-touch-icon.png",
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
<Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-1QVGGKVV8F`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1QVGGKVV8F', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
         </head>
      <body className="bg-gray-50 text-gray-800">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
