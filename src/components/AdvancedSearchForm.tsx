"use client";

import { useState } from "react";

export type SearchFilters = {
  property_type?: string;
  location?: string;
};

export function AdvancedSearchForm({
  onSearch,
}: {
  onSearch: (filters: SearchFilters) => void;
}) {
  const [filters, setFilters] = useState<SearchFilters>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-3"
    >
      <select
        name="property_type"
        onChange={handleChange}
        className="border p-3 rounded-lg"
      >
        <option value="">نوع العقار</option>
        <option value="شقة">شقة</option>
        <option value="فيلا">فيلا</option>
        <option value="تاون هاوس">تاون هاوس</option>
        <option value="دوبلكس">دوبلكس</option>
      </select>

      <select
        name="location"
        onChange={handleChange}
        className="border p-3 rounded-lg"
      >
        <option value="">المنطقة</option>
        <option value="حدائق أكتوبر">حدائق أكتوبر</option>
        <option value="أكتوبر">أكتوبر</option>
        <option value="الشيخ زايد">الشيخ زايد</option>
        <option value="حدائق الأهرام">حدائق الأهرام</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        بحث
      </button>
    </form>
  );
}
