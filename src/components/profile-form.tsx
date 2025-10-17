"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Profile = {
  id?: string;
  full_name?: string | null;
  avatar_url?: string | null;
  phone?: string | null;
  account_type?: string | null;
  email?: string | null;
};

export default function ProfileForm() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      setLoading(true);
      setErrorMessage(null);

      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) console.error("session fetch error:", sessionError);

        const userId = session?.user?.id;
        if (!userId) {
          if (isMounted) {
            setErrorMessage("يرجى تسجيل الدخول لعرض الملف الشخصي.");
            setLoading(false);
          }
          return;
        }

        // جلب بيانات المستخدم من جدول profiles
        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name, avatar_url, phone, account_type, email")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          setErrorMessage("فشل في تحميل بيانات الملف الشخصي.");
        } else if (isMounted) {
          setProfile(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setErrorMessage("حدث خطأ أثناء تحميل الملف الشخصي.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  // رفع الصورة وتحديث الرابط في قاعدة البيانات
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file || !profile?.id) return;

      const fileExt = file.name.split(".").pop();
      const filePath = `avatars/${profile.id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", profile.id);

      if (updateError) throw updateError;

      setProfile({ ...profile, avatar_url: publicUrl });
    } catch (error: any) {
      alert("حدث خطأ أثناء رفع الصورة، حاول مرة أخرى.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  // تحديث بيانات المستخدم (الاسم أو الهاتف)
  const handleSave = async () => {
    if (!profile?.id) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
        })
        .eq("id", profile.id);

      if (error) throw error;
      alert("تم حفظ التعديلات بنجاح ✅");
    } catch (error) {
      alert("حدث خطأ أثناء حفظ التعديلات ❌");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className="text-center p-4">جاري تحميل الملف الشخصي...</div>;

  if (errorMessage)
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow text-red-600">
        {errorMessage}
      </div>
    );

  if (!profile)
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
        لا توجد بيانات للعرض.
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">الملف الشخصي</h2>

      {/* عرض الصورة أو مكان رفعها */}
      <div className="flex flex-col items-center mb-4">
        {profile.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatar_url}
            alt="صورة المستخدم"
            className="w-24 h-24 rounded-full object-cover border mb-2"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-2">
            لا صورة
          </div>
        )}

        <label htmlFor="avatar-upload" className="text-sm text-gray-700 mb-1">
          اختر صورة جديدة:
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          disabled={uploading}
          title="رفع صورة الملف الشخصي"
          placeholder="اختر صورة من جهازك"
        />
      </div>

      {/* الاسم الكامل */}
      <div>
        <label className="block text-sm font-medium mb-1">الاسم الكامل</label>
        <Input
          value={profile.full_name ?? ""}
          onChange={(e) =>
            setProfile({ ...profile, full_name: e.target.value })
          }
          placeholder="أدخل اسمك الكامل"
        />
      </div>

      {/* البريد الإلكتروني */}
      <div>
        <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
        <Input value={profile.email ?? ""} disabled />
      </div>

      {/* رقم الهاتف */}
      <div>
        <label className="block text-sm font-medium mb-1">رقم الهاتف</label>
        <Input
          value={profile.phone ?? ""}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          placeholder="أدخل رقم الهاتف"
        />
      </div>

      {/* نوع الحساب */}
      <div>
        <label className="block text-sm font-medium mb-1">نوع الحساب</label>
        <Input value={profile.account_type ?? "مستخدم"} disabled />
      </div>

      <Button
        onClick={handleSave}
        disabled={loading}
        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white"
      >
        {loading ? "جاري الحفظ..." : "💾 حفظ التعديلات"}
      </Button>
    </div>
  );
}
