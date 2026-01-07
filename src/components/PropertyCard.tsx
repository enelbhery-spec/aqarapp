type Property = {
  id: number;
  title: string;
  location: string;
  price: number;
  type: string;
  area: number;
  rooms: number;
  bathrooms: number;
  floor: number;
  purpose: "rent" | "sale";
};

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">

      {/* العنوان */}
      <div>
        <h3 className="font-bold text-lg mb-1">
          {property.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3">
          📍 {property.location}
        </p>

        {/* التفاصيل */}
        <ul className="text-sm text-gray-700 space-y-1">
          <li>🏠 النوع: {property.type}</li>
          <li>📐 المساحة: {property.area} م²</li>
          <li>🛏 غرف النوم: {property.rooms}</li>
          <li>🚿 الحمامات: {property.bathrooms}</li>
          <li>🏢 الدور: {property.floor}</li>
          <li>
            💼 الغرض:{" "}
            <span className="font-semibold">
              {property.purpose === "rent" ? "إيجار" : "بيع"}
            </span>
          </li>
        </ul>

        {/* السعر */}
        <p className="text-green-600 font-bold text-lg mt-4">
          {property.price.toLocaleString()} جنيه
        </p>
      </div>

      {/* زر التواصل */}
      <a
        href={`https://wa.me/201021732703?text=مهتم بعقار: ${property.title}`}
        target="_blank"
        className="mt-5 text-center bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
      >
        تواصل للجادين فقط
      </a>
    </div>
  );
}
