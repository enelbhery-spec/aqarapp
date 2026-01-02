import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    default: "سوق العقارات | بيع وشراء وتأجير",
    template: "%s | سوق العقارات",
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
        url: "https://aqarapp.vercel.app/og-image.jpg",
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
     <script async src="https://www.googletagmanager.com/gtag/js?id=G-1QVGGKVV8F"></script>
     </head>
      <body className="bg-gray-50 text-gray-800">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <script src="https://pl28377825.effectivegatecpm.com/03/43/09/034309bc0a0401f68234ba23c537f4fe.js"></script>
      </body>
    </html>
  );
}
