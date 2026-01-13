export type AreaItem = {
  name: string;
  slug: string;

  // ===== محتوى الصفحة (الحالي) =====
  description?: string;
  avgPrice?: string;
  services?: string[];

  // ===== الخريطة =====
  mapQuery?: string;

  // ===== بيانات الخوارزميات (جديدة - اختيارية) =====
  propertiesCount?: number; // عدد العقارات
  avgPriceValue?: number;   // متوسط السعر رقم (بالألف)
  typesCount?: number;      // عدد أنواع الوحدات
  recentAds?: number;       // إعلانات حديثة
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
        slug: "dagla-gardens",
        description:
          "دجلة جاردنز من أشهر كمبوندات حدائق أكتوبر، يتميز بالهدوء والتنظيم الجيد وقربه من الخدمات والمحاور الرئيسية، ويُعد مناسب للسكن العائلي والاستثمار.",
        avgPrice: "للبيع من  1,200,000 إلى 1,750,000 جنيه  -  للايجار  من 8.000 الى 15,000 جتيه  ",
        services: [
          "أمن وحراسة",
          "مساحات خضراء",
          "مدارس داخل الكمبوند ",
          "مواصلات",
          "محلات تجارية",
        ],
        mapQuery: "Dagla Gardens Hadayek October",

        // خوارزميات
        propertiesCount: 120,
        avgPriceValue: 1600,
        typesCount: 4,
        recentAds: 18,
      },

      {
        name: "حي المنتزة",
        slug: "hay-elomntazh",
        description:
          "حي المنتزه منطقة سكنية هادئة داخل حدائق أكتوبر، مناسبة للعائلات وتتميز بقربها من الخدمات الأساسية وأسعارها المتوسطة.",
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
        slug: "paradise",
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
        slug: "bedaya-1",
        description:
          "بداية 1 مشروع سكني مناسب للشباب في حدائق أكتوبر، يتميز بأسعاره الاقتصادية وقربه من المواصلات.",
        avgPrice: "من1000,000 إلى 1,500,000 جنيه",
        services: ["مواصلات", "مدارس", "خدمات حكومية"],
        mapQuery: "Bedaya 1 Hadayek October",

        propertiesCount: 70,
        avgPriceValue: 950,
        typesCount: 2,
        recentAds: 14,
      },

      {
        name: "بيت المصرية",
        slug: "bet-elmsria",
        description:
          "بيت المصرية من المناطق السكنية المنظمة في حدائق أكتوبر، مناسبة للسكن الدائم والاستقرار.",
        avgPrice: "من 850,000 إلى 1,400,000 جنيه",
        services: ["مدارس", "صيدليات", "مواصلات"],
        mapQuery: "Bet El Masria Hadayek October",

        propertiesCount: 80,
        avgPriceValue: 1100,
        typesCount: 3,
        recentAds: 9,
      },

      {
        name: "الصناعات الصغيرة - كارما",
        slug: "karma",
        description:
          "منطقة كارما من المناطق الواعدة في حدائق أكتوبر، تجمع بين السكن والعمل وتُعد فرصة جيدة للاستثمار.",
        avgPrice: "من 700,000 إلى 1,300,000 جنيه",
        services: ["مواصلات", "محلات تجارية", "ورش وخدمات"],
        mapQuery: "Karma Hadayek October",

        propertiesCount: 65,
        avgPriceValue: 1000,
        typesCount: 2,
        recentAds: 11,
      },

      {
        name: "الدولية بلازا",
        slug: "eldwlay",
        description:
          "الدولية بلازا منطقة سكنية وتجارية داخل حدائق أكتوبر، مناسبة للاستثمار والسكن.",
        avgPrice: "من 1,100,000 إلى 1,500,000 جنيه",
        services: ["سنتر تجارى كبير", "صيدليات ", "مواصلات","مناطق خضراء"],
        mapQuery: "Eldwlia Plaza Hadayek October",

        propertiesCount: 50,
        avgPriceValue: 1450,
        typesCount: 2,
        recentAds: 5,
      },
    ],
  },

  {
    id: "elsiahia",
    title: "المناطق السياحية",
    areas: [
      {
        name: "السياحية أ",
        slug: "touristic-a",
        description:
          "السياحية أ من المناطق المميزة في حدائق أكتوبر، قريبة من المحاور الرئيسية وتناسب السكن والاستثمار.",
        avgPrice: "من 1,300,000 إلى 2,200,000 جنيه",
        services: ["مدارس", "مواصلات", "مناطق خدمية"],
        mapQuery: "Touristic Area A Hadayek October",

        propertiesCount: 110,
        avgPriceValue: 1800,
        typesCount: 4,
        recentAds: 16,
      },

      {
        name: "السياحية ب",
        slug: "touristic-b",
        description:
          "السياحية ب منطقة سكنية منظمة داخل حدائق أكتوبر، تتميز بالهدوء وقربها من الخدمات.",
        avgPrice: "من 1,200,000 إلى 2,000,000 جنيه",
        services: ["خدمات متكاملة", "مواصلات"],
        mapQuery: "Touristic Area B Hadayek October",

        propertiesCount: 95,
        avgPriceValue: 1650,
        typesCount: 3,
        recentAds: 12,
      },
    ],
  },
];
