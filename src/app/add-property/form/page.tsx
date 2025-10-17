"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";

// إعداد Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AddPropertyPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "EGP",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    property_type: "",
    status: "available",
    is_published: true,
    phone: "",
  });

  // الآن ندعم صور متعددة
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    // جلب المستخدم الحالي (إذا مسجل) للحصول على user_id
    (async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        // لا نعرض خطأ للمستخدم هنا تلقائياً
        console.warn("No user session or error fetching user:", error.message);
        return;
      }
      setUserId(user?.id ?? null);
    })();
  }, []);

  // تحديث بيانات الإدخال
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // تحديد الصور (تدعم عدة ملفات)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  // رفع ملف إلى bucket وإرجاع المسار العام أو المسار داخل التخزين
  const uploadFile = async (file: File) => {
    const filePath = `properties/${Date.now()}-${Math.round(Math.random() * 1e6)}-${file.name}`;
    const { data, error } = await supabase.storage.from("property-images").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) throw error;
    const { data: publicUrlData } = supabase.storage.from("property-images").getPublicUrl(data.path);
    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // تحقق من الحقول الأساسية
      if (!formData.title || !formData.price || !formData.location) {
        toast({
          title: "مفقود بيانات",
          description: "يرجى ملء الحقول الأساسية: العنوان، السعر، والموقع.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // رفع الصور إن وُجدت وحفظ روابطها في مصفوفة
      let images: string[] | null = null;
      if (imageFiles.length > 0) {
        images = [];
        for (const file of imageFiles) {
          const publicUrl = await uploadFile(file);
          images.push(publicUrl);
        }
      }

      // إدخال السجل في جدول properties
      const insertPayload: any = {
        title: formData.title,
        description: formData.description || null,
        price: formData.price ? Number(formData.price) : null,
        currency: formData.currency || "EGP",
        images: images ? images : null, // jsonb
        bathrooms: formData.bathrooms ? Number(formData.bathrooms) : null,
        bedrooms: formData.bedrooms ? Number(formData.bedrooms) : null,
        area: formData.area ? Number(formData.area) : null,
        property_type: formData.property_type || null,
        status: formData.status || null,
        location: formData.location,
        is_published: formData.is_published,
        user_id: userId, // قد يكون null إذا لم يسجل المستخدم
      };

      const { error } = await supabase.from("properties").insert([insertPayload]);

      if (error) throw error;

      toast({
        title: "✅ تم إضافة العقار بنجاح",
        description: "تم حفظ بيانات العقار في قاعدة البيانات.",
      });

      // إعادة تعيين الحقول
      setFormData({
        title: "",
        description: "",
        price: "",
        currency: "EGP",
        location: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        property_type: "",
        status: "available",
        is_published: true,
        phone: "",
      });
      setImageFiles([]);
    } catch (err: any) {
      toast({
        title: "❌ حدث خطأ أثناء الإضافة",
        description: err.message ?? String(err),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 md:py-24 bg-muted/20">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">إضافة عقار جديد</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-md">
              <div>
                <Label>عنوان العقار</Label>
                <Input name="title" value={formData.title} onChange={handleChange} required />
              </div>

              <div>
                <Label>الوصف</Label>
                <Textarea name="description" value={formData.description} onChange={handleChange} rows={4} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>السعر</Label>
                  <Input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </div>

                <div>
                  <Label>العملة</Label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="EGP">ج.م (EGP)</option>
                    
                  </select>
                </div>
              </div>

              <div>
                <Label>الموقع</Label>
                <Input name="location" value={formData.location} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>غرف النوم</Label>
                  <Input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
                </div>
                <div>
                  <Label>الحمامات</Label>
                  <Input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
                </div>
                <div>
                  <Label>المساحة (م²)</Label>
                  <Input type="number" name="area" value={formData.area} onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>نوع العقار</Label>
                  <select
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">اختر النوع</option>
                    <option value="apartment">شقة</option>
                    <option value="villa">فيلا</option>
                    <option value="office">مكتب</option>
                    <option value="land">أرض</option>
                  </select>
                </div>

                <div>
                  <Label>الحالة</Label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="available">متاح</option>
                    <option value="sold">مباع</option>
                    <option value="rented">مؤجر</option>
                  </select>
                </div>
              </div>

              <div>
                <Label>رقم الهاتف</Label>
                <Input name="phone" value={formData.phone} onChange={handleChange} />
              </div>

              <div>
                <Label>صور العقار (يمكن اختيارعدة صور)</Label>
                <Input type="file" accept="image/*" multiple onChange={handleImageChange} />
                {imageFiles.length > 0 && (
                  <p className="text-sm mt-2">{imageFiles.length} ملف/ملفات جاهزة للرفع</p>
                )}
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> جارٍ الإضافة...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" /> إضافة وحفظ العقار
                  </>
                  
                )}
              </Button>
                          </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}