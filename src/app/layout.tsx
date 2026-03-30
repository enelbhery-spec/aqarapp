import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script";

export const metadata: Metadata = {
  // تحديث الرابط الأساسي للدومين الجديد
  metadataBase: new URL("https://www.trand-aqar.online"),
  title: {
    // جعل العنوان عاماً وشاملاً
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
  ],
  authors: [{ name: "تريند عقار" }],
  creator: "تريند عقار",
  publisher: "تريند عقار",

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
    // التحديث للرابط الرسمي الجديد
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
        url: "/og-image.jpg", // تأكد من وجود صورة تحمل الهوية الجديدة بهذا الاسم
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
        {/* Google Analytics - تأكد من تحديث المعرف إذا قمت بإنشاء Property جديدة للدومين الجديد */}
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