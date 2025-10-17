import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import imageData from "@/lib/placeholder-images.json";

type ImageType = { src: string; hint: string; } | string;

export type Property = {
  id: string;
  title: string;
  price: string | number; // <-- تقبّل string أو number الآن
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  image?: string; // from old static data
  images?: ImageType[]; // from firestore
  imageHint?: string;
  propertyType?: string;
  status?: "للبيع" | "للإيجار";
  description?: string;
};

// Accept Partial<Property> so callers can omit optional fields.
// Inside the component we normalize values to safe defaults.
export function PropertyCard(props: Partial<Property>) {
  const {
    id = "",
    title = "بدون عنوان",
    price = "0",
    location = "غير محدد",
    bedrooms = 0,
    bathrooms = 0,
    area = 0,
    image,
    images,
    imageHint,
    propertyType = "عام",
    status = "للبيع",
  } = props;

  const propertyId = id;

  const formattedPrice = () => {
    // قبول string أو number أو undefined؛ تحويل آمن إلى رقم ثم تنسيق
    const raw = price ?? "0";
    const numPrice = typeof raw === "number" ? raw : parseInt(String(raw), 10);
    if (isNaN(numPrice)) {
      return "السعر غير محدد";
    }
    return numPrice.toLocaleString();
  };

  const mainImage = (images && images.length > 0)
    ? (typeof images[0] === 'string' ? images[0] : (images[0] as any).src)
    : (image || imageData.property.default.src);

  const mainImageHint = (images && images.length > 0 && typeof images[0] === 'object')
    ? (images[0] as any).hint
    : (imageHint || 'property image');

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0 relative">
        <Badge className="absolute top-4 right-4 z-10" variant={status === "للبيع" ? "default" : "secondary"}>{status}</Badge>
        <div className="aspect-video relative">
          <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover"
            data-ai-hint={mainImageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <Badge variant="outline" className="mb-2">{propertyType}</Badge>
        <CardTitle className="font-headline text-lg mb-2 leading-tight h-14">
          {title}
        </CardTitle>
        <div className="flex items-center text-muted-foreground text-sm mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        <div className="flex justify-between text-sm border-t pt-4">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4 text-primary" />
            <span>{bedrooms}</span>
            <span className="sr-only">غرف نوم</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4 text-primary" />
            <span>{bathrooms}</span>
             <span className="sr-only">حمامات</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4 text-primary" />
            <span>{area} م²</span>
             <span className="sr-only">مساحة</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/30 flex justify-between items-center">
        <div>
          <p className="text-xl font-bold text-primary">
            {formattedPrice()}
             <span className="text-sm font-normal text-muted-foreground ml-1">{status === "للإيجار" ? "/شهرياً" : "ج.م"}</span>
          </p>
        </div>
        <Button asChild>
          <Link href={`/properties/${propertyId}`}>عرض التفاصيل</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}