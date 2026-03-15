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
  {
    id: "alfardous",
    title: "منطقة الفردوس",
    areas: [
      {
        name: "الفردوس - عمارات الشرطة",
        slug: "alfardous-police",
        description: "تعد منطقة الفردوس (القديمة) من أرقى وأهدأ مناطق حدائق أكتوبر، تتميز بكثافة شجرية عالية وقربها من حي الأشجار ودريم لاند.",
        avgPrice: "من 1,800,000 إلى 2,800,000 جنيه",
        services: ["نادي اجتماعي", "أمن بوابة", "أسواق مركزية", "مدارس خاصة"],
        mapQuery: "Al Fardous Police Buildings Hadayek October",
        propertiesCount: 85,
        avgPriceValue: 2300,
        typesCount: 3,
        recentAds: 7,
      },
      {
        name: "الفردوس - القوات المسلحة",
        slug: "alfardous-army",
        description: "الامتداد الجديد لمنطقة الفردوس، تتميز بتصميمات معمارية حديثة وشوارع واسعة، وتعتبر استثماراً ممتازاً.",
        avgPrice: "من 1,600,000 إلى 2,400,000 جنيه",
        services: ["مساحات خضراء", "قرب من طريق الواحات", "منطقة خدمات"],
        mapQuery: "Al Fardous Armed Forces Hadayek October",
        propertiesCount: 65,
        avgPriceValue: 2000,
        typesCount: 2,
        recentAds: 10,
      },
    ],
  },
  {
    id: "ebny-betak",
    title: "مشروع ابني بيتك",
    areas: [
      { name: "ابني بيتك - المنطقة الأولى", slug: "ebny-betak-1", description: "المنطقة الأكثر حيوية في مشروع ابني بيتك، قريبة من منطقة النوادي والخدمات.", avgPrice: "من 900,000 إلى 1,600,000 جنيه", services: ["وحدات صحية", "أسواق", "مواصلات"], mapQuery: "Ebny Betak Zone 1", propertiesCount: 150, avgPriceValue: 1250, typesCount: 2, recentAds: 25 },
      { name: "ابني بيتك - المنطقة الثانية", slug: "ebny-betak-2", description: "تتميز بالهدوء وتوافر الخدمات الأساسية وقربها من مناطق المولات.", avgPrice: "من 850,000 إلى 1,450,000 جنيه", services: ["مدرسة", "وحدة صحية", "محلات"], mapQuery: "Ebny Betak Zone 2", propertiesCount: 95, avgPriceValue: 1100, typesCount: 2, recentAds: 12 },
      { name: "ابني بيتك - المنطقة الثالثة", slug: "ebny-betak-3", description: "توسط الموقع وسهولة الوصول إليها من المحاور الرئيسية.", avgPrice: "من 800,000 إلى 1,350,000 جنيه", services: ["مساجد", "مواصلات", "خدمات"], mapQuery: "Ebny Betak Zone 3", propertiesCount: 88, avgPriceValue: 1050, typesCount: 2, recentAds: 8 },
      { name: "ابني بيتك - المنطقة الرابعة", slug: "ebny-betak-4", description: "منطقة سكنية هادئة تمتاز بخصوصية عالية.", avgPrice: "من 750,000 إلى 1,300,000 جنيه", services: ["أمن", "حدائق", "صيدليات"], mapQuery: "Ebny Betak Zone 4", propertiesCount: 70, avgPriceValue: 1000, typesCount: 2, recentAds: 5 },
      { name: "ابني بيتك - المنطقة الخامسة", slug: "ebny-betak-5", description: "منطقة واعدة تمتاز بقربها من التوسعات العمرانية الجديدة.", avgPrice: "من 750,000 إلى 1,250,000 جنيه", services: ["مراكز تجارية", "ملاعب", "مدارس"], mapQuery: "Ebny Betak Zone 5", propertiesCount: 65, avgPriceValue: 980, typesCount: 2, recentAds: 9 },
    ],
  },
  {
    id: "housing-projects",
    title: "سكن مصر ودار مصر",
    areas: [
      {
        name: "دار مصر",
        slug: "dar-misr",
        description: "كمبوند مغلق للإسكان المتوسط الفاخر بخصوصية كاملة وتشطيب متميز.",
        avgPrice: "من 2,200,000 إلى 3,200,000 جنيه",
        services: ["أمن 24 ساعة", "مول", "نادي رياضي"],
        mapQuery: "Dar Misr Hadayek October",
        propertiesCount: 55,
        avgPriceValue: 2700,
        typesCount: 3,
        recentAds: 4,
      },
      {
        name: "سكن مصر",
        slug: "sakan-misr",
        description: "مشروع سكني متميز بسور شجري وتصميمات حديثة ومساحات خضراء.",
        avgPrice: "من 1,400,000 إلى 1,900,000 جنيه",
        services: ["شركات صيانة", "أمن", "لاندسكيب"],
        mapQuery: "Sakan Misr Hadayek October",
        propertiesCount: 110,
        avgPriceValue: 1650,
        typesCount: 2,
        recentAds: 15,
      },
    ],
  },
  {
    id: "social-housing",
    title: "مناطق الإسكان الاجتماعي",
    areas: [
      { name: "منطقة الـ 800 فدان", slug: "800-feddan", description: "أكبر تجمع سكني متكامل الخدمات في المدينة.", avgPrice: "من 650,000 إلى 950,000 جنيه", services: ["مدارس حكومية", "وحدات صحية", "مواصلات"], mapQuery: "800 Feddan Housing", propertiesCount: 300, avgPriceValue: 800, typesCount: 1, recentAds: 45 },
      { name: "منطقة 247 عمارة", slug: "zone-247", description: "منطقة حيوية تمتاز بكثافة الخدمات والمواصلات الداخلية.", avgPrice: "من 550,000 إلى 850,000 جنيه", services: ["سوق تجاري", "مواقف ميكروباص", "مدارس"], mapQuery: "Zone 247 Hadayek October", propertiesCount: 180, avgPriceValue: 700, typesCount: 1, recentAds: 22 },
      { name: "منطقة 266 عمارة", slug: "zone-266", description: "تتميز بتنظيم جيد وقرب من مدخل المدينة الرئيسي.", avgPrice: "من 600,000 إلى 900,000 جنيه", services: ["مساجد", "صيدليات", "سوبر ماركت"], mapQuery: "Zone 266 Hadayek October", propertiesCount: 140, avgPriceValue: 750, typesCount: 1, recentAds: 18 },
      { name: "منطقة دهشور", slug: "dahshur-zone", description: "تجمع سكني كبير يربط بين طريق الواحات وطريق دهشور.", avgPrice: "من 650,000 إلى 950,000 جنيه", services: ["بنوك", "مطاعم", "مواصلات"], mapQuery: "Dahshur Social Housing", propertiesCount: 210, avgPriceValue: 800, typesCount: 1, recentAds: 30 },
      { name: "إسكان 1185 عمارة", slug: "housing-1185", description: "الكتلة السكانية الأكبر وتمتاز بتوافر كافة الخدمات الشعبية والتجارية.", avgPrice: "من 500,000 إلى 850,000 جنيه", services: ["مجمعات مدارس", "مراكز طبية", "أسواق"], mapQuery: "Housing 1185 Hadayek October", propertiesCount: 400, avgPriceValue: 650, typesCount: 1, recentAds: 50 },
    ],
  },
];
