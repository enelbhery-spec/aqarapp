import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Building, Home, Map, Store } from "lucide-react";
import Link from "next/link";

const properties = [
  {
    icon: <Building className="h-10 w-10 mb-4 text-primary" />,
    title: "شقق",
    description: "شقق متنوعة للبيع أو الإيجار في أفضل المناطق السكنية.",
    benefits: ["مساحات مختلفة", "تشطيبات فاخرة", "تسهيلات في السداد"],
    price: 1500000,
  },
  {
    icon: <Home className="h-10 w-10 mb-4 text-primary" />,
    title: "فلل وقصور",
    description: "فلل مستقلة وقصور فاخرة توفر لك الخصوصية والرفاهية.",
    benefits: ["حدائق خاصة وحمامات سباحة", "تصاميم معمارية فريدة", "مجتمعات راقية وآمنة"],
    price: 7500000,
  },
  {
    icon: <Map className="h-10 w-10 mb-4 text-primary" />,
    title: "أراضي",
    description: "أراضي للبناء في مواقع استراتيجية لمشروعك السكني أو التجاري القادم.",
    benefits: ["مواقع استراتيجية", "إمكانية بناء حسب الطلب", "فرص استثمارية واعدة"],
    price: 2500000,
  },
    {
    icon: <Store className="h-10 w-10 mb-4 text-primary" />,
    title: "محلات تجارية",
    description: "فرص استثمارية في محلات تجارية بمواقع حيوية ونشطة.",
    benefits: ["واجهات على شوارع رئيسية", "مناسبة لمختلف الأنشطة", "عائد استثماري مرتفع"],
    price: 1200000,
  },
];

export function PropertiesSection() {
  return (
    <section id="properties" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            تصفح أحدث العقارات
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
            اكتشف مجموعة واسعة من العقارات التي تلبي جميع احتياجاتك وميزانيتك.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {properties.map((property) => (
            <Card key={property.title} className="flex flex-col">
              <CardHeader className="items-center">
                {property.icon}
                <CardTitle className="font-headline">{property.title}</CardTitle>
                <CardDescription className="text-center">{property.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {property.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col items-center">
                <div className="mb-4">
                  <span className="text-muted-foreground">تبدأ من </span>
                  <span className="text-4xl font-bold">{property.price.toLocaleString()} ج.م</span>
                </div>
                <Button asChild className="w-full">
                  <Link href="/properties">تصفح العقارات</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
