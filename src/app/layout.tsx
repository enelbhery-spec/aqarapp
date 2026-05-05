import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.trand-aqar.online"),
  title: {
    default: "تريند عقار | منصة بيع وشراء وتأجير العقارات",
    template: "%s | تريند عقار",
  },
  description:
    "تريند عقار هي منصتك الأولى للبحث عن العقارات، شقق للبيع، فلل، أراضي، وإيجارات في كافة المحافظات. اعرض عقارك الآن بلمسة زر.",
  keywords: [
    "تريند عقار",
    "عقارات مصر",
    "بيع شقق",
    "شراء شقق",
    "إيجار عقارات",
    "شقق للبيع",
    "شقق للإيجار",
    "فلل للبيع",
    "أراضي للبناء",
    "سوق العقارات العربي",
    "عقار تريند",
    "شقة مميزة للبيع",
  ],
  authors: [{ name: "تريند عقار" }],
  creator: "تريند عقار",
  publisher: "تريند عقار",

  other: {
    "google-adsense-account": "ca-pub-4973672854580770",
    // ✅ كود التحقق من Google Search Console
    "google-site-verification": "th4nEx63m_khSz1rJsNm9W606G7avLNf3V",
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
    canonical: "https://www.trand-aqar.online",
  },

  openGraph: {
    title: "تريند عقار | سوق العقارات الشامل",
    description:
      "ابحث عن عقارك المثالي أو اعرض وحدتك للبيع والإيجار عبر منصة تريند عقار الذكية.",
    url: "https://www.trand-aqar.online",
    siteName: "تريند عقار",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "تريند عقار - وجهتك العقارية",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "تريند عقار",
    description: "أفضل منصة لعرض وطلب العقارات في مصر والوطن العربي",
    images: ["https://www.trand-aqar.online/og-image.jpg"],
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
        {/* Google Analytics */}
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
        <Script id="sw-register" strategy="afterInteractive">
{`
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered'))
        .catch(err => console.log('SW error', err));
    });
  }
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