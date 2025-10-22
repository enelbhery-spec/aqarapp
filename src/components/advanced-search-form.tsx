"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import {
  Building,
  MapPin,
  Search,
  Ruler,
  BedDouble,
  Bath,
} from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ لتفعيل التوجيه عند الضغط على الزر

// ✅ إنشاء اتصال بـ Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ نموذج التحقق
const searchSchema = z.object({
  property_type: z.string().optional(),
  location: z.string().optional(),
  area: z.coerce.number().optional(),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export function AdvancedSearchForm() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      property_type: "all",
      location: "",
      area: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
    },
  });

  async function onSubmit(values: SearchFormValues) {
    setLoading(true);
    setResults([]);

    let query = supabase.from("properties").select("*");

    // ✅ تطبيق الفلاتر حسب القيم المدخلة
    if (values.property_type && values.property_type !== "all") {
      query = query.eq("property_type", values.property_type);
    }
    if (values.location) {
      query = query.ilike("location", `%${values.location}%`);
    }
    if (values.area) {
      query = query.gte("area", values.area);
    }
    if (values.bedrooms) {
      query = query.eq("bedrooms", values.bedrooms);
    }
    if (values.bathrooms) {
      query = query.eq("bathrooms", values.bathrooms);
    }

    const { data, error } = await query;

    if (error) {
      console.error("❌ خطأ في جلب البيانات:", error);
    } else {
      setResults(data || []);
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      {/* 🔍 نموذج البحث */}
      <Card className="shadow-2xl border-2 border-primary/10 backdrop-blur-sm bg-background/80">
        <CardContent className="p-4 md:p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 gap-4 items-end"
            >
              {/* نوع العقار */}
              <div className="lg:col-span-2">
                <FormField
                  control={form.control}
                  name="property_type"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                        <Building className="h-4 w-4 text-primary" />
                        <span>نوع العقار</span>
                      </div>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="الكل" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">الكل</SelectItem>
                          <SelectItem value="apartment">شقة</SelectItem>
                          <SelectItem value="villa">فيلا</SelectItem>
                          <SelectItem value="land">بيت</SelectItem>
                          <SelectItem value="shop">محل تجاري</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              {/* الموقع */}
              <div className="lg:col-span-2">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>الموقع</span>
                      </div>
                      <FormControl>
                        <Input placeholder="مثال: حدائق أكتوبر" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* المساحة */}
              <div className="lg:col-span-2">
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                        <Ruler className="h-4 w-4 text-primary" />
                        <span>المساحة (م²)</span>
                      </div>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="مثال: 120"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* الغرف */}
              <div className="lg:col-span-1">
                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                        <BedDouble className="h-4 w-4 text-primary" />
                        <span>الغرف</span>
                      </div>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="مثال: 3"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* الحمامات */}
              <div className="lg:col-span-1">
                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                        <Bath className="h-4 w-4 text-primary" />
                        <span>الحمامات</span>
                      </div>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="مثال: 2"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* زر البحث */}
              <div className="lg:col-span-1">
                <Button type="submit" className="w-full h-10" disabled={loading}>
                  {loading ? "جارٍ البحث..." : <Search className="h-5 w-5" />}
                  <span className="sr-only">بحث</span>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* ✅ عرض النتائج */}
      {results.length > 0 && (
        <Card className="border-2 border-primary/10">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold mb-3">
              النتائج ({results.length})
            </h3>
            <ul className="space-y-3">
              {results.map((item, index) => (
                <li
                  key={index}
                  className="p-4 border rounded-lg bg-muted/20 hover:bg-muted/40 transition"
                >
                  <p>
                    🏠 <strong>{item.property_type}</strong> في{" "}
                    <strong>{item.location}</strong>
                  </p>
                  <p>
                    📏 {item.area} م² – 🛏 {item.bedrooms} غرف – 🚿{" "}
                    {item.bathrooms} حمام
                  </p>

                  {/* 🔘 زر تفاصيل العقار */}
                  <Button
                    onClick={() => router.push(`/properties/${item.id}`)}
                    className="mt-3"
                  >
                    تفاصيل العقار
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
