
"use client";

import React from 'react';
import { AdvancedSearchForm } from "@/components/advanced-search-form";
import imageData from "@/lib/placeholder-images.json";
import { Skeleton } from '../ui/skeleton';


export function HeroSection() {
  
  const backgroundImageUrl = imageData.hero.background.src;

  return (
    <section className="relative py-20 md:py-32 bg-card">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10" 
          style={{backgroundImage: `url('${backgroundImageUrl}')`}}
          data-ai-hint="real estate pattern"
        ></div>

      <div className="container relative z-10 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          عقارات حدائق أكتوبر أونلاين
        </h1>
        <p className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl">
          منصتنا توفر لك كل ما تحتاجه للبحث عن العقار المناسب لك أو لعرض عقارك للبيع أو الإيجار بكل سهولة.
        </p>
        <div className="mt-12 max-w-4xl mx-auto">
          <AdvancedSearchForm />
        </div>
      </div>
    </section>
  );
}
