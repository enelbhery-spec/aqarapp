"use client";

import Link from "next/link";

export default function PropertyCard({ property, isFeatured }: { property: any, isFeatured?: boolean }) {
  
  const fixUrl = (url: string) => {
    if (!url) return "https://via.placeholder.com/400x300";
    if (url.startsWith("http")) return url;
    if (url.includes("/storage/v1/object/public/")) return url;
    return url.replace(".co/", ".co/storage/v1/object/public/");
  };

  const rawImage = property.thumbnail || (property.images && property.images[0]);
  const imageUrl = fixUrl(rawImage);

  return (
    <div className={`group rounded-[2rem] shadow-md overflow-hidden hover:shadow-xl transition-all border h-full flex flex-col bg-white
      ${isFeatured ? 'border-emerald-400 ring-1 ring-emerald-100' : 'border-gray-100'}`}>
      
      <Link href={`/properties/${property.id}`} className="block relative aspect-video overflow-hidden">
        
        {/* ✅ شارة النوع (بيع / إيجار) - تبقى على اليمين */}
        {property.listing_type && (
          <div className={`absolute top-3 right-3 z-30 px-3 py-1 rounded-full text-xs font-bold shadow-sm
            ${property.listing_type === 'بيع' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'}`}>
            {property.listing_type}
          </div>
        )}

        {/* ✅ شارة "مميز" - نقلناها لليسار بجانب النجمة الخضراء */}
        {isFeatured && (
          <div className="absolute top-3 left-11 z-30 bg-yellow-400 text-black text-xs font-black px-3 py-1.5 rounded-xl shadow-md border border-white/50">
            مميز
          </div>
        )}

        {/* النجمة الخضراء الخاصة بالتصميم (أو نقلناها من جهة اليمين إذا كانت جزءاً من الإعلان) */}
        {isFeatured && (
          <div className="absolute top-3 left-3 z-20 bg-emerald-600 text-white p-1.5 rounded-full shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        )}

        <img 
          src={imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
          }}
        />
      </Link>

      <div className="p-6 flex flex-col flex-grow text-right" dir="rtl">
        {property.address && (
          <span className="text-gray-400 text-xs mb-1 block">{property.address}</span>
        )}

        <Link href={`/properties/${property.id}`}>
          <h3 className={`font-bold text-lg mb-2 transition-colors ${isFeatured ? 'text-emerald-800' : 'text-gray-800'} hover:text-emerald-600`
          }>
            {property.title}
          </h3>
        </Link>
        
        <div className="mt-auto flex items-center justify-between flex-row-reverse">
          <p className="text-emerald-700 font-black text-xl">
            {property.price?.toLocaleString()} <span className="text-sm font-normal">ج.م</span>
          </p>
          
          {isFeatured && (
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-md">
              اختيارنا لكم
            </span>
          )}
        </div>
      </div>
    </div>
  );
}