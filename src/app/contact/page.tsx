'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // تأكد أن هذا هو مسار إعداد Supabase عندك
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
        <h1 className="text-2xl font-bold mb-6 text-center">📩 تواصل معنا</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">الاسم</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="اكتب اسمك هنا"
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
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">الرسالة</label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="اكتب رسالتك هنا..."
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'جاري الإرسال...' : 'إرسال'}
          </Button>
        </form>
      </div>
    </div>
  );
}
