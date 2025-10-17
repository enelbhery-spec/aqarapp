"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

export default function SignupForm() {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ إنشاء المستخدم في Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast({
          title: "❌ فشل التسجيل",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      const user = data.user;
      if (!user) {
        toast({
          title: "⚠️ لم يتم إنشاء المستخدم",
          description: "حدثت مشكلة أثناء التسجيل، حاول مرة أخرى.",
          variant: "destructive",
        });
        return;
      }

      // 2️⃣ حفظ بيانات إضافية في جدول profiles
      const { error: profileError } = await supabase.from("profiles").upsert([
        {
          id: user.id,
          name,
          phone,
          email,
          avatar_url: "", // فارغة حاليًا، يمكن تعديلها لاحقًا
          created_at: new Date(),
        },
      ]);

      if (profileError) {
        console.error(profileError);
        toast({
          title: "⚠️ تم التسجيل ولكن لم يتم حفظ البيانات الإضافية",
          description: "يمكنك تحديثها من الملف الشخصي لاحقًا.",
        });
      } else {
        toast({
          title: "✅ تم التسجيل بنجاح",
          description: "جارٍ تحويلك إلى صفحة عقاراتي...",
        });
      }

      // 3️⃣ تحويل المستخدم إلى صفحة عقاراتي
      router.replace("/my-properties");
    } catch (err) {
      console.error(err);
      toast({
        title: "❌ خطأ أثناء التسجيل",
        description: "حدثت مشكلة أثناء إنشاء الحساب.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div>
        <label className="block text-sm mb-1">الاسم الكامل</label>
        <Input
          type="text"
          placeholder="أدخل اسمك"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">رقم الهاتف</label>
        <Input
          type="tel"
          placeholder="0123456789"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">البريد الإلكتروني</label>
        <Input
          type="email"
          placeholder="example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">كلمة المرور</label>
        <Input
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            جاري التسجيل...
          </>
        ) : (
          "إنشاء حساب"
        )}
      </Button>
    </form>
  );
}
