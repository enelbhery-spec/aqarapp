import { Phone, MessageCircle, MapPin, Home } from "lucide-react"; // تأكد من تثبيت lucide-react

type Property = {
  id: number;
  title: string;
  address: string;
  price: number;
  type: string;
  listing_type: string;
  phone: string;
  images: string[];
};

export default function PropertyCard({ property }: { property: Property }) {
  const imageUrl = property.images?.[0] || "/placeholder.jpg";
  const formattedPrice = property.price?.toLocaleString() || "غير محدد";
  const phone = property.phone?.replace(/\D/g, "") || "";

  return (
    <div className="group bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
      
      {/* قسم الصورة الذكي */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* الطبقة الظلية والبيانات فوق الصورة */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md ${
            property.listing_type === "إيجار" ? "bg-blue-600/90 text-white" : "bg-emerald-600/90 text-white"
          }`}>
            {property.listing_type}
          </span>
        </div>

        {/* السعر فوق الصورة (اختياري لرفع مستوى التصميم) */}
        <div className="absolute bottom-4 right-4">
           <p className="text-white font-bold text-xl drop-shadow-md">
            {formattedPrice} <span className="text-sm font-light">ج.م</span>
          </p>
        </div>
      </div>

      {/* المحتوى التفصيلي */}
      <div className="p-5 flex flex-col flex-grow">
        
        <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold uppercase tracking-wider mb-2">
          <Home size={12} />
          {property.type}
        </div>

        <h3 className="font-bold text-gray-800 text-base leading-snug line-clamp-2 mb-3 group-hover:text-emerald-700 transition-colors">
          {property.title}
        </h3>

        <div className="flex items-start gap-1.5 text-gray-500 text-sm mb-auto">
          <MapPin size={16} className="shrink-0 text-gray-400" />
          <span className="line-clamp-1">{property.address}</span>
        </div>

        {/* أزرار التفاعل - مودرن */}
        <div className="flex gap-3 mt-6">
          <a
            href={phone ? `tel:${phone}` : "#"}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-colors duration-300 shadow-sm"
          >
            <Phone size={16} />
            اتصال
          </a>

          <a
            href={phone ? `https://wa.me/${phone}` : "#"}
            target="_blank"
            className="flex items-center justify-center bg-emerald-100 text-emerald-700 p-3 rounded-xl hover:bg-emerald-200 transition-all duration-300"
            title="تواصل عبر واتساب"
          >
            <MessageCircle size={20} />
          </a>
        </div>

      </div>
    </div>
  );
}