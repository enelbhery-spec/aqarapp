"use client"; //

import Link from "next/link";

export default function PropertyCard({ property }: { property: any }) {
  
  const fixUrl = (url: string) => {
    if (!url) return "https://via.placeholder.com/400x300";
    if (url.includes("/storage/v1/object/public/")) return url;
    return url.replace(".co/", ".co/storage/v1/object/public/");
  };

  const imageUrl = fixUrl(property.thumbnail || (property.images && property.images[0]));

  return (
    <div className="group bg-white rounded-[2rem] shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 h-full flex flex-col">
      {/* تأكد من أن المسار هو /properties وليس /property إذا كان هذا اسم المجلد عندك */}
      <Link href={`/properties/${property.id}`} className="block relative aspect-video overflow-hidden">
        <img 
          src={imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/400x300?text=Image+Error";
          }}
        />
      </Link>

      <div className="p-6 flex flex-col flex-grow text-right" dir="rtl">
        <Link href={`/properties/${property.id}`}>
          <h3 className="font-bold text-gray-800 text-lg mb-2 hover:text-emerald-600 transition-colors">
            {property.title}
          </h3>
        </Link>
        <p className="text-emerald-700 font-black text-xl mt-auto">
          {property.price?.toLocaleString()} ج.م
        </p>
      </div>
    </div>
  );
}