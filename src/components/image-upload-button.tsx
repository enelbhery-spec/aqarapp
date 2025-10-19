"use client";

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Loader2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// إنشاء عميل Supabase (تأكد أن المفاتيح مضبوطة في بيئة المشروع)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ImageUploadButtonProps {
  onUploadComplete: (url: string) => void;
  storagePath: string; // e.g. "properties/some-id/"
  buttonText?: string;
  variant?: "default" | "outline" | "ghost" | "secondary" | "link" | "destructive";
}

export function ImageUploadButton({
  onUploadComplete,
  storagePath,
  buttonText = 'Upload Image',
  variant = 'outline'
}: ImageUploadButtonProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setIsDialogOpen(true);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) return;

    // ✅ التحقق من أن المسار داخل مجلد properties فقط
    if (!storagePath.startsWith('properties/')) {
      toast({
        title: 'مسار مرفوض',
        description: 'يجب حفظ جميع الصور داخل مجلد properties فقط.',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      // تأمين المسار
      const safePath = storagePath.endsWith('/') ? storagePath : `${storagePath}/`;
      const fileName = `${Date.now()}-${imageFile.name}`;
      const fullPath = `${safePath}${fileName}`;

      // رفع الصورة إلى Supabase Storage
      const { data, error } = await supabase.storage
        .from('property_images') // اسم البكت (bucket) لديك
        .upload(fullPath, imageFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Error uploading:', error);
        toast({
          title: 'فشل الرفع',
          description: 'حدث خطأ أثناء رفع الصورة.',
          variant: 'destructive',
        });
        return;
      }

      // الحصول على الرابط العام
      const { data: publicUrlData } = supabase.storage
        .from('property_images')
        .getPublicUrl(fullPath);

      onUploadComplete(publicUrlData.publicUrl);

      toast({
        title: 'تم الرفع بنجاح ✅',
        description: 'تم حفظ الصورة داخل مجلد العقار.',
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'خطأ غير متوقع',
        description: 'حدث خطأ أثناء رفع الصورة.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      setIsDialogOpen(false);
      setImageFile(null);
    }
  };

  return (
    <>
      <Button asChild variant={variant} size="sm">
        <label className="cursor-pointer">
          <Upload className="h-4 w-4 mr-2" />
          {buttonText}
          <input
            type="file"
            className="sr-only"
            accept="image/png, image/jpeg, image/gif, image/webp"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد رفع الصورة</DialogTitle>
            <DialogDescription>
              هل تريد بالتأكيد رفع هذه الصورة؟ سيتم حفظها داخل مجلد العقار فقط.
            </DialogDescription>
          </DialogHeader>

          {imageFile && (
            <div className="my-4 flex justify-center">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="max-h-64 rounded-md"
              />
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setImageFile(null)}>إلغاء</Button>
            </DialogClose>
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isUploading ? 'جارٍ الرفع...' : 'تأكيد ورفع'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
