"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getPersonalizedHeadlines } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const formSchema = z.object({
  existingHeadline: z.string().min(10, "الرجاء إدخال عنوان أطول."),
  userSegment: z.string({ required_error: "الرجاء اختيار شريحة المستخدم." }),
  abTestResults: z.string().min(10, "يرجى تقديم بعض نتائج اختبار A/B أو الأفكار."),
  numberOfVariations: z.coerce.number().min(1).max(5),
});

type FormValues = z.infer<typeof formSchema>

export function HeadlineGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [headlineVariations, setHeadlineVariations] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      existingHeadline: "شقة فاخرة للبيع في قلب القاهرة الجديدة",
      userSegment: "Luxury Shoppers",
      abTestResults: "الإعلانات التي تبرز 'إطلالة على النيل' حصلت على تفاعل أكبر. استخدام صور عالية الجودة يزيد من الاهتمام.",
      numberOfVariations: 3,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setHeadlineVariations([]);
    try {
      const result = await getPersonalizedHeadlines(values);
      if (result.error) {
        throw new Error(result.error);
      }
      setHeadlineVariations(result.headlineVariations || []);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ غير متوقع.";
      toast({
        title: "خطأ في إنشاء العناوين",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            <span>أداة إنشاء العناوين الجذابة</span>
        </CardTitle>
        <CardDescription>
          املأ التفاصيل أدناه لإنشاء عناوين إعلانية مخصصة لعقاراتك.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="userSegment"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>الجمهور المستهدف</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="اختر شريحة مستهدفة" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Bargain Hunters">الباحثون عن الصفقات</SelectItem>
                        <SelectItem value="Luxury Shoppers">الباحثون عن الفخامة</SelectItem>
                        <SelectItem value="Families">العائلات</SelectItem>
                        <SelectItem value="Investors">المستثمرون</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                  control={form.control}
                  name="numberOfVariations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عدد التنويعات</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="existingHeadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان الإعلان الحالي</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="abTestResults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات على الإعلانات السابقة</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="على سبيل المثال، 'الإعلانات التي تذكر 'التشطيب سوبر لوكس' حققت أداء أفضل...'"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جارٍ الإنشاء...
                </>
              ) : (
                "إنشاء العناوين"
              )}
            </Button>
          </form>
        </Form>

        {(isLoading || headlineVariations.length > 0) && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">العناوين المقترحة:</h3>
            <div className="space-y-4">
              {isLoading ? (
                <>
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-5/6" />
                    <Skeleton className="h-8 w-full" />
                </>
              ) : (
                headlineVariations.map((headline, index) => (
                  <Card key={index} className="bg-muted/50 p-4">
                    <p className="font-medium">{headline}</p>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
