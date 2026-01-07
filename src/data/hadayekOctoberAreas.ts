export type AreaItem = {
  name: string;
  slug: string;
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
      { name: "دجلة جاردنز", slug: "dagla-gardens" },
      { name: "حى المنتزة", slug: "hay-elomntazh" },
      { name: "باراديس ", slug: "paradise" },
      { name: "بداية-1", slug: "bedaya-1" },
      { name: "ييت المصرية", slug: "bet-elmsria" },
      { name: "الصناعات الصغيرة- كارما", slug: "karma" },
      { name: "الدولية بلازا", slug: "eldwlay" },

     // { name: "الفردوس جيش وشرطة", slug: "el-ferdous" },
    ],
  },


  {
    id: "elsiahia",
   // title: "مناطق السياحية",
    areas: [
     // { name: "السياحية أ", slug: "elssiahia-أ" },
     // { name: "السياحية ب", slug: "elssiahia-ب" },

    ],
  },
];
