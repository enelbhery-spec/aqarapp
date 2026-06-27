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
     
  {
    name: "بداية 2",
    slug: "bedaya-2",
    description:
      "بداية 2 امتداد لمشروع بداية 1 في حدائق أكتوبر، مناسب للشباب ويتميز بأسعار اقتصادية وخدمات أساسية.",
    avgPrice: "من 1,100,000 إلى 1,600,000 جنيه",
    services: ["مواصلات", "مدارس", "أسواق"],
    mapQuery: "Bedaya 2 Hadayek October",
    propertiesCount: 65,
    avgPriceValue: 1000,
    typesCount: 2,
    recentAds: 12,
  },
  {
    name: "السياحية أ",
    slug: "touristic-a",
    description:
      "منطقة السياحية أ من أرقى مناطق حدائق أكتوبر، تتميز بالفيلات والموقع الحيوي وقربها من المحاور الرئيسية.",
    avgPrice: "من 3,000,000 إلى 6,000,000 جنيه",
    services: ["مدارس دولية", "مطاعم", "مراكز تجارية"],
    mapQuery: "Touristic A Hadayek October",
    propertiesCount: 120,
    avgPriceValue: 3500,
    typesCount: 3,
    recentAds: 25,
  },
  {
    name: "السياحية ب",
    slug: "touristic-b",
    description:
      "السياحية ب منطقة مميزة تجمع بين الهدوء والخدمات، مناسبة للسكن العائلي في حدائق أكتوبر.",
    avgPrice: "من 2,500,000 إلى 5,000,000 جنيه",
    services: ["مدارس", "مواصلات", "خدمات طبية"],
    mapQuery: "Touristic B Hadayek October",
    propertiesCount: 110,
    avgPriceValue: 3000,
    typesCount: 3,
    recentAds: 20,
  },
  {
    name: "كمبوند اللوتس",
    slug: "lotus-compound",
    description:
      "كمبوند اللوتس من المشاريع السكنية الهادئة، يوفر بيئة مناسبة للعائلات وخدمات أساسية.",
    avgPrice: "من 1,800,000 إلى 2,800,000 جنيه",
    services: ["أمن", "حدائق", "مواصلات"],
    mapQuery: "Lotus Compound Hadayek October",
    propertiesCount: 80,
    avgPriceValue: 1800,
    typesCount: 2,
    recentAds: 15,
  },
  {
    name: "كمبوند الدولية",
    slug: "el-dawlia-compound",
    description:
      "كمبوند الدولية يتميز بموقعه القريب من الطرق الرئيسية ويوفر وحدات بأسعار متوسطة.",
    avgPrice: "من 1,700,000 إلى 2,700,000 جنيه",
    services: ["أمن", "خدمات", "مواصلات"],
    mapQuery: "El Dawlia Compound Hadayek October",
    propertiesCount: 75,
    avgPriceValue: 1700,
    typesCount: 2,
    recentAds: 13,
  },
  {
    name: "كمبوند رؤية سيتي",
    slug: "roya-city",
    description:
      "رؤية سيتي كمبوند حديث يوفر وحدات متنوعة مع خدمات متكاملة ومساحات خضراء.",
    avgPrice: "من 2,200,000 إلى 3,500,000 جنيه",
    services: ["أمن", "نادي", "حدائق"],
    mapQuery: "Roya City Hadayek October",
    propertiesCount: 90,
    avgPriceValue: 2200,
    typesCount: 3,
    recentAds: 18,
  },
  {
    name: "كمبوند راية سيتي",
    slug: "raya-city",
    description:
      "راية سيتي من المشاريع المميزة التي تجمع بين الموقع الجيد والخدمات المتكاملة.",
    avgPrice: "من 2,000,000 إلى 3,200,000 جنيه",
    services: ["أمن", "ملاعب", "خدمات"],
    mapQuery: "Raya City Hadayek October",
    propertiesCount: 85,
    avgPriceValue: 2100,
    typesCount: 3,
    recentAds: 16,
  },
  {
    name: "كمبوند الحي الإسباني",
    slug: "spanish-district",
    description:
      "الحي الإسباني يتميز بتصميماته الأوروبية وخدماته المتكاملة داخل حدائق أكتوبر.",
    avgPrice: "من 2,500,000 إلى 4,000,000 جنيه",
    services: ["أمن", "نادي", "مول"],
    mapQuery: "Spanish District Hadayek October",
    propertiesCount: 130,
    avgPriceValue: 2800,
    typesCount: 3,
    recentAds: 22,
  },
  {
    name: "كمبوند الحي الإيطالي",
    slug: "italian-district",
    description:
      "الحي الإيطالي من أشهر كمبوندات حدائق أكتوبر، يتميز بالهدوء والتصميم الأوروبي.",
    avgPrice: "من 2,300,000 إلى 3,800,000 جنيه",
    services: ["أمن", "مدارس", "نادي"],
    mapQuery: "Italian District Hadayek October",
    propertiesCount: 140,
    avgPriceValue: 2600,
    typesCount: 3,
    recentAds: 30,
  },
  {
    name: "كمبوند بيتا جاردنز",
    slug: "beta-gardens",
    description:
      "بيتا جاردنز كمبوند راقي يتميز بالمساحات الخضراء والخدمات المتكاملة.",
    avgPrice: "من 2,800,000 إلى 4,500,000 جنيه",
    services: ["أمن", "نادي", "حدائق"],
    mapQuery: "Beta Gardens Hadayek October",
    propertiesCount: 95,
    avgPriceValue: 3000,
    typesCount: 3,
    recentAds: 19,
  },
  {
    name: "كمبوند بيتا جرينز",
    slug: "beta-greens",
    description:
      "بيتا جرينز من أفضل الكمبوندات الحديثة، يوفر وحدات متنوعة وخدمات متكاملة.",
    avgPrice: "من 3,000,000 إلى 5,000,000 جنيه",
    services: ["أمن", "نادي", "حمامات سباحة"],
    mapQuery: "Beta Greens Hadayek October",
    propertiesCount: 100,
    avgPriceValue: 3200,
    typesCount: 3,
    recentAds: 21,
  },
  {
    name: "كمبوند بيت المصرية",
    slug: "beit-masria",
    description:
      "بيت المصرية مشروع سكني اقتصادي مناسب للشباب والأسر الصغيرة.",
    avgPrice: "من 1,200,000 إلى 2,000,000 جنيه",
    services: ["مواصلات", "مدارس", "أسواق"],
    mapQuery: "Beit Masria Hadayek October",
    propertiesCount: 70,
    avgPriceValue: 1300,
    typesCount: 2,
    recentAds: 14,
  },
  {
    name: "كمبوند واحة الريحان",
    slug: "wahat-el-rehan",
    description:
      "واحة الريحان كمبوند هادئ يتميز بالمساحات الخضراء والخصوصية.",
    avgPrice: "من 2,000,000 إلى 3,200,000 جنيه",
    services: ["أمن", "حدائق", "خدمات"],
    mapQuery: "Wahat El Rehan Hadayek October",
    propertiesCount: 85,
    avgPriceValue: 2100,
    typesCount: 3,
    recentAds: 17,
  },
  {
  name: "كمبوند التجاريين",
  slug: "al-togareen-compound",
  description:
    "كمبوند التجاريين من المشروعات السكنية المميزة في حدائق أكتوبر، يتميز بالهدوء وتوافر الخدمات الأساسية.",
  avgPrice: "من 1,800,000 إلى 3,000,000 جنيه",
  services: ["أمن", "مواصلات", "محلات", "خدمات"],
  mapQuery: "Al Togareen Compound Hadayek October",
  propertiesCount: 85,
  avgPriceValue: 2000,
  typesCount: 3,
  recentAds: 16,
},
{
  name: "كمبوند يوتيبيا",
  slug: "utopia-compound",
  description:
    "كمبوند يوتيبيا من المشاريع الراقية التي توفر مستوى مميز من الخصوصية والخدمات داخل حدائق أكتوبر.",
  avgPrice: "من 2,500,000 إلى 4,200,000 جنيه",
  services: ["أمن", "نادي", "حدائق", "ملاعب"],
  mapQuery: "Utopia Compound Hadayek October",
  propertiesCount: 95,
  avgPriceValue: 2800,
  typesCount: 3,
  recentAds: 20,
},
{
  name: "كمبوند تاون فيو",
  slug: "town-view",
  description:
    "تاون فيو كمبوند سكني مميز يوفر وحدات بأسعار مناسبة مع موقع جيد وخدمات متكاملة.",
  avgPrice: "من 1,700,000 إلى 2,800,000 جنيه",
  services: ["أمن", "مواصلات", "خدمات", "أسواق"],
  mapQuery: "Town View Hadayek October",
  propertiesCount: 75,
  avgPriceValue: 1900,
  typesCount: 2,
  recentAds: 14,
},
{
  name: "كمبوند جرين تاون",
  slug: "green-town",
  description:
    "جرين تاون كمبوند هادئ يتميز بالمساحات الخضراء والتصميم العصري المناسب للعائلات.",
  avgPrice: "من 2,200,000 إلى 3,600,000 جنيه",
  services: ["أمن", "حدائق", "نادي", "ملاعب"],
  mapQuery: "Green Town Hadayek October",
  propertiesCount: 90,
  avgPriceValue: 2400,
  typesCount: 3,
  recentAds: 18,
},
{
  name: "كمبوند فيولا",
  slug: "viola-compound",
  description:
    "كمبوند فيولا من المشاريع السكنية الهادئة التي توفر خصوصية وخدمات متكاملة للسكان.",
  avgPrice: "من 2,000,000 إلى 3,200,000 جنيه",
  services: ["أمن", "خدمات", "مواصلات", "حدائق"],
  mapQuery: "Viola Compound Hadayek October",
  propertiesCount: 80,
  avgPriceValue: 2100,
  typesCount: 3,
  recentAds: 15,
},

    ],
  },
  
  
];