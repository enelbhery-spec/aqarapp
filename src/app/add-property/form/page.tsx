"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X } from "lucide-react";

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

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // local previews
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]); // after upload

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) console.warn("Auth error:", error.message);
        setUserId(data?.user?.id ?? null);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    })();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // create object URLs for previews and keep files
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      // revoke old urls to avoid memory leak
      previewUrls.forEach((u) => URL.revokeObjectURL(u));
      const urls = files.map((f) => URL.createObjectURL(f));
      setImageFiles(files);
      setPreviewUrls(urls);
    }
  };

  // remove a selected image before upload
  const removeSelectedImage = (index: number) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...previewUrls];
    const removed = newPreviews.splice(index, 1);
    newFiles.splice(index, 1);
    // revoke removed url
    removed.forEach((u) => URL.revokeObjectURL(u));
    setImageFiles(newFiles);
    setPreviewUrls(newPreviews);
  };

  const uploadFile = async (file: File) => {
    try {
      const safeFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_").toLowerCase();
      const filePath = `properties/${Date.now()}-${Math.round(Math.random() * 1e6)}-${safeFileName}`;

      const { data, error } = await supabase.storage
        .from("property-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Upload Error:", error.message);
        throw new Error(error.message);
      }

      const { data: publicUrlData } = supabase.storage
        .from("property-images")
        .getPublicUrl(filePath);

      return publicUrlData?.publicUrl ?? null;
    } catch (err: any) {
      console.error("Upload failed:", err);
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!supabaseUrl || !supabaseKey) {
        throw new Error("مفاتيح Supabase غير معرفة في .env.local");
      }

      if (!formData.title || !formData.price || !formData.location) {
        toast({
          title: "⚠️ مفقود بيانات",
          description: "يرجى ملء الحقول الأساسية: العنوان، السعر، والموقع.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Upload images and collect public URLs
      let imageUrls: string[] = [];
      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const publicUrl = await uploadFile(file);
          if (publicUrl) imageUrls.push(publicUrl);
        }
      }

      // حفظ البيانات
      const { error: insertError } = await supabase.from("properties").insert([
        {
          title: formData.title,
          description: formData.description || null,
          price: formData.price ? Number(formData.price) : null,
          currency: formData.currency || "EGP",
          images: imageUrls.length > 0 ? imageUrls : null,
          bathrooms: formData.bathrooms ? Number(formData.bathrooms) : null,
          bedrooms: formData.bedrooms ? Number(formData.bedrooms) : null,
          area: formData.area ? Number(formData.area) : null,
          property_type: formData.property_type || null,
          status: formData.status || "available",
          location: formData.location,
          phone: formData.phone || null,
          is_published: formData.is_published,
          user_id: userId,
        },
      ]);

      if (insertError) throw insertError;

      // set uploaded urls to show after success
      setUploadedUrls(imageUrls);

      toast({
        title: "✅ تم إضافة العقار بنجاح",
        description: "تم حفظ بيانات العقار والصور في قاعدة البيانات.",
      });

      // clear form & previews & files
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
      // revoke object URLs
      previewUrls.forEach((u) => URL.revokeObjectURL(u));
      setImageFiles([]);
      setPreviewUrls([]);
    } catch (err: any) {
      console.error("Submit error:", err);
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

            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white p-6 rounded-2xl shadow-md"
            >
              {/* Preview local selected images */}
              {previewUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {previewUrls.map((url, idx) => (
                    <div key={url} className="relative">
                      <img
                        src={url}
                        alt={`preview-${idx}`}
                        className="w-full h-40 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeSelectedImage(idx)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                        title="إزالة الصورة"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Preview uploaded images after success */}
              {uploadedUrls.length > 0 && (
                <div className="mb-4">
                  <Label>الصور المرفوعة</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {uploadedUrls.map((u, i) => (
                      <img key={u + i} src={u} alt={`uploaded-${i}`} className="w-full h-40 object-cover rounded" />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label>عنوان العقار</Label>
                <Input name="title" value={formData.title} onChange={handleChange} required />
              </div>

              <div>
                <Label>الوصف</Label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>السعر</Label>
                  <Input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
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
                  <Input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>الحمامات</Label>
                  <Input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>المساحة (م²)</Label>
                  <Input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                  />
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
                    <option value="available"></option>
                    <option value="sold">للايجار</option>
                    <option value="rented">للبيع</option>
                  </select>
                </div>
              </div>

              <div>
                <Label>رقم الهاتف</Label>
                <Input name="phone" value={formData.phone} onChange={handleChange} />
              </div>

              <div>
                <Label>صور العقار (يمكن اختيار عدة صور)</Label>
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