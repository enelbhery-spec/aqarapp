"use client";


import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { } from "@/components/layout/header"
import { AdvancedSearchForm } from "@/components/advanced-search-form";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-12 md:py-24 bg-muted/20">
        <div className="container text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            عقارات حدائق اكتوبر Online
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            اكتشف مجموعة واسعة من العقارات للبيع أو الإيجار في حدائق اكتوبر.
          </p>

          {/* 🔍 نموذج البحث المتقدم */}
          <div className="mt-10 max-w-4xl mx-auto">
            <AdvancedSearchForm />
          </div>

          {/* أزرار التنقل */}
          <div className="mt-12 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/properties">تصفح العقارات</Link>
            </Button>
                    </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
