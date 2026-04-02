export type AreaItem = {
  name: string;
  slug: string;
  description?: string;
  avgPrice?: string;
  services?: string[];
  mapQuery?: string;
  propertiesCount?: number;
  avgPriceValue?: number;
  typesCount?: number;
  recentAds?: number;
};

export type AreaCategory = {
  id: string;
  title: string;
  areas: AreaItem[];
};

export const hadayekOctoberAreas: AreaCategory[] = [
  {
    id: "compounds",
    title: "كمبوندات حدائق أكتوبر",
    areas: [
      {
        name: "دجلة جاردنز",
        slug: "dagla-gardens", // ✅ لازم نفس اسم الفولدر في Supabase
        description:
          "دجلة جاردنز من أشهر كمبوندات حدائق أكتوبر، يتميز بالهدوء والتنظيم الجيد وقربه من الخدمات والمحاور الرئيسية.",
        avgPrice:
          "للبيع من 1,200,000 إلى 1,750,000 جنيه - للايجار من 8.000 الى 15,000 جنيه",
        services: [
          "أمن وحراسة",
          "مساحات خضراء",
          "مدارس داخل الكمبوند",
          "مواصلات",
          "محلات تجارية",
        ],
        mapQuery: "Dagla Gardens Hadayek October",
        propertiesCount: 120,
        avgPriceValue: 1600,
        typesCount: 4,
        recentAds: 18,
      },
      {
        name: "حي المنتزة",
        slug: "hay-elmontazah", // ✅ مطابق للفولدر
        description:
          "حي المنتزه منطقة سكنية هادئة داخل حدائق أكتوبر، مناسبة للعائلات وتتميز بقربها من الخدمات الأساسية.",
        avgPrice: "من 1,500,000 إلى 1,750,000 جنيه",
        services: ["امن خاص", "مواصلات عامة", "صيدليات", "أسواق"],
        mapQuery: "Hay El Montazah Hadayek October",
        propertiesCount: 90,
        avgPriceValue: 1200,
        typesCount: 3,
        recentAds: 10,
      },
      {
        name: "باراديس",
        slug: "paradise", // ✅ مطابق للفولدر
        description:
          "منطقة باراديس من المناطق الحديثة في حدائق أكتوبر، تتميز بتخطيط جيد وفرص استثمارية واعدة.",
        avgPrice: "من 1,000,000 إلى 1,700,000 جنيه",
        services: ["أمن", "مساحات خضراء", "محلات"],
        mapQuery: "Paradise Hadayek October",
        propertiesCount: 60,
        avgPriceValue: 1350,
        typesCount: 2,
        recentAds: 6,
      },
      {
        name: "بداية 1",
        slug: "bedaya-1", // ✅ تم التعديل ليتطابق مع الفولدر عندك (بدون -)
        description:
          "بداية 1 مشروع سكني مناسب للشباب في حدائق أكتوبر، يتميز بأسعاره الاقتصادية وقربه من المواصلات.",
        avgPrice: "من 1,000,000 إلى 1,500,000 جنيه",
        services: ["مواصلات", "مدارس", "خدمات حكومية"],
        mapQuery: "Bedaya 1 Hadayek October",
        propertiesCount: 70,
        avgPriceValue: 950,
        typesCount: 2,
        recentAds: 14,
      },
    ],
  },
  
  
];