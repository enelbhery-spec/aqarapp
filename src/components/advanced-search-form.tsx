"use client";

import { useForm } from "react-hook-form";
import { z } from "zod"; // ✅ تم إصلاحه، هذا هو الاستيراد الصحيح
import { zodResolver } from "@hookform/resolvers/zod";

const SearchSchema = z.object({
  property_type: z.string().optional(),
  location: z.string().optional(),
});

type FormValues = z.infer<typeof SearchSchema>;

export function AdvancedSearchForm({
  onSearch,
}: {
  onSearch?: (data: FormValues) => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      property_type: "",
      location: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Final Search Data:", data);
    if (onSearch) onSearch(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-4 rounded shadow"
    >
      <div>
        <label className="block text-sm font-medium mb-1">نوع العقار</label>
        <select
          {...form.register("property_type")}
          className="w-full border p-2 rounded"
        >
          <option value="">اختر النوع</option>
          <option value="شقة">شقة</option>
          <option value="فيلا">فيلا</option>
          <option value="تاون هاوس">تاون هاوس</option>
          <option value="دوبلكس">دوبلكس</option>
          <option value="روف">روف</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">المنطقة</label>
        <select
          {...form.register("location")}
          className="w-full border p-2 rounded"
        >
          <option value="">اختر المنطقة</option>
          <option value="حدائق اكتوبر">حدائق أكتوبر</option>
          <option value="اكتوبر">أكتوبر</option>
          <option value="الشيخ زايد">الشيخ زايد</option>
          <option value="حدائق الاهرام">حدائق الأهرام</option>
          <option value="التجمع">التجمع</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        بحث
      </button>
    </form>
  );
}
