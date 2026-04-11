'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; 
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. الخطوة الأولى: إرسال الرسالة لإيميلك فوراً عبر Formspree
      const emailResponse = await fetch('https://formspree.io/f/xojpgykk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // 2. الخطوة الثانية: حفظ نسخة في Supabase كأرشيف للمشروع
      const { error: supabaseError } = await supabase.from('messages').insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      ]);

      if (emailResponse.ok) {
        toast.success('تم إرسال الرسالة بنجاح ووصلت لإيميل الإدارة ✅');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Email service failed');
      }

      if (supabaseError) {
        console.warn('تم إرسال الإيميل ولكن فشل الحفظ في الداتابيز:', supabaseError);
      }

    } catch (error) {
      toast.error('حدث خطأ أثناء الإرسال ❌');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-2 text-center text-blue-900">📩 تواصل مع ترند عقار</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          أو راسلنا مباشرة عبر: <span className="font-semibold text-blue-700">support@trand-aqar.online</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">الاسم</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="اكتب اسمك بالكامل"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="support@trand-aqar.online" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">الرسالة</label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="اكتب تفاصيل استفسارك عن العقارات هنا..."
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-blue-900 hover:bg-blue-800">
            {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
          </Button>
        </form>
      </div>
    </div>
  );
}