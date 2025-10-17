
"use client";

import { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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

interface ImageUploadButtonProps {
  onUploadComplete: (url: string) => void;
  storagePath: string; // e.g., 'properties/some-id/'
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

  const storage = getStorage();
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

    setIsUploading(true);
    try {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const imageRef = ref(storage, `${storagePath}${fileName}`);
      
      const snapshot = await uploadBytes(imageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      onUploadComplete(downloadURL);
      
      toast({
        title: 'تم الرفع بنجاح',
        description: 'تم تحديث الصورة.',
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'فشل الرفع',
        description: 'حدث خطأ أثناء رفع الصورة. يرجى المحاولة مرة أخرى.',
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
            <DialogTitle>تأكيد تغيير الصورة</DialogTitle>
            <DialogDescription>
              هل أنت متأكد أنك تريد رفع هذه الصورة؟ سيتم استبدال الصورة الحالية.
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

