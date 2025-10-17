"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit3 } from "lucide-react";


export default function MyPropertiesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // تحميل المستخدم والعقارات الخاصة به
  useEffect(() => {
    async function fetchUserAndProperties() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.replace("/login");
      } else {
        setUser(data.user);
        await fetchProperties(data.user.id);
      }
      setLoading(false);
    }

    async function fetchProperties(userId: string) {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("خطأ في جلب العقارات:", error);
      } else {
        setProperties(data || []);
      }
    }

    fetchUserAndProperties();
  }, [router]);

  // دالة لتحسين روابط الصور
  const getValidImageUrl = (url: string) => {
    if (!url) return null;
    return url.startsWith("https://") ? url : url.replace("https:/", "https://");
  };

  // دالة حذف العقار
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("هل أنت متأكد أنك تريد حذف هذا العقار؟");
    if (!confirmDelete) return;

    const { error } = await supabase.from("properties").delete().eq("id", id);

    if (error) {
      alert("حدث خطأ أثناء الحذف: " + error.message);
    } else {
      setProperties((prev) => prev.filter((p) => p.id !== id));
      alert("✅ تم حذف العقار بنجاح");
    }
  };

  // دالة التعديل (نقل المستخدم إلى صفحة تعديل العقار)
  const handleEdit = (id: string) => {
    router.push(`/edit-property/${id}`);
  };

  if (loading) return <p className="text-center mt-10">جاري التحميل...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">عقاراتي</h1>
          <Button
            onClick={() => router.push("/add-property")}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            إضافة عقار
          </Button>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => {
              const imagesArray = Array.isArray(property.images)
                ? property.images
                : typeof property.images === "string"
                ? JSON.parse(property.images)
                : [];

              return (
                <div
                  key={property.id}
                  className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white"
                >
                  {/* ✅ عرض الصورة */}
                  {imagesArray.length > 0 ? (
                    <img
                      src={getValidImageUrl(imagesArray[0])}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-md mb-3"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                      لا توجد صورة
                    </div>
                  )}

                  <h2 className="text-lg font-semibold">{property.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {property.description}
                  </p>
                  <p className="font-bold text-blue-600 mb-3">
                    {property.price} {property.currency || "EGP"}
                  </p>

                  {/* أزرار التحكم */}
                  <div className="flex justify-between">
                    <Button
                      onClick={() => handleEdit(property.id)}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      تعديل
                    </Button>
                    <Button
                      onClick={() => handleDelete(property.id)}
                      className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      حذف
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600 text-center">لم تقم بإضافة أي عقارات بعد.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}
