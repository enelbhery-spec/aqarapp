'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, Upload } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  fullName: z.string().min(3, 'الاسم يجب أن يحتوي على 3 أحرف على الأقل'),
  email: z.string().email('أدخل بريد إلكتروني صالح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل'),
  image: z.any().optional(),
});

type RegisterFormValues = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: '', email: '', password: '', image: undefined },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setLoading(true);

    try {
      // إنشاء حساب جديد
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (signUpError) {
        toast({
          title: 'خطأ أثناء التسجيل',
          description: signUpError.message,
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      const user = data?.user;
      if (!user) {
        toast({
          title: 'خطأ في إنشاء الحساب',
          description: 'تعذر إنشاء المستخدم.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // رفع الصورة إن وجدت
      let imageUrl = '';
      const imageFile = values.image?.[0];
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const filePath = `avatars/${user.id}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, imageFile, { upsert: true });

        if (uploadError) {
          toast({
            title: 'فشل رفع الصورة',
            description: uploadError.message,
            variant: 'destructive',
          });
        } else {
          const { data: imgData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);
          imageUrl = imgData.publicUrl;
        }
      }

      // حفظ البيانات في جدول profiles
      const { error: insertError } = await supabase.from('profiles').insert({
        id: user.id,
        full_name: values.fullName,
        email: values.email,
        role: 'user',
        avatar_url: imageUrl,
        created_at: new Date().toISOString(),
      });

      if (insertError) {
        toast({
          title: 'خطأ في حفظ البيانات',
          description: insertError.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'تم إنشاء الحساب بنجاح 🎉',
          description: 'يمكنك الآن تسجيل الدخول.',
        });

        // توجيه المستخدم إلى صفحة تسجيل الدخول بعد ثانيتين
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'حدث خطأ غير متوقع ❌',
        description: 'يرجى المحاولة لاحقًا.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // لعرض معاينة الصورة قبل الرفع
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <div className="text-center">
        {preview ? (
          <Image
            src={preview}
            alt="صورة المستخدم"
            width={100}
            height={100}
            className="rounded-full mx-auto mb-2 border"
          />
        ) : (
          <div className="w-24 h-24 mx-auto mb-2 rounded-full bg-gray-200 flex items-center justify-center">
            <Upload className="h-6 w-6 text-gray-500" />
          </div>
        )}
        <Input
          type="file"
          accept="image/*"
          {...form.register('image')}
          onChange={handleImageChange}
        />
      </div>

      <div>
        <label className="block text-sm mb-1">الاسم الكامل</label>
        <Input placeholder="أدخل اسمك" {...form.register('fullName')} />
      </div>

      <div>
        <label className="block text-sm mb-1">البريد الإلكتروني</label>
        <Input type="email" placeholder="example@mail.com" {...form.register('email')} />
      </div>

      <div>
        <label className="block text-sm mb-1">كلمة المرور</label>
        <Input type="password" placeholder="••••••" {...form.register('password')} />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'إنشاء حساب'}
      </Button>
    </form>
  );
}
