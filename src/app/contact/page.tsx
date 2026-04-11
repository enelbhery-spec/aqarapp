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
    setLoading(false); // تعديل بسيط: ابدأ التحميل
    setLoading(true);

    const { error } = await supabase.from('messages').insert([
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
    ]);

    if (error) {
      toast.error('حدث خطأ أثناء إرسال الرسالة ❌');
      console.error(error);
    } else {
      toast.success('تم إرسال الرسالة بنجاح ✅');
      setFormData({ name: '', email: '', message: '' });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        {/* تغيير العنوان ليكون أكثر احترافية */}
        <h1 className="text-2xl font-bold mb-2 text-center text-blue-900">📩 تواصل مع ترند عقار</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          أو راسلنا مباشرة عبر: <span className="font-semibold text-blue-700">admin@trand-aqar.online</span>
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
              /* تم تحديث المثال ليطابق بريدك الرسمي الجديد */
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