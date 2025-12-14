"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
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
      className="
        bg-white p-4 rounded-xl shadow
        flex flex-col md:flex-row gap-3 items-center
      "
    >
      {/* نوع العقار */}
      <select
        {...form.register("property_type")}
        className="w-full md:w-48 border p-3 rounded-lg"
      >
        <option value="">نوع العقار</option>
        <option value="شقة">شقة</option>
        <option value="فيلا">فيلا</option>
        <option value="تاون هاوس">تاون هاوس</option>
        <option value="دوبلكس">دوبلكس</option>
        <option value="روف">روف</option>
      </select>

      {/* المنطقة */}
      <select
        {...form.register("location")}
        className="w-full md:w-48 border p-3 rounded-lg"
      >
        <option value="">المنطقة</option>
        <option value="حدائق اكتوبر">حدائق أكتوبر</option>
        <option value="اكتوبر">أكتوبر</option>
        <option value="الشيخ زايد">الشيخ زايد</option>
        <option value="حدائق الاهرام">حدائق الأهرام</option>
        <option value="التجمع">التجمع</option>
      </select>

      {/* زر البحث */}
      <button
        type="submit"
        className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        بحث
      </button>
    </form>
  );
}
