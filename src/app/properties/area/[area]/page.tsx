import { notFound } from "next/navigation";

// ✅ تصحيح الأنواع لتوافق Next.js 15 ومنع خطأ الـ Build
export default async function AreaPage(props: {
  params: Promise<{ area: string }>;
}) {
  // هذا السطر يحل مشكلة الـ Type Error في Vercel
  const params = await props.params;

  // بما أنك ألغيت المناطق، سنقوم بتحويل المستخدم للرئيسية أو إظهار 404
  return notFound();
}