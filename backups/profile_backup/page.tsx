"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface UserProfile {
  name: string;
  phone: string;
  email: string; // دائمًا string وليس undefined
  avatar_url?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const session = sessionData?.session;
        if (!session) {
          router.replace("/login");
          return;
        }

        const userEmail = session.user.email || "";

        // ✅ جلب البيانات من جدول users حسب البريد الإلكتروني
        const { data: userData, error } = await supabase
          .from("users")
          .select("name, phone, email, avatar_url")
          .eq("email", userEmail)
          .single();

        if (error) console.error("Error fetching user:", error);

        if (userData) {
          setUserProfile({
            name: userData.name || "مستخدم بدون اسم",
            phone: userData.phone || "",
            email: userData.email || userEmail,
            avatar_url: userData.avatar_url || "",
          });
        } else {
          // 🟢 إنشاء سجل جديد لو مش موجود
          const newUser = {
            name: session.user.user_metadata?.name || "مستخدم جديد",
            phone: session.user.user_metadata?.phone || "",
            email: userEmail,
            avatar_url: session.user.user_metadata?.avatar_url || "",
          };
          setUserProfile(newUser);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, [router]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin mr-2 h-5 w-5" />
        جاري تحميل الملف الشخصي...
      </div>
    );

  if (!userProfile) return null;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">ملفي الشخصي</h1>

      <div className="flex flex-col items-center space-y-3">
        {userProfile.avatar_url ? (
          <Image
            src={userProfile.avatar_url}
            alt="Profile picture"
            width={100}
            height={100}
            className="rounded-full border"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            لا توجد صورة
          </div>
        )}

        <div className="text-center">
          <p className="text-lg font-medium">{userProfile.name}</p>
          <p className="text-gray-600">{userProfile.email}</p>
          <p className="text-gray-600">
            {userProfile.phone || "لا يوجد رقم هاتف"}
          </p>
        </div>
      </div>
    </div>
  );
}
